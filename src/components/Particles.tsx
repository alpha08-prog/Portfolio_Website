import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// GPU Particle system using custom vertex/fragment shaders
const vertexShader = `
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  
  varying float vAlpha;
  varying vec3 vColor;
  
  void main() {
    vec3 pos = position;
    
    // Drift animation
    float t = uTime * aSpeed + aOffset;
    pos.y += sin(t * 0.7 + pos.x) * 0.3;
    pos.x += cos(t * 0.5 + pos.z) * 0.2;
    pos.z += sin(t * 0.3 + pos.y) * 0.2;
    
    // Mouse parallax repulsion
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mvPos;
    vec2 screenPos = projected.xy / projected.w;
    float dist = length(screenPos - uMouse);
    float repulse = smoothstep(0.4, 0.0, dist) * 0.5;
    pos.x += (screenPos.x - uMouse.x) * repulse;
    pos.y += (screenPos.y - uMouse.y) * repulse;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Fade by depth + pulsing alpha
    vAlpha = 0.3 + 0.4 * sin(t * 1.2 + aOffset);
    
    // Color variation cyan <-> purple
    float colorMix = sin(aOffset * 3.14) * 0.5 + 0.5;
    vColor = mix(vec3(0.0, 1.0, 1.0), vec3(0.7, 0.3, 1.0), colorMix);
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  
  void main() {
    // Circular soft particle
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = (1.0 - d * 2.0) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

interface ParticlesProps {
  count?: number;
  mouse: React.MutableRefObject<[number, number]>;
}

export default function Particles({ count = 2000, mouse }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  const { positions, sizes, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles across a large volume
      positions[i * 3 + 0] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sizes[i] = Math.random() * 2.5 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.1;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, speeds, offsets };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.current[0], mouse.current[1]);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
