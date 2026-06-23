# Portfolio Website

A professional portfolio website featuring a smoke/cursor effect, dark theme, and smooth animations.

## ✨ Features

- 🌫️ **Smoke effect** — Canvas-based particles that follow the cursor (throttled, performance-friendly)
- 📑 **Sections** — Hero, About, Skills, Projects, Contact, Footer
- 🎬 **Animations** — Framer Motion (scroll reveal, loading, hover, parallax on About)
- 📱 **Responsive** — Mobile hamburger menu, touch-friendly
- 🎨 **Theme** — Dark (`#0a0a0f`) with primary (`#6366f1`) and secondary (`#8b5cf6`)

## 🛠️ Tech Stack

- React 19 + Vite 8
- Tailwind CSS 3
- Framer Motion

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📦 Build

```bash
npm run build
npm run preview
```

## 📄 CV

The CV is located at `public/Muhammad_Raza_CV.pdf`. The "Download CV" button in the Hero section links to it.

To replace the CV:
- Overwrite that file, **or**
- Update the link in `src/components/Hero.jsx`

## 📁 Project Structure

```
Portfolio-Website/
├── public/
│   └── Muhammad_Raza_CV.pdf
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 📄 License

This project is for personal/portfolio use.
