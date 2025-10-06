# Shoots & Ladders Landing Page - Next.js + ShadCN

## ✅ Project Setup Complete

Your Next.js project with ShadCN UI is ready to go!

### 🚀 What's Installed

**Framework & Tools:**
- ✅ Next.js 15 (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ ESLint
- ✅ ShadCN UI (New York style, Neutral color scheme)

**ShadCN Components Added:**
- ✅ Button
- ✅ Calendar
- ✅ Card
- ✅ Badge

### 📁 Project Structure

```
shootsxladderslanding/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main home page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles + ShadCN variables
│   ├── components/
│   │   └── ui/               # ShadCN UI components
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       └── badge.tsx
│   └── lib/
│       └── utils.ts          # Utility functions (cn helper)
├── public/                   # Static assets
├── components.json           # ShadCN configuration
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

### 🎨 Next Steps

1. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Then open http://localhost:3000

2. **Add More ShadCN Components:**
   ```bash
   npx shadcn@latest add [component-name]
   ```
   
   Popular components for your booking page:
   - `dialog` - For modals
   - `form` - Form components
   - `input` - Input fields
   - `select` - Dropdowns
   - `toast` - Notifications
   - `separator` - Visual dividers

3. **Customize Your Theme:**
   - Edit `src/app/globals.css` to change colors
   - Modify the CSS variables to match your luxury brand colors
   - Current base color: Neutral (gray tones)

### 🎨 Luxury Brand Colors (from your design)

To match your existing design, update these in `globals.css`:

```css
:root {
  --primary: #D4C5A9;      /* Warm beige/tan */
  --background: #FAFAF8;   /* Cream */
  --foreground: #2C2C2C;   /* Charcoal */
  --muted: #F5F3ED;        /* Light beige */
}
```

### 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### 🔗 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [ShadCN UI Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 💡 Building Your Booking Page

Start by editing `src/app/page.tsx` to create your holiday portrait booking interface. You can:

1. Import ShadCN components: `import { Button } from "@/components/ui/button"`
2. Use the Calendar component for date selection
3. Use Cards for time slot display
4. Use Badges for availability indicators
5. Create custom components in `src/components/`

The old HTML mockups are removed, but you can reference that design as you build with React components!
