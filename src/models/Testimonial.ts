import mongoose, { Schema, Model } from 'mongoose';

export interface ITestimonial {
    name: string;
    isAnonymous: boolean;
    rating: number;
    text: string;
    videoUrl?: string;
    serviceType: string;
    date: Date;
    approved: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
        },
        text: {
            type: String,
            required: [true, 'Testimonial text is required'],
            minlength: [10, 'Testimonial must be at least 10 characters'],
        },
        videoUrl: {
            type: String,
            required: false,
        },
        serviceType: {
            type: String,
            required: [true, 'Service type is required'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        approved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes
TestimonialSchema.index({ approved: 1 });
TestimonialSchema.index({ rating: -1 });
TestimonialSchema.index({ date: -1 });

const Testimonial: Model<ITestimonial> =
    mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
