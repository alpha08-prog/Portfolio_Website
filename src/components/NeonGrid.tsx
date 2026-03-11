import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Animated grid plane with neon glow shader
const gridVertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave animation
    float wave = sin(pos.x * 0.5 + uTime * 0.8) * 0.15 
               + sin(pos.z * 0.3 + uTime * 0.6) * 0.1;
    pos.y += wave;
    vElevation = wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const gridFragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  
  void main() {
    // Grid lines
    vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
    float line = min(grid.x, grid.y);
    float gridAlpha = 1.0 - min(line, 1.0);
    
    // Neon color with elevation tint
    float elevation = (vElevation + 0.3) / 0.6;
    vec3 colorCyan = vec3(0.0, 1.0, 1.0);
    vec3 colorPurple = vec3(0.7, 0.3, 1.0);
    vec3 color = mix(colorPurple, colorCyan, elevation);
    
    // Fade edges
    float fadeX = 1.0 - abs(vUv.x - 0.5) * 2.0;
    float fadeZ = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float fade = fadeX * fadeZ;
    fade = smoothstep(0.0, 0.3, fade);
    
    gl_FragColor = vec4(color, gridAlpha * 0.4 * fade);
  }
`;

export default function NeonGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[40, 40, 60, 60]} />
      <shaderMaterial
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
