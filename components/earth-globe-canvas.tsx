"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const BASE = "/textures/earth";

/**
 * Camera / zoom — “fly closer” knobs (all live in this file).
 *
 * - `CAMERA_POSITION` **[x, y, z]**: camera location. Smaller **positive z** = closer to Earth
 *   (you’re moving along +Z toward the origin). Nudge **x/y** to orbit slightly off-axis.
 * - `CAMERA_FOV_DEG`: field of view. **Lower** = tighter lens / more zoomed-in look; **higher** = wider.
 * - `EarthGlobeCanvas` prop **`radius`** (default below): larger sphere = Earth fills more of the frame.
 * - Pointer sensitivity: `onPointerMove` uses `0.65` / `0.35` multipliers — spin speed, not zoom.
 */
const CAMERA_POSITION: [number, number, number] = [0, 0, 4.15];
const CAMERA_FOV_DEG = 40;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 40;

/** °E — central Africa / Great Lakes–Nigeria band faces camera when pointer is neutral */
const FOCUS_LONGITUDE_DEG = 20;

/**
 * Default SphereGeometry maps equator UV u=0.25 to λ ≈ −90° (toward +Z camera).
 * Rotate Y by (π/2 − φ) so meridian λ sits on +Z, with u = (λ+180)/360, φ = u·2π.
 */
function longitudeToInitialYRad(lonDegEast: number) {
  const u = (lonDegEast + 180) / 360;
  const phi = u * Math.PI * 2;
  return Math.PI / 2 - phi;
}

function AtmosphereShell({ radius }: { radius: number }) {
  const material = React.useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color("#7ec8ff") },
          uPower: { value: 2.35 },
          uIntensity: { value: 1.05 },
          uCamPos: { value: new THREE.Vector3() },
        },
        vertexShader: /* glsl */ `
          varying vec3 vWorldNormal;
          varying vec3 vWorldPos;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPos = worldPosition.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uPower;
          uniform float uIntensity;
          uniform vec3 uCamPos;
          varying vec3 vWorldNormal;
          varying vec3 vWorldPos;
          void main() {
            vec3 viewDir = normalize(uCamPos - vWorldPos);
            float ndv = max(dot(viewDir, vWorldNormal), 0.0);
            float edge = pow(1.0 - ndv, uPower);
            gl_FragColor = vec4(uColor * edge * uIntensity, edge * 0.75);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      }),
    []
  );

  const { camera } = useThree();

  useFrame(() => {
    camera.getWorldPosition(material.uniforms.uCamPos.value);
  });

  React.useEffect(() => {
    return () => material.dispose();
  }, [material]);

  return (
    <mesh renderOrder={2} material={material}>
      <sphereGeometry args={[radius * 1.045, 64, 64]} />
    </mesh>
  );
}

function EarthBody({
  radius,
  rotationRef,
  homeYRad,
}: {
  radius: number;
  rotationRef: React.MutableRefObject<{ x: number; y: number }>;
  homeYRad: number;
}) {
  const group = React.useRef<THREE.Group>(null);

  React.useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = homeYRad;
    g.rotation.x = 0;
  }, [homeYRad]);

  const [colorMap, normalMap, displacementMap] = useTexture(
    [
      `${BASE}/earth_atmos_2048.jpg`,
      `${BASE}/earth_normal_2048.jpg`,
      `${BASE}/earth_bump_roughness_clouds_4096.jpg`,
    ],
    (textures) => {
      const [color, normal, disp] = textures as THREE.Texture[];
      color.colorSpace = THREE.SRGBColorSpace;
      color.anisotropy = 8;
      normal.colorSpace = THREE.LinearSRGBColorSpace;
      normal.anisotropy = 8;
      disp.colorSpace = THREE.LinearSRGBColorSpace;
      disp.anisotropy = 8;
    }
  );

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = rotationRef.current;
    const k = 1 - Math.pow(0.001, delta);
    const targetY = homeYRad + t.y;
    const targetX = t.x;
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x, -0.45, 0.45);
  });

  return (
    <group ref={group} renderOrder={0}>
      <mesh>
        <sphereGeometry args={[radius, 192, 192]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.55, 0.55)}
          displacementMap={displacementMap}
          displacementScale={0.12}
          displacementBias={-0.02}
          metalness={0.04}
          roughness={0.62}
        />
      </mesh>
      <AtmosphereShell radius={radius} />
    </group>
  );
}

function Scene({
  rotationRef,
  radius,
}: {
  rotationRef: React.MutableRefObject<{ x: number; y: number }>;
  radius: number;
}) {
  const homeYRad = React.useMemo(
    () => longitudeToInitialYRad(FOCUS_LONGITUDE_DEG),
    []
  );

  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[5, 2.5, 5]}
        intensity={2.1}
        color="#fff8ee"
      />
      <directionalLight
        position={[-4, -1, -2]}
        intensity={0.35}
        color="#a8c4ff"
      />
      <EarthBody
        radius={radius}
        rotationRef={rotationRef}
        homeYRad={homeYRad}
      />
    </>
  );
}

export interface EarthGlobeCanvasProps {
  className?: string;
  /** World units; camera framed for ~2 */
  radius?: number;
}

export default function EarthGlobeCanvas({
  className,
  radius = 2,
}: EarthGlobeCanvasProps) {
  const rotationRef = React.useRef({ x: 0, y: 0 });

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      rotationRef.current.y = nx * 0.65;
      rotationRef.current.x = THREE.MathUtils.clamp(ny * 0.35, -0.45, 0.45);
    },
    []
  );

  const onPointerLeave = React.useCallback(() => {
    rotationRef.current.x = 0;
    rotationRef.current.y = 0;
  }, []);

  return (
    <div
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      role="img"
      aria-label="Interactive 3D Earth"
    >
      <Canvas
        camera={{
          position: CAMERA_POSITION,
          fov: CAMERA_FOV_DEG,
          near: CAMERA_NEAR,
          far: CAMERA_FAR,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
        dpr={[1, 2]}
      >
        <React.Suspense fallback={null}>
          <Scene rotationRef={rotationRef} radius={radius} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
