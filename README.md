# SXIAUM Website

SXIAUM is a static website that presents the project across a set of HTML pages, including the main landing page, technology overview, ecosystem, developers, and governance sections.

`index.html` redirects to `home.html`, which is the primary entry point for the site.

## Pages

- `home.html` - main landing page
- `technology.html` - protocol and architecture overview
- `ecosystem.html` - ecosystem and ecosystem-facing content
- `developers.html` - developer-focused content
- `Governance.html` - governance overview

## How To Run Locally

This is a plain HTML/CSS/JavaScript site, so no build step is required.

1. Open the project folder in VS Code.
2. Open `home.html` in a browser, or use a local preview server.
3. Verify navigation links and assets such as images, the logo, and the whitepaper file load correctly.

If you use the VS Code Live Server extension, you can right-click `home.html` and choose to open it in a local server.

## Contributing

We welcome contributions from the community! This project is open for improvements, bug fixes, content updates, and new features.

### Quick Start

1. **Fork the repository** on GitHub.
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and test them locally.
4. **Push to your fork** and **open a pull request** with a clear description.

### Guidelines

- Keep navigation links **consistent across all pages**.
- Preserve the current visual style unless intentionally updating the design site-wide.
- Test changes in a browser (desktop and mobile).
- Update shared assets carefully to avoid breaking links.
- If you add a new page, link it from navigation and update the README.

For detailed contribution guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

By contributing, you agree to maintain a respectful and professional environment for all contributors.

## Project Notes

- The site uses local image assets and a PDF whitepaper.
- `index.html` is only a redirect helper.
- File names are case-sensitive on some hosts, so keep the existing naming as-is.

## License

See [LICENSE](LICENSE) for licensing details.