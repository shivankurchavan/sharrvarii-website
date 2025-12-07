import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { sendEmail, emailTemplates } from '@/lib/email';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    service: z.string().min(1, 'Please select a service'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    preferredDate: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate data
        const validatedData = contactSchema.parse(body);

        // Connect to database
        await dbConnect();

        // Save to database
        const contact = await Contact.create({
            ...validatedData,
            status: 'new',
            submittedAt: new Date(),
        });

        // Send notification email to business owner
        const ownerEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.SMTP_USER;
        if (ownerEmail) {
            await sendEmail({
                to: ownerEmail,
                subject: `New Contact Form Submission from ${validatedData.name}`,
                html: emailTemplates.newContactNotification(validatedData),
            });
        }

        // Send confirmation email to client
        await sendEmail({
            to: validatedData.email,
            subject: 'Thank you for reaching out - Sharrvarri',
            html: emailTemplates.clientConfirmation(validatedData),
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Contact form submitted successfully',
                contactId: contact._id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation error',
                    errors: error.issues,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to process contact form',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve contacts (for admin use)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        const query = status ? { status } : {};
        const contacts = await Contact.find(query)
            .sort({ submittedAt: -1 })
            .limit(limit);

        return NextResponse.json({
            success: true,
            count: contacts.length,
            contacts,
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch contacts',
            },
            { status: 500 }
        );
    }
}
