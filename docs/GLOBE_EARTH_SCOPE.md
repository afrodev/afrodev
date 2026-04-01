# Earth globe (R3F) — scope & progress

Interactive 3D Earth on the marketing landing hero: **React Three Fiber**, **no cloud layer**, **PBR-style** surface with **displacement** for relief, **Fresnel atmosphere** shell, **pointer-driven** rotation (no full Google Earth / tiled LOD pipeline).

---

## Legend

| Tag | Meaning |
|-----|--------|
| **AI** | Implemented or maintained in-repo by automation / dev workflow |
| **You** | Needs your decision, asset, key, or legal review |

---

## Progress

| Status | Task |
|--------|------|
| Done | Dependencies: `three`, `@react-three/fiber`, `@react-three/drei` |
| Done | Vendored textures under `public/textures/earth/` (from [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets), MIT license) |
| Done | Client-only `EarthGlobeCanvas` (`components/earth-globe-canvas.tsx`) — SSR disabled via `dynamic(..., { ssr: false })` on the landing page |
| Done | High-poly sphere + `MeshStandardMaterial` (albedo, normal, displacement) |
| Done | Atmosphere: additive Fresnel shell (no clouds) |
| Done | Pointer → target rotation with frame lerp |
| Done | Default view centered on **Africa** (~20°E) via `FOCUS_LONGITUDE_DEG` in `earth-globe-canvas.tsx`; pointer reset returns to that framing |
| Done | Atmosphere shell parented to the same rotating group as the Earth mesh |
| Done | Hero layout: copy + globe (`components/landing-page.tsx`) |
| Open | **You:** Optional credit line in footer or README for NASA / three.js texture sources if you want stricter attribution |
| Open | **You:** Tune `displacementScale` / `roughness` / atmosphere uniforms if you want subtler relief or a different mood |
| Open | **AI (future):** Wire `earth_specular_2048.jpg` into ocean vs land roughness (needs small shader or texture prep — not required for v1) |
| N/A | **Clouds:** Explicitly out of scope (no cloud mesh; bump texture filename may still say “clouds” — it is only used as height/displacement input) |

---

## Task breakdown

### 1. Stack choice — **AI** — **Done**

- **R3F** on Next.js App Router with **dynamic import** so WebGL never runs on the server.

### 2. Assets — **AI** + **You (optional)**

- **AI:** Downloaded and committed under `public/textures/earth/`.
- **You (optional):** Replace with higher-resolution or differently licensed imagery (e.g. your own baked maps). No API key required for the current setup.

### 3. Globe mesh & materials — **AI** — **Done**

- Sphere with sufficient segments for displacement.
- Maps: color, tangent-space normal, displacement from packed bump/roughness asset.

### 4. Atmosphere — **AI** — **Done**

- Slightly larger sphere, transparent additive material, view-dependent rim.

### 5. Interaction — **AI** — **Done**

- Normalized pointer position sets target `rotation.x` / `rotation.y`; smoothed each frame.

### 6. Integration — **AI** — **Done**

- Hero section two-column grid; globe placeholder while chunk loads.

### 7. Performance & quality — **AI** (ongoing) / **You** (devices)

- **AI:** `dpr` cap, reasonable geometry resolution, texture anisotropy.
- **You:** Test on low-end phones; if needed, ask to reduce segments or texture size.

### 8. “Real Earth” vs “mountains pop” — **You** (eyeball) + **AI** (tweaks)

- True 1:1 planetary relief at web scale is nearly invisible; `displacementScale` is a **visual** knob. Say the word and **AI** can adjust toward subtler or stronger relief.

---

## What does **not** require your input

- No Mapbox / Google Maps / Cesium API keys for this version.
- No server-side rendering of the WebGL scene.

---

## Files

| File | Role |
|------|------|
| `components/earth-globe-canvas.tsx` | Canvas, Earth mesh, atmosphere shader, pointer logic; **camera zoom** = `CAMERA_POSITION` / `CAMERA_FOV_DEG` at top of file |
| `components/landing-page.tsx` | Dynamic import + hero layout |
| `public/textures/earth/*` | Planet textures |

---

_Last updated: implementation pass (hero globe shipped)._
