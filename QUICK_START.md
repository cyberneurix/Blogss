# 🚀 Quick Start Guide

## Step 1: Install Dependencies

Open terminal in the Blogs folder and run:

```bash
npm install
```

This will install all required packages. It may take 2-3 minutes.

## Step 2: Add Your Blog Posts

1. **Extract your `.md` file zip**
2. **Copy all `.md` files** to the `content/posts/` folder
3. **Verify each file** has this frontmatter format:

```markdown
---
title: "Your Post Title"
date: "2026-01-15"
category: "cybersecurity"
excerpt: "Brief description"
author: "Author Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

## Step 3: Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3001**

## Step 4: Build for Production (cPanel)

When ready to deploy:

```bash
npm run build
```

The `out/` folder will contain your static site ready for cPanel!

## ✅ Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Added `.md` files to `content/posts/`
- [ ] Started dev server (`npm run dev`)
- [ ] Checked site at `localhost:3001`
- [ ] Ready to build for production

## 🎯 What You Should See

1. **Homepage**:
   - Hero section with CyberNeurix branding
   - Search bar
   - Grid of blog posts

2. **Click a post**:
   - Full article with markdown rendering
   - Reading time displayed
   - Related posts at bottom

3. **Categories**:
   - Filter by Cybersecurity or NeuroTechnology

## Need Help?

Check `PROJECT_SUMMARY.md` for detailed documentation!
