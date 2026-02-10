# Data Science Portfolio Website

A high-end, fully responsive portfolio website built for data science students showcasing projects, expertise, and leadership experience. Built with Next.js 16, TypeScript, Tailwind CSS, Shadcn/UI, and Framer Motion animations.

## Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode Toggle**: Theme switcher with persistent user preference
- **Multi-language Support**: English and Khmer language toggle with i18n implementation
- **Framer Motion Animations**: Smooth fade-ins, staggered lists, and interactive elements
- **EmailJS Integration**: Direct contact form with email notifications
- **Emerald/Green Theme**: Modern, nature-inspired color palette
- **Modular Architecture**: Organized components, hooks, and types for scalability
- **Data-Driven**: All content stored in `/public/data.json` for easy updates

## Project Structure

```
├── public/
│   ├── data.json              # All portfolio content (bilingual)
│   ├── images/                # Project, leadership, and hero images
│   │   ├── hero.jpg
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   ├── project3.jpg
│   │   ├── leadership1.jpg
│   │   ├── leadership2.jpg
│   │   └── leadership3.jpg
│   └── cv.pdf                 # Your CV file
├── src/
│   ├── app/                   # Next.js app router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   ├── projects/
│   │   │   └── page.tsx       # Projects grid
│   │   ├── leadership/
│   │   │   └── page.tsx       # Leadership & volunteering
│   │   ├── certificates/
│   │   │   └── page.tsx       # Certifications
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact form
│   │   └── globals.css        # Global styles & theme variables
│   ├── components/
│   │   ├── ui/                # Shadcn/UI components
│   │   ├── Navbar.tsx         # Navigation with theme toggle
│   │   ├── Footer.tsx         # Footer with social links
│   │   ├── ProjectCard.tsx    # Reusable project/leadership card
│   │   └── ContactForm.tsx    # EmailJS contact form
│   ├── hooks/
│   │   ├── useLanguage.ts     # Language switcher hook
│   │   ├── use-mobile.tsx     # Mobile detection (Shadcn)
│   │   └── use-toast.ts       # Toast notifications (Shadcn)
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces for data
│   └── lib/
│       └── utils.ts           # Utility functions
├── .env.local                 # Environment variables (not committed)
├── next.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- EmailJS account (free tier available)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Update portfolio content**

   Edit `public/data.json` with my information:
   ```json
   {
     "en": {
       "name": "Your Name",
       "role": "Your Role",
       "quote": "Your quote",
       "email": "your@email.com",
       "phone": "+1 (555) 123-4567",
       "location": "Your City, State",
       "cvUrl": "/cv.pdf",
       "about": { ... },
       "projects": [ ... ],
       "leadership": [ ... ],
       "certificates": [ ... ],
       "social": { ... }
     },
     "km": { ... } // Khmer translations
   }
   ```

4. **Setup EmailJS**

   a. Create a free account at [EmailJS](https://www.emailjs.com/)
   
   b. Create an email service (Gmail recommended):
      - Click "Add Service"
      - Select Gmail
      - Follow the authentication steps
   
   c. Create an email template:
      - Click "Create Template"
      - Use these template variables in your email body:
        ```
        From: {{from_name}} ({{from_email}})
        Message:
        {{message}}
        ```
      - Save the template and note the **Template ID**
   
   d. Get your credentials from EmailJS dashboard:
      - **Service ID** (under Email Services)
      - **Public Key** (Account settings)
      - **Template ID** (from your template)

5. **Add environment variables**

   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   ```

6. **Add your images**

   Replace the placeholder images in `public/images/`:
   - `hero.jpg` - Your profile image
   - `project1.jpg`, `project2.jpg`, `project3.jpg` - Project screenshots
   - `leadership1.jpg`, `leadership2.jpg`, `leadership3.jpg` - Leadership photos

7. **Add your CV**

   Replace `public/cv.pdf` with your actual CV file.

8. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Customization

### Theme Colors

Edit the CSS variables in `app/globals.css` to change the emerald theme:

```css
:root {
  --primary: 152 71% 46%;      /* Main emerald color */
  --primary-foreground: 0 0% 98%;
  --secondary: 152 71% 40%;
  /* ... other colors ... */
}

.dark {
  --primary: 152 71% 45%;
  /* ... dark mode colors ... */
}
```

### Navigation Links

Update the navigation items in the `Navbar` component or `data.json` nav section.

### Content Updates

All text content is pulled from `data.json`. Update strings directly in that file to see changes reflected across the site.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality React components
- **Framer Motion** - Animation library for smooth interactions
- **EmailJS** - Client-side email service
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark mode support

## Pages Overview

### Home (`/`)
- Hero section with name, role, and call-to-action buttons
- About snippet with link to full about page
- Featured projects grid (top 3)
- Call-to-action section

### About (`/about`)
- Full biography
- Education timeline
- Experience timeline
- Categorized skills (Programming, Data Tools, Soft Skills)

### Projects (`/projects`)
- Complete grid of all projects
- Each project card shows:
  - Project image
  - Title and tags
  - Description
  - Links to GitHub/details
  - Year/date

### Leadership (`/leadership`)
- Grid of leadership and volunteer experiences
- Includes position, organization, dates, and descriptions
- Images for visual context

### Certificates (`/certificates`)
- List of professional certifications
- Issuer, date, and credential links
- Clean, organized presentation

### Contact (`/contact`)
- Split layout: Social links (left) and contact form (right)
- Direct contact information (email, phone, location)
- Social media links (GitHub, LinkedIn, Telegram)
- EmailJS-powered contact form with validation

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
4. Deploy with a single click

### Deploy to Other Platforms

The project can be deployed to any platform that supports Next.js:
- **Netlify** - `npm run build` and deploy the `.next` folder
- **GitHub Pages** - Use `next export` (static export)
- **Self-hosted** - Deploy to your own server with Node.js

## Environment Variables Reference

```env
# EmailJS Configuration (Required for contact form)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized animations with Framer Motion
- CSS-in-JS with Tailwind for minimal bundle size
- Static generation where possible

## Troubleshooting

### Contact form not sending emails?
1. Verify environment variables are set correctly
2. Check EmailJS service is active and verified
3. Ensure template variables match your email template
4. Check browser console for error messages

### Images not loading?
1. Verify image paths in `data.json` match files in `public/images/`
2. Ensure images are in supported format (JPG, PNG, WebP)
3. Check file names for typos

### Language toggle not working?
1. Clear browser localStorage: `localStorage.clear()`
2. Ensure `data.json` has both `en` and `km` language sections
3. Check console for any JavaScript errors

### Theme not persisting?
1. Ensure browser allows localStorage
2. Check that `next-themes` is properly initialized in layout
3. Verify CSS custom properties are defined in `globals.css`

## License

This project is open source and available under the MIT License.

## Support & Feedback

For issues, questions, or suggestions, please open an issue on your repository or contact the original developer.

---

**Last Updated:** February 2026
