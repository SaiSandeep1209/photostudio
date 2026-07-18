import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

// A stylized camera built from primitives (no external asset, always loads).
// Orange accents + strong rim lighting so the dark body reads while floating
// on the transparent canvas. Rendered on a transparent GL context so only the
// camera is visible — it hovers directly on the hero background.
function CameraModel() {
  const body = { color: '#3a3f4a', metalness: 0.62, roughness: 0.34 }
  const dark = { color: '#20242c', metalness: 0.55, roughness: 0.42 }
  const barrel = { color: '#2b303a', metalness: 0.7, roughness: 0.28 }
  return (
    <group rotation={[0.1, -0.5, 0]} scale={1.15}>
      {/* body */}
      <mesh castShadow><boxGeometry args={[3.1, 1.95, 1.15]} /><meshStandardMaterial {...body} /></mesh>
      {/* top plate */}
      <mesh position={[0, 1.05, 0]}><boxGeometry args={[3.0, 0.22, 1.05]} /><meshStandardMaterial {...dark} /></mesh>
      {/* pentaprism hump */}
      <mesh position={[0, 1.4, 0]}><boxGeometry args={[1.0, 0.6, 0.9]} /><meshStandardMaterial {...body} /></mesh>
      {/* grip */}
      <mesh position={[-1.78, -0.05, 0]}><boxGeometry args={[0.6, 1.8, 1.15]} /><meshStandardMaterial {...body} /></mesh>
      {/* shutter button (orange, emissive) */}
      <mesh position={[-1.78, 1.05, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.16, 24]} />
        <meshStandardMaterial color="#FF6A2C" emissive="#FF6A2C" emissiveIntensity={0.7} metalness={0.3} roughness={0.3} />
      </mesh>
      {/* mode dial */}
      <mesh position={[1.15, 1.2, -0.2]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.2, 32]} /><meshStandardMaterial {...dark} />
      </mesh>
      {/* lens barrel */}
      <group position={[0.35, -0.05, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh><cylinderGeometry args={[0.98, 1.05, 1.55, 48]} /><meshStandardMaterial {...barrel} /></mesh>
        {/* focus ring */}
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[1.08, 1.08, 0.3, 48]} /><meshStandardMaterial color="#14171d" metalness={0.5} roughness={0.6} /></mesh>
        {/* emissive orange accent ring */}
        <mesh position={[0, -0.8, 0]}>
          <torusGeometry args={[0.94, 0.08, 16, 64]} />
          <meshStandardMaterial color="#FF6A2C" emissive="#FF6A2C" emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
        {/* front glass */}
        <mesh position={[0, -0.82, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.12, 48]} />
          <meshStandardMaterial color="#141a24" metalness={0.9} roughness={0.06} emissive="#FFB020" emissiveIntensity={0.2} />
        </mesh>
      </group>
      {/* rear dial (amber hint) */}
      <mesh position={[1.2, 0.5, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.12, 32]} />
        <meshStandardMaterial color="#FFB020" emissive="#FFB020" emissiveIntensity={0.3} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Rig({ reduced }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} />
      <directionalLight position={[-3, 1, 4]} intensity={1.1} color="#cfd6ff" />
      <pointLight position={[-5, 1, 3]} intensity={70} color="#FF6A2C" />
      <pointLight position={[5, -2, 2]} intensity={30} color="#FFB020" />
      <spotLight position={[0, 7, 3]} angle={0.5} penumbra={1} intensity={30} color="#ffffff" />

      <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.9}>
        <CameraModel />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.85}
      />
    </>
  )
}

export default function CameraScene() {
  const reduced = usePrefersReducedMotion()
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 8.5], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      aria-label="Interactive 3D camera, drag to rotate"
      role="img"
    >
      <Suspense fallback={null}>
        <Rig reduced={reduced} />
      </Suspense>
    </Canvas>
  )
}
