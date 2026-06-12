export interface BreakdownItem {
  image: string
  alt: string
  title: string
  text: string
}

export interface Project {
  slug: string
  title: string
  category: string
  tags: string[]
  filterTags: string[]
  metric: string
  desc: string
  tools: string[]
  color: string
  videoIndex: number
  aiDisclosure?: boolean
  breakdown: BreakdownItem[]
}

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'animation', label: 'Animation' },
  { id: 'ai', label: 'IA' },
  { id: 'playable-ads', label: 'Playable Ads' },
] as const

export type FilterId = typeof FILTERS[number]['id']

export const tagColors: Record<string, string> = {
  Blender: '#FF6B35',
  'After Effects': '#A855F7',
  'AI Workflow': '#22C55E',
  'Sound Design': '#EC4899',
  'Low-poly': '#F59E0B',
  'TikTok/IG': '#E1306C',
  GLB: '#6366F1',
  WebXR: '#8B5CF6',
  Optimization: '#14B8A6',
  Unity: '#3B82F6',
  Decentraland: '#06B6D4',
  Figma: '#F43F5E',
  'Blender Cycles': '#FF6B35',
  'Full Pipeline': '#10B981',
  'Blender (Cycles · EEVEE · Grease Pencil)': '#FF6B35',
  'Cinema 4D': '#00D8FF',
  'Rigging': '#84CC16',
  'Simulation': '#F97316',
  'VFX': '#A855F7',
}

export const PROJECTS: Project[] = [
  {
    slug: "michicanos-mx",
    title: "Michicanos MX",
    category: "Original IP",
    tags: ["Blender", "Low-poly", "TikTok", "Instagram"],
    filterTags: ["animation"],
    metric: "25M+ organic views · 4 months · zero paid",
    desc: "Michicanos is an original PS2-inspired low-poly animated IP that blends cats with vibrant retro aesthetics. The project was planned modularly from the ground up for maximum asset reuse, featuring a clean low-poly style optimized for fast rendering and expressive non-realistic animation. It follows a full batch production pipeline: storyboard → 3D animation → compositing → multi-platform export, with weekly release cadence. Scripts are built around strong visual hooks and clear CTAs, drawing inspiration from the dynamic style of Zack D Films and LowPolyShorts. Growth is 100% organic through consistent creative quality and community-driven UGC, with zero paid distribution.",
    tools: ["Blender", "Fl studio", "Eleven Labs", "Nano Banana", "Mixamo", "Whisper AI", "Davinci Resolve"],
    color: "#FF6B35",
    videoIndex: 1,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Character design blockout",
        title: "Character & Visual Direction",
        text: "Started with low-poly character blockouts in Blender, establishing the PS2-inspired aesthetic that defines the IP. The visual direction intentionally references Mexican cultural elements through color palette, accessories, and environments — creating an authentic identity that resonates with the audience."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Animation workflow",
        title: "Animation Pipeline & Batch Production",
        text: "Built a repeatable batch production pipeline optimized for weekly publishing. Each episode follows a template: blockout → rig → animate → light → composite → export. This structure enabled consistent quality at high volume without burning out the pipeline."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Final frame composition",
        title: "Post-Production & Platform Optimization",
        text: "Each piece goes through After Effects for color grading, sound design, and platform-specific export settings. The 9:16 vertical format is optimized for TikTok and Instagram Reels, with hook-driven opening frames designed to maximize retention in the first 2 seconds."
      }
    ]
  },
  {
    slug: "decentraland-environment",
    title: "Decentraland Environment",
    category: "Metaverse",
    tags: ["Blender", "Unity", "GLB", "WebXR"],
    filterTags: ["animation"],
    metric: "Shipped on-chain · browser real-time delivery",
    desc: "Interactive 3D environment shipped inside Decentraland. Assets optimized for real-time browser delivery: atlas texture baking, polygon optimization, WebXR-ready GLB pipeline. Full branded experience including interactive elements and on-chain deployment.",
    tools: ["Blender", "Unity", "Substance Painter"],
    color: "#7B61FF",
    videoIndex: 2,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Environment layout blockout",
        title: "Blockout & Spatial Layout",
        text: "Began with gray-box blockouts in Blender to establish spatial layout, navigation flow, and scale. The environment needed to feel immersive while maintaining performance constraints for browser-based rendering."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Texture baking optimization",
        title: "Optimization & Texture Baking",
        text: "Substance Painter was used for PBR texturing, followed by atlas texture baking to reduce draw calls. Polygon count was aggressively optimized — from high-poly sculpts down to real-time-ready meshes while preserving visual fidelity."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "WebXR deployment",
        title: "WebXR & On-Chain Deployment",
        text: "Final assets were exported as optimized GLB files, imported into Unity for scene assembly, LOD setup, and interactivity scripting. The complete environment was deployed on-chain inside Decentraland with interactive triggers and branded elements."
      }
    ]
  },
  {
    slug: "union-avatars-pipeline",
    title: "Union Avatars — Pipeline",
    category: "Technical Art",
    tags: ["GLB", "WebXR", "Substance", "Blender"],
    filterTags: ["animation"],
    metric: "Production-ready · full optimization pipeline",
    desc: "Stylized 3D avatars for web real-time deployment. Atlas texture baking, shader reduction, UV consolidation, polygon optimization. Consulted on WebXR architecture and scalable deployment strategy for browser-based avatar delivery.",
    tools: ["Blender", "Substance Painter", "Substance Designer"],
    color: "#00B4D8",
    videoIndex: 3,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Avatar sculpt blockout",
        title: "Avatar Base & Topology",
        text: "Started with stylized character sculpts in Blender, focusing on clean topology that would deform well for facial expressions and body movement. Retopology was done with real-time performance as the primary constraint."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Texture atlas optimization",
        title: "UV Consolidation & Atlas Baking",
        text: "All UV maps were consolidated into a single texture atlas to minimize draw calls. Substance Painter was used for PBR material authoring, with baked ambient occlusion and curvature maps to recover detail lost during optimization."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "GLB export and web test",
        title: "GLB Optimization & WebXR Delivery",
        text: "Final pipeline involved shader reduction (removing unnecessary material nodes), polygon consolidation, and compression for GLB export. The avatars were tested in-browser for WebXR readiness and load performance."
      }
    ]
  },
  {
    slug: "cinematic-brand-visualization",
    title: "Cinematic Brand Visualization",
    category: "Cinematic",
    tags: ["Blender Cycles", "After Effects", "AI-assisted"],
    filterTags: ["animation", "ai"],
    metric: "Full pipeline 0 → deliverable · AI-accelerated",
    desc: "Photorealistic 3D renders for brand campaigns. Full Cycles pipeline with AI-assisted texture generation — all modeling, lighting, rigging, and compositing by hand. Delivered across multiple formats and aspect ratios.",
    tools: ["Blender Cycles", "After Effects", "Midjourney"],
    color: "#FFD166",
    videoIndex: 4,
    aiDisclosure: true,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Concept and mood exploration",
        title: "Concept Development & Mood Framing",
        text: "AI-assisted mood board generation via Midjourney helped explore visual directions rapidly. Each concept frame was used as a reference for composition, lighting, and material direction — not as a final asset."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Cycles render setup",
        title: "Lighting & Cycles Render Setup",
        text: "Full scene modeling, lighting, and materials built from scratch in Blender Cycles. Multi-light HDRI setups were used for product hero shots, with custom shader networks for glass, metal, and fabric materials."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Post-production composite",
        title: "Compositing & Multi-Format Delivery",
        text: "Final renders were composited in After Effects with color grading, depth-of-field, and subtle motion. Deliverables were exported across 16:9, 1:1, and 9:16 formats for multi-platform campaign use."
      }
    ]
  },
  {
    slug: "zack-d-films-production",
    title: "Zack D Films — Short-form 3D",
    category: "High-Volume Production",
    tags: ["Blender", "After Effects", "Runway", "Kling"],
    filterTags: ["animation", "ai"],
    metric: "3–5 pieces/week · hook-driven · multi-format",
    desc: "3–5 short-form 3D animated pieces per week. Full pipeline: brief → Blender 3D → AE compositing → multi-format export. AI tools integrated to accelerate asset generation without extending delivery time. Hook-driven structure optimized for platform algorithms.",
    tools: ["Blender", "After Effects", "Runway Gen-3", "Kling"],
    color: "#EF476F",
    videoIndex: 5,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Storyboard and hook planning",
        title: "Hook Strategy & Storyboarding",
        text: "Each piece starts with a hook-first storyboard. The first 2 seconds are designed to stop scroll — using motion, expression changes, or unexpected visual cuts. AI-assisted ideation via Runway helped generate thumbnail concepts and motion tests."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Blender animation pipeline",
        title: "Rapid Animation & Asset Reuse",
        text: "Built a modular Blender pipeline with reusable rigs, environments, and camera setups. Kling was used for generative motion transitions where appropriate. The goal was maintaining hook quality at 3–5 pieces per week without overtime."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Final export across formats",
        title: "Compositing & Algorithm-Optimized Export",
        text: "After Effects compositing added sound design, captions, and platform-specific formatting. Each piece was exported in vertical (9:16), square (1:1), and horizontal (16:9) formats for cross-platform distribution on YouTube Shorts, TikTok, and Instagram."
      }
    ]
  },
  {
    slug: "vtubing-app-imagine",
    title: "VTubing App — Imagine I+D",
    category: "Real-time / Open Source",
    tags: ["Unity", "Real-time", "Open Source", "3D Pipeline"],
    filterTags: ["animation"],
    metric: "Shipped open-source · Unity real-time rendering",
    desc: "Open-source VTubing app developed end-to-end: software architecture, Unity scene setup, 3D character pipeline, real-time rendering optimization. Led brand identity and UX/UI systems alongside multiple XR projects for gaming-adjacent clients.",
    tools: ["Unity", "Blender", "Figma"],
    color: "#06D6A0",
    videoIndex: 6,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "UI/UX and brand design",
        title: "UX Architecture & Brand Identity",
        text: "Led the full brand identity and UX/UI system in Figma — from user flow mapping to pixel-perfect component libraries. The design had to balance accessibility for first-time VTubing users with powerful features for streamers."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Unity character pipeline",
        title: "Unity 3D Character Pipeline",
        text: "Built the Unity asset pipeline for real-time 3D character rendering: rigging, blend shapes for facial tracking, shader setup, and performance optimization. Characters needed to run at 60fps during live streaming with minimal latency."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Open source release",
        title: "Open Source Release & Documentation",
        text: "The complete app was packaged and released as open source, including developer documentation, API references, and setup guides. This allowed the community to fork, customize, and extend the application."
      }
    ]
  },
  {
    slug: "stylized-character-pack",
    title: "Stylized Character Pack",
    category: "Low Poly Assets",
    tags: ["Blender", "Substance Painter", "FBX"],
    filterTags: ["animation"],
    metric: "12 units · game-ready · full rig",
    desc: "A complete pack of 12 stylized low-poly characters designed for game engines. Each character features optimized topology, PBR textures, and a full rig ready for animation. Designed with a cohesive art style for indie game studios.",
    tools: ["Blender", "Substance Painter", "Unity"],
    color: "#F59E0B",
    videoIndex: 7,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Character style sheet",
        title: "Style & Art Direction",
        text: "Created a unified style guide establishing proportions, color palettes, and material conventions across all 12 characters. Each character shares a visual language while maintaining unique silhouettes and personality."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Topology and UV layout",
        title: "Game-Ready Topology & UVs",
        text: "All characters were retopologized for real-time performance, with clean edge flow for deformation. UVs were consolidated into texture atlases to minimize draw calls in engine."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Rigging and weight painting",
        title: "Rigging & Animation Setup",
        text: "Each character was fully rigged with IK/FK switching, facial blend shapes, and weight-painted vertex groups. Exported as FBX with Unity/Unreal compatible bone naming conventions."
      }
    ]
  },
  {
    slug: "motion-reel-2025",
    title: "Motion Reel 2025",
    category: "Showreel",
    tags: ["Blender", "After Effects", "Premiere"],
    filterTags: ["animation", "ai"],
    metric: "2 min reel · 8 projects · 2025",
    desc: "A curated motion reel showcasing 8 projects across 2025 — from low-poly character animation to cinematic brand visualization. The reel highlights range, technical skill, and creative versatility.",
    tools: ["Blender Cycles", "After Effects", "Premiere Pro"],
    color: "#A78BFA",
    videoIndex: 8,
    breakdown: [
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Reel storyboard",
        title: "Curation & Pacing",
        text: "Selected standout shots from 8 projects, arranged in a rhythm that builds energy: open with character work, build through technical pieces, close with cinematic hero shots."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Color grading session",
        title: "Color Grading & Sound Design",
        text: "Each clip was color-graded for consistency across the reel. Sound design was synced to motion peaks, with a custom soundtrack that matches the pacing curve."
      },
      {
        image: "/thumbnails/placeholder.jpg",
        alt: "Final export",
        title: "Multi-Format Export",
        text: "The reel was exported in 16:9 (primary), 9:16 (TikTok/Reels), and 1:1 (Instagram) formats. Each version maintains the same pacing with platform-specific framing."
      }
    ]
  }
];