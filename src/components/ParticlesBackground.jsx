import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

const ParticlesField = ({ count = 5000 }) => {
  const ref = useRef()
  
  // 生成随机粒子位置
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // 在球体内随机分布粒子
      const spherical = random.inSphere(new Float32Array(3), { radius: 1.5 })
      positions.set(spherical, i * 3)
      
      // 为粒子设置颜色（蓝色到紫色渐变）
      const hue = 0.6 + Math.random() * 0.2 // 蓝色到紫色
      const saturation = 0.5 + Math.random() * 0.5
      const lightness = 0.4 + Math.random() * 0.6
      
      // HSL 转 RGB
      const c = (1 - Math.abs(2 * lightness - 1)) * saturation
      const x = c * (1 - Math.abs(((hue * 6) % 2) - 1))
      const m = lightness - c / 2
      
      let r, g, b
      if (hue < 1/6) {
        r = c; g = x; b = 0
      } else if (hue < 2/6) {
        r = x; g = c; b = 0
      } else if (hue < 3/6) {
        r = 0; g = c; b = x
      } else if (hue < 4/6) {
        r = 0; g = x; b = c
      } else if (hue < 5/6) {
        r = x; g = 0; b = c
      } else {
        r = c; g = 0; b = x
      }
      
      colors[i * 3] = r + m
      colors[i * 3 + 1] = g + m
      colors[i * 3 + 2] = b + m
    }
    
    return [positions, colors]
  }, [count])

  useFrame((state, delta) => {
    if (ref.current) {
      // 缓慢旋转粒子场
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
      
      // 粒子呼吸效果
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // AdditiveBlending
        />
        <bufferAttribute
          attach="geometry-attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </Points>
    </group>
  )
}

const FloatingOrbs = () => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2
      const radius = 2.5 + Math.random() * 1
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 2
      
      return {
        position: [x, y, z],
        color: `hsl(${240 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
        scale: 0.1 + Math.random() * 0.1
      }
    })
  }, [])
  
  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <Orb key={index} {...orb} index={index} />
      ))}
    </group>
  )
}

const Orb = ({ position, color, scale, index }) => {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      ref.current.position.y = position[1] + Math.sin(time + index) * 0.5
      ref.current.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.2
    }
  })
  
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.3}
        blending={2} // AdditiveBlending
      />
    </mesh>
  )
}

const ParticlesBackground = ({ 
  className = '',
  particleCount = 5000,
  showOrbs = true,
  intensity = 1 
}) => {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -1 }}>
      <Canvas
        camera={{ 
          position: [0, 0, 4], 
          fov: 45,
          near: 0.1,
          far: 100 
        }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.1 * intensity} />
        
        {/* 粒子场 */}
        <ParticlesField count={particleCount} />
        
        {/* 浮动光球 */}
        {showOrbs && <FloatingOrbs />}
        
        {/* 雾效 */}
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  )
}

// 简化版本（用于性能较低的设备）
export const SimpleParticlesBackground = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
      <div className="absolute inset-0">
        {/* CSS 动画粒子 */}
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ParticlesBackground