# CyberNeurix Blog Platform

A modern, blazing-fast blog platform built with Next.js, featuring dark aesthetics, floating text backgrounds, and markdown-based content management.

## 🚀 Features

- ✅ **Dark Mode** with light mode toggle
- ✅ **Markdown Support** with frontmatter parsing
- ✅ **Reading Time Estimation** for all articles
- ✅ **Category Filtering** (Cybersecurity & NeuroTechnology)
- ✅ **Search Functionality** (coming soon)
- ✅ **Related Posts** suggestions
- ✅ **Responsive Design** mobile-first approach
- ✅ **Static Export** compatible with cPanel hosting
- ✅ **Floating Text Background** aesthetic design element
- ✅ **SEO Optimized** with meta tags and structured data

## 📁 Project Structure

```
Blogs/
├── content/                 # Blog posts in markdown
│   ├── posts/
│   │   ├── post-1.md
│   │   ├── post-2.md
│   │   └── ...
│   └── README.md           # Content guidelines
│
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── blog/[slug]/   # Individual blog posts
│   │   ├── category/[category]/  # Category pages
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   └── globals.css    # Global styles
│   │
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── BlogPost.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FloatingBackground.tsx
│   │   └── ThemeProvider.tsx
│   │
│   └── lib/               # Utility functions
│       ├── blog.ts        # Blog post utilities
│       └── utils.ts       # General utilities
│
├── public/                # Static assets
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd Blogs
   npm install
   ```

2. **Add your blog posts:**
   - Place your `.md` files in `content/posts/`
   - Follow the frontmatter format (see `content/README.md`)

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3001`

## 📝 Adding Blog Posts

Create a new `.md` file in `content/posts/` with this format:

```markdown
---
title: "Your Post Title"
date: "2026-01-15"
category: "cybersecurity"  # or "neurotechnology"
excerpt: "Brief description"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
---

Your markdown content here...
```

## 🚢 Building for Production

### Static Export (for cPanel)

```bash
npm run build
```

This creates an `out/` folder with static HTML files ready for deployment.

### Upload to cPanel

1. Zip the `out/` folder contents
2. Upload to your cPanel file manager
3. Extract in your `public_html` directory

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Header/Footer Links

Modify `src/components/Header.tsx` and `src/components/Footer.tsx`.

### Floating Background Words

Update the word array in `src/components/FloatingBackground.tsx`.

## 📦 Dependencies

- **Next.js 15** - React framework
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **gray-matter** - Frontmatter parser
- **reading-time** - Reading time estimation
- **react-markdown** - Markdown rendering

## 🔧 Configuration

### Port Change

The dev server runs on port 3001 by default. Change in `package.json`:

```json
"dev": "next dev -p YOUR_PORT"
```

### Output Directory

Change static export directory in `next.config.js`:

```javascript
output: 'export',
distDir: 'your-directory',
```

## 📄 License

This project is private and proprietary to CyberNeurix.

## 🤝 Support

For questions or issues, contact the CyberNeurix development team.

---

**Built with ❤️ by CyberNeurix**
