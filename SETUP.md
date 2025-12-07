# Sharrvarri Website - Quick Setup Guide

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your credentials (see below).

3. **Run development server**
   ```bash
   npm run dev
   ```

## 📧 Gmail SMTP Setup

1. Enable 2-Factor Authentication on Gmail
2. Go to: Google Account → Security → App passwords
3. Create app password for "Mail"
4. Use in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

## 🗄️ MongoDB Atlas Setup

1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create cluster → Connect → Get connection string
3. Add to `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sharrvarri
   ```
4. Whitelist IP: 0.0.0.0/0 (for development)

## 🎨 Customization

### Update Your Info
- **Business details**: `src/config/site.config.ts`
- **Services**: `src/config/services.config.ts`
- **Content**: `src/config/content.config.ts`

### Replace Profile Image
- Add your photo: `public/images/profile/sharrvarri-profile.png`
- Recommended: 500x600px, PNG with transparent background

### Change Colors
- Edit CSS variables in `src/app/globals.css`

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import on Vercel.com
3. Add environment variables
4. Deploy!

## 📝 Need Help?

See full documentation in `README.md`
