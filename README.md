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

Contributions are welcome. Please keep changes focused and consistent with the existing site style.

When contributing:

- Keep navigation links consistent across all pages.
- Preserve the current visual style unless you are intentionally updating the design across the site.
- Test changes in a browser before opening a pull request.
- Update shared assets carefully so image and document links do not break.
- If you add a new page, link it from the navigation and update this README.

Suggested workflow:

1. Fork the repository.
2. Create a feature branch.
3. Make your edits in the relevant HTML files.
4. Preview the site in a browser.
5. Open a pull request with a short summary of what changed.

## Project Notes

- The site uses local image assets and a PDF whitepaper.
- `index.html` is only a redirect helper.
- File names are case-sensitive on some hosts, so keep the existing naming as-is.

## License

See [LICENSE](LICENSE) for licensing details.