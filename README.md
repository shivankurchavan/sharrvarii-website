# Sharrvarri - Tarot Card Reader & Healing Expert Website

A modern, professional portfolio website for a tarot card reader and energy healing expert, built with Next.js, TypeScript, and MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 🌟 Features

- **Hero Section** - Stunning landing with animated stats counter and professional profile image
- **About Section** - Comprehensive bio, services overview, and certifications
- **Testimonials** - Video carousel and text testimonials with anonymous support
- **Contact Form** - Validated form with email notifications and MongoDB storage
- **Responsive Design** - Mobile-first approach with beautiful animations
- **SEO Optimized** - Server-side rendering with proper meta tags
- **Modular Configuration** - Centralized config files for easy updates

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Styling:** Vanilla CSS with CSS Modules
- **Forms:** React Hook Form + Zod validation
- **Email:** Nodemailer
- **Animations:** Framer Motion
- **Icons:** React Icons

## 📋 Prerequisites

- Node.js 20.9.0 or higher
- MongoDB Atlas account (free tier works)
- SMTP email account (Gmail recommended)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd sharrvarri-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp env.example .env.local
   ```

   Update the `.env.local` file with your credentials:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sharrvarri?retryWrites=true&w=majority

   # Email Configuration (Gmail example)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=Sharrvarri <noreply@sharrvarri.com>

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_CONTACT_EMAIL=contact@sharrvarri.com

   # Admin Configuration
   ADMIN_EMAIL=admin@sharrvarri.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings → Security
   - Under "2-Step Verification", click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password
3. Use this password in `SMTP_PASSWORD` in `.env.local`

## 🗄️ MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and database name in the connection string
6. Add to `MONGODB_URI` in `.env.local`
7. Whitelist your IP address in Network Access

## 🎨 Customization

### Update Business Information

Edit `/src/config/site.config.ts`:
```typescript
export const siteConfig = {
  businessName: "Your Business Name",
  owner: {
    name: "Your Name",
    title: "Your Title",
    // ... more settings
  },
  stats: {
    clientsServed: 500,
    yearsExperience: 10,
    // ... update your stats
  },
  // ... more configuration
};
```

### Update Services

Edit `/src/config/services.config.ts`:
```typescript
export const servicesConfig = [
  {
    id: "service-id",
    name: "Service Name",
    description: "Description",
    duration: "60 minutes",
    price: "₹2,500",
    // ... more services
  },
];
```

### Update Content

Edit `/src/config/content.config.ts` to change:
- Hero headlines and CTAs
- About section bio and mission
- Testimonial section headings
- Contact form labels

### Change Colors

Edit `/src/app/globals.css` CSS variables:
```css
:root {
  --primary: #8B5CF6;
  --secondary: #EC4899;
  --accent: #F59E0B;
  /* ... more colors */
}
```

### Replace Profile Image

Replace `/public/images/profile/sharrvarri-profile.png` with your professional photo (recommended: 500x600px, PNG with transparent background).

## 📁 Project Structure

```
sharrvarri-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Contact form API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── Hero/                     # Hero section
│   │   ├── About/                    # About section
│   │   ├── Testimonials/             # Testimonials section
│   │   └── Contact/                  # Contact form
│   ├── config/
│   │   ├── site.config.ts            # Site configuration
│   │   ├── services.config.ts        # Services data
│   │   └── content.config.ts         # Content strings
│   ├── lib/
│   │   ├── mongodb.ts                # MongoDB connection
│   │   └── email.ts                  # Email utilities
│   └── models/
│       ├── Contact.ts                # Contact model
│       └── Testimonial.ts            # Testimonial model
├── public/
│   └── images/
│       └── profile/                  # Profile images
├── .env.local                        # Environment variables
└── package.json
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables for Production

Make sure to add all environment variables from `.env.local` to your Vercel project settings.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for MongoDB
- Enable IP whitelisting in MongoDB Atlas
- Use app-specific passwords for email
- Implement rate limiting for production (recommended)

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large Desktop: > 1024px

## 🎯 Future Enhancements

- [ ] Admin dashboard for managing testimonials and contacts
- [ ] Online booking system with calendar integration
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Blog section for articles
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Newsletter subscription
- [ ] Analytics integration

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if `MONGODB_URI` is correctly set in `.env.local`
- Verify IP address is whitelisted in MongoDB Atlas
- Ensure username and password are correct

### Email Not Sending
- Verify SMTP credentials are correct
- Check if 2FA is enabled and app password is used
- Test with a different email provider

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be >= 20.9.0)

## 📄 License

This project is private and proprietary.

## 👤 Contact

For support or inquiries, contact: contact@sharrvarri.com

---

Built with ❤️ using Next.js and TypeScript
