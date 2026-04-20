# Content Folder Structure

This folder contains all blog posts organized by category.

## Structure

```
content/
└── posts/
    ├── your-post-slug.md
    ├── another-post.md
    └── ...
```

## Markdown Format

Each post should be a `.md` file with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-01-15"
category: "cybersecurity"  # or "neurotechnology"
excerpt: "A brief description of your post"
author: "Your Name"
tags: ["security", "AI", "threat-detection"]
---

Your post content here in markdown format...
```

## Categories

- **cybersecurity**: Posts about security, threats, defense, etc.
- **neurotechnology**: Posts about BCI, neural networks, cognitive computing, etc.

## File Naming

- Use lowercase
- Use hyphens instead of spaces
- Example: `detection-engineering-2026.md`

## How to Add Your Posts

1. Place all your `.md` files in the `content/posts/` folder
2. Make sure each file has proper frontmatter
3. The system will automatically:
   - Calculate reading time
   - Sort by date
   - Filter by category
   - Display related posts
