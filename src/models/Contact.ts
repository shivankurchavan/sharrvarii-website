import mongoose, { Schema, Model } from 'mongoose';

export interface IContact {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    preferredDate?: string;
    status: 'new' | 'contacted' | 'booked' | 'completed';
    submittedAt: Date;
}

const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        service: {
            type: String,
            required: [true, 'Service selection is required'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            minlength: [10, 'Message must be at least 10 characters'],
        },
        preferredDate: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'booked', 'completed'],
            default: 'new',
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ submittedAt: -1 });

const Contact: Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
