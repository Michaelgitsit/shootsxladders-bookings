# 🎨 How to Update Your Hero Logo

## ✅ Code Updated!

I've updated the booking site to display a PNG image instead of text in the hero section.

---

## 📁 Where to Place Your New PNG

**Location:** `/Users/michaelrodgers/Desktop/shootsxladderslanding/public/images/hero-logo.png`

**Steps:**
1. Save your new PNG file as `hero-logo.png`
2. Place it in the `/public/images/` folder
3. The website will automatically use it!

---

## 🎨 Image Requirements

**Recommended specs:**
- **Format:** PNG (with transparent background recommended)
- **Width:** 400-600px (will be responsive)
- **Height:** Auto (the image will be set to height: 4rem / 64px by default)
- **File size:** Under 200KB for fast loading

**What should be in the image:**
- Your ladder logo
- Text: "Shoots and Ladders"
- Subtitle: "Elevated Event Portraits"
- All in one cohesive PNG image

---

## 🔧 Customizing the Image Size

The image is currently set to `h-16` (64px height). To adjust:

**Make it bigger:**
- Change `h-16` to `h-20` (80px) or `h-24` (96px)
- Edit file: `src/app/page.tsx` line 247

**Make it smaller:**
- Change `h-16` to `h-12` (48px) or `h-10` (40px)

**Full width:**
- Change `h-16` to `w-full max-w-md` for responsive full width

---

## 🚀 Testing Locally

1. Make sure your image is in place: `/public/images/hero-logo.png`
2. Run the dev server:
   ```bash
   cd /Users/michaelrodgers/Desktop/shootsxladderslanding
   npm run dev
   ```
3. Open: http://localhost:3000
4. You should see your new logo!

---

## 📤 Deploying to Production

Once you're happy with the logo:

```bash
cd /Users/michaelrodgers/Desktop/shootsxladderslanding
git add public/images/hero-logo.png
git commit -m "Add new hero logo image"
git push origin main
```

Vercel will automatically deploy the update to:
**https://buy.shootsxladders.com**

---

## 🎨 Current Code

The hero section now looks like this:

```tsx
<header className="text-center mb-6 pb-4 border-b border-[#E5E3DC]">
  <a href="https://shootsxladders.com" className="inline-block">
    <img 
      src="/images/hero-logo.png" 
      alt="Shoots & Ladders - Elevated Event Portraits" 
      className="h-16 mx-auto hover:opacity-80 transition-opacity"
    />
  </a>
</header>
```

**Features:**
- ✅ Centered image
- ✅ Links to main site (shootsxladders.com)
- ✅ Hover effect (slight fade)
- ✅ Responsive design
- ✅ Accessible (alt text included)

---

## 📝 Alternative: Using a Different Filename

If you want to use a different filename (not `hero-logo.png`):

1. Place your image in `/public/images/` (e.g., `my-logo.png`)
2. Update line 245 in `src/app/page.tsx`:
   ```tsx
   src="/images/my-logo.png"
   ```

---

## 🎯 Quick Checklist

- [ ] Create your PNG with logo + text
- [ ] Save as `hero-logo.png`
- [ ] Place in `/public/images/hero-logo.png`
- [ ] Test locally with `npm run dev`
- [ ] Adjust size if needed (change `h-16` in code)
- [ ] Commit and push to deploy

---

## 🆘 Need Help?

**Image too big/small?**
- Edit `src/app/page.tsx` line 247
- Change `h-16` to your preferred height

**Image not showing?**
- Check the filename matches exactly: `hero-logo.png`
- Check it's in the correct folder: `/public/images/`
- Clear browser cache (Cmd+Shift+R)

**Want to change the hover effect?**
- Current: `hover:opacity-80` (fades slightly)
- Options: `hover:scale-105` (grows), `hover:brightness-110` (brightens)

---

**Ready to add your logo? Just drop the PNG file in `/public/images/hero-logo.png`!** 🎨

