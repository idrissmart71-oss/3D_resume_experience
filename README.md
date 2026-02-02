# 🎬 Idris Saify — Cinematic 3D Interactive Resume

A AAA-quality cinematic 3D web experience showcasing Idris Saify's professional journey through 5 evolving stages, built with React Three Fiber.

## 🌟 Features

- **5 Cinematic Stages**: Origin → Builder → Engineer → Innovation Engineer → Visionary
- **Animated Camera**: Smooth keyframe-based cinematography
- **Dynamic Lighting**: Stage-specific lighting that transitions seamlessly
- **Particle Systems**: 5000+ ambient particles with stage-specific effects
- **Post-Processing**: Bloom, vignette, and film grain for cinematic quality
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Zero Backend**: 100% frontend — no server required

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📦 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in with GitHub
3. Click "Add New Project"
4. Import this repository
5. Vercel auto-detects Vite and deploys!

**That's it!** No configuration needed. Vercel handles everything automatically.

## 🎮 Interactive Controls

- **Auto Play**: Stages automatically transition every 12 seconds
- **Manual Navigation**: Click stage buttons in the right panel
- **Camera**: Smooth cinematic camera movements per stage

## 🎨 Customization

### Update Resume Data

Edit `src/App.jsx` to update:
- Personal information
- Projects
- Skills
- Contact details

### Modify Stages

Each stage is a separate component in `src/components/stages/`:
- `Stage1_Origin.jsx` — Early life and learning
- `Stage2_Builder.jsx` — Building projects
- `Stage3_Engineer.jsx` — Engineering work
- `Stage4_Innovation.jsx` — STEM Innovation Engineer role
- `Stage5_Future.jsx` — Future vision

### Adjust Timing

Edit `src/hooks/useStageTimer.js`:
```javascript
const STAGE_DURATION = 12000; // 12 seconds per stage
const TRANSITION_DURATION = 2000; // 2 second transition
```

## 📁 Project Structure

```
idris-resume-3d/
├── src/
│   ├── components/
│   │   ├── stages/
│   │   │   ├── Stage1_Origin.jsx
│   │   │   ├── Stage2_Builder.jsx
│   │   │   ├── Stage3_Engineer.jsx
│   │   │   ├── Stage4_Innovation.jsx
│   │   │   └── Stage5_Future.jsx
│   │   ├── CameraRig.jsx
│   │   ├── CinematicScene.jsx
│   │   ├── GlobalLighting.jsx
│   │   ├── ParticleSystem.jsx
│   │   └── SceneController.jsx
│   ├── hooks/
│   │   └── useStageTimer.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Tech Stack

- **React** — UI framework
- **Three.js** — 3D graphics
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Useful helpers
- **@react-three/postprocessing** — Visual effects
- **Vite** — Build tool
- **Vercel** — Hosting platform

## ❓ FAQ

### Do I need a backend?

**No!** This is 100% frontend. No server, no database, no API calls.

### Can I deploy to other platforms?

Yes! You can deploy to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- Any static hosting service

### How do I add more stages?

1. Create a new component: `src/components/stages/Stage6_YourStage.jsx`
2. Import it in `SceneController.jsx`
3. Add it to the `stages` array
4. Add camera path in `CameraRig.jsx`
5. Add lighting in `GlobalLighting.jsx`

### Performance issues?

Reduce particle count in `ParticleSystem.jsx`:
```javascript
const particleCount = 2000; // Lower from 5000
```

## 📧 Contact

**Idris Saify**
- Email: idrissaify4@gmail.com
- GitHub: [@idrissmart](https://github.com/idrissmart)
- LinkedIn: [idrissaify](https://linkedin.com/in/idrissaify)

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

**Built with 🔥 by Idris Saify**
