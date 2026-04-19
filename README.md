# boo.theonline.dev

Static website built with **Zensical**, using custom extensions and automated deployment.

**Repository:** https://git.theonline.dev/boo3/portfolio-website

```bash
git clone https://git.theonline.dev/boo3/portfolio-website.git
````

---

## 🚀 Overview

This project powers the boo.theonline.dev using:

- **Zensical** (static site generator)
- **Markdown** for content
- Custom extension: `gallerycarousel`
- Docker-based local development
- Gitea Actions for CI/CD

---

## 📁 Project Structure

```

.
├── docs/                  # Markdown content
├── site/                  # Generated site output
├── overrides/             # Theme/template overrides
├── gallerycarousel.py     # Custom Markdown extension
├── webp_creator.py        # Image processing helper
├── mkdocs.yml             # Site configuration
├── requirements.txt       # Python dependencies
├── setup.py               # Local module install (gallerycarousel)
├── docker-compose.yml
├── docker-compse-serve-zensical.yml
└── .gitea/workflows/      # CI/CD pipeline

````

---

## ⚙️ Local Development

### Using Docker (recommended)

```bash
docker compose -f docker-compse-serve-zensical.yml up
````

This starts the development server with hot reload.

---

### Manual setup (optional)

```bash
pip install -r requirements.txt
pip install .
zensical serve
```

---

## 🏗️ Build

```bash
zensical build
```

Output is generated in:

```
/site
```

---

## 🔄 Deployment

Deployment is fully automated via **Gitea Actions**:

1. Push to repository
2. Pipeline installs dependencies + local module
3. Runs `zensical build`
4. Copies `/site` output to deployment repository
5. Commits and pushes changes

---

## 🧩 Custom Extension

### `gallerycarousel`

Custom Markdown extension for image/video carousels.

Example usage:

```
{(image_carousel[
/assets/images/example1.webp
/assets/images/example2.webp
])}
```

Requires installation during build:

```bash
pip install .
```

---

## 🛠️ Troubleshooting

### Docker issues

* Verify Docker is running
* Check correct compose file (`docker-compse-serve-zensical.yml`)
* Rebuild containers if needed:

```bash
docker compose -f docker-compse-serve-zensical.yml up --build
```

---

## 📜 License

See `LICENSE` file for details.
