# Contributing to SXIAUM Website

We welcome and appreciate contributions from the community! Whether you're fixing a typo, improving documentation, enhancing the design, or adding new features, your contributions help make SXIAUM better.

## Code of Conduct

Please be respectful and professional in all interactions. We're committed to providing a welcoming and inclusive environment for all contributors.

## How to Contribute

### 1. **Reporting Issues**

If you find a bug or have a suggestion, open an issue on GitHub with:
- A clear, descriptive title
- A detailed description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Any relevant screenshots or links

### 2. **Submitting Pull Requests**

We follow a standard pull request workflow:

#### Step 1: Fork the Repository
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/sxiaum.git
cd sxiaum
```

#### Step 2: Create a Feature Branch
```bash
# Create a branch with a descriptive name
git checkout -b fix/navigation-link-bug
# or
git checkout -b feature/new-docs-page
```

#### Step 3: Make Your Changes
- Keep changes focused and atomic
- Follow the existing code style and HTML structure
- Test your changes in multiple browsers (Chrome, Firefox, Safari, Edge)
- Ensure responsive design works on mobile, tablet, and desktop

#### Step 4: Commit with Clear Messages
```bash
# Use descriptive commit messages
git commit -m "Fix: correct navigation link in ecosystem page"
git commit -m "Feat: add new technology overview section"
```

#### Step 5: Push and Open a Pull Request
```bash
git push origin fix/navigation-link-bug
```

Then open a pull request on GitHub with:
- A clear title describing the changes
- A summary of what was changed and why
- Any relevant issue numbers (e.g., "Fixes #42")
- Screenshots if visual changes were made

### 3. **Types of Contributions**

We appreciate the following types of contributions:

- **Bug fixes**: Links that don't work, broken layouts, typos
- **Content improvements**: Better wording, clearer explanations, updated information
- **Visual enhancements**: Improved spacing, color schemes, animations
- **New pages**: Additional documentation, guides, or resources
- **Performance**: Optimization of images, CSS, JavaScript
- **Accessibility**: ARIA labels, keyboard navigation, screen reader compatibility
- **Documentation**: Better README, setup guides, contribution guidelines

## Guidelines

### HTML & Structure
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<section>`, `<footer>`, etc.)
- Keep indentation consistent (2 spaces recommended)
- Use descriptive class names following BEM or similar conventions
- Maintain consistent formatting across all pages

### Styling
- Preserve the existing Tailwind CSS design system
- Ensure responsive design with mobile-first approach
- Test color contrast for accessibility (WCAG AA standard minimum)
- Keep consistent spacing and typography

### Navigation & Links
- Update navigation consistently across **all pages** when adding new sections
- Use relative paths for internal links (e.g., `href="technology.html"`)
- Test all links before submitting a PR
- Update the README if adding new pages

### Images & Assets
- Optimize images before committing (use tools like TinyPNG)
- Use descriptive alt text for all images
- Keep file sizes reasonable (< 500KB for images)
- Store images in the root directory with clear naming

### File Naming
- Use lowercase filenames with hyphens (e.g., `new-page.html`, not `NewPage.html`)
- Maintain current file naming conventions for consistency
- Note: `Governance.html` is an exception; keep it as-is for compatibility

### JavaScript
- Keep JavaScript minimal and focused
- Comment complex logic
- Use vanilla JS or minimal dependencies
- Ensure cross-browser compatibility

## Before Submitting

Checklist before opening a pull request:

- [ ] Code follows the existing style and conventions
- [ ] All links are tested and working
- [ ] Changes are responsive on mobile, tablet, and desktop
- [ ] Accessibility is maintained (keyboard navigation, alt text, contrast)
- [ ] Navigation is updated across all affected pages
- [ ] No breaking changes to existing functionality
- [ ] README is updated if new pages were added
- [ ] Commit messages are clear and descriptive

## Testing Your Changes

### Local Preview
Use VS Code Live Server or any local web server:
```bash
# If you have Python installed
python -m http.server 8000

# Or use VS Code Live Server extension
# Right-click on home.html and select "Open with Live Server"
```

Visit `http://localhost:8000/home.html` and test:
- Page navigation and links
- Mobile responsiveness (use browser DevTools)
- All interactive elements
- Image loading
- Cross-browser compatibility

## Project Structure

```
sxiaum/
├── home.html              # Main landing page
├── technology.html        # Technology overview
├── ecosystem.html         # Ecosystem information
├── developers.html        # Developer resources
├── Governance.html        # Governance details
├── docs.html              # Documentation
├── legal.html             # Legal pages
├── status.html            # Network status
├── careers.html           # Careers page
├── community.html         # Community information
├── console.html           # Console/dashboard link
├── shared.js              # Shared JavaScript utilities
├── index.html             # Redirect to home
├── [images]               # PNG and WebP asset files
├── whitepaper.pdf         # Project whitepaper
├── README.md              # Project documentation
├── CONTRIBUTING.md        # This file
├── .gitignore             # Git ignore rules
└── LICENSE                # License information
```

## Questions or Need Help?

- Check the README.md for basic project information
- Review existing issues and pull requests for similar questions
- Reach out in the project's community channels

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

Thank you for helping make SXIAUM better! 🚀
