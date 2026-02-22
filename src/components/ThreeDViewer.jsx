import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

function RotatingModel() {
    const meshRef = useRef()

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.3
            meshRef.current.rotation.y += delta * 0.5
        }
    })

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.35, 128, 32]} />
            <meshStandardMaterial
                color="#c8baa0"
                metalness={0.6}
                roughness={0.3}
            />
        </mesh>
    )
}

export default function ThreeDViewer() {
    return (
        <div className="threed-viewer" id="threed-viewer">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <pointLight position={[-4, -4, -4]} intensity={0.4} color="#e8e0d0" />
                <RotatingModel />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                <Environment preset="city" />
            </Canvas>
            <div className="threed-viewer__label">
                <span className="threed-viewer__badge">3D Model Placeholder</span>
                <p className="threed-viewer__hint">Replace with your actual 3D model — supports .glb / .gltf via <code>useGLTF</code></p>
            </div>
        </div>
    )
}
