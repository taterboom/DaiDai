import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { VOXLoader, VOXMesh } from "three/examples/jsm/loaders/VOXLoader"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { Box, OrbitControls } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import { Group, Mesh, Object3D, Plane, Raycaster, Vector3 } from "three"

const Floor = () => {
  return (
    <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshPhongMaterial></meshPhongMaterial>
      <planeGeometry args={[20, 20]}></planeGeometry>
    </mesh>
  )
}

const LogoModel = () => {
  // @ts-ignore
  const vox = useLoader(VOXLoader, "/cat.vox")
  const meshes = useMemo(() => {
    return vox.map((item) => new VOXMesh(item))
  }, [vox])

  const raycaster = useRef(new Raycaster())
  const plane = useRef(new Plane(new Vector3(0, 0, 1)))
  const mousePosition = useRef([0, 0])
  const pivotPoint = useRef(new Object3D())

  useFrame((state) => {
    const from = {
      x:
        mousePosition.current[0] / window.innerWidth -
        (state.size.left + state.size.width / 2) / window.innerWidth,
      y: -(
        mousePosition.current[1] / window.innerHeight -
        (state.size.top + state.size.height / 2) / window.innerHeight
      ),
    }
    const intersectPoint = new Vector3()
    raycaster.current.setFromCamera(from, state.camera)
    raycaster.current.ray.intersectPlane(plane.current, intersectPoint)
    intersectPoint.z = 10
    pivotPoint.current?.lookAt(intersectPoint)
  })

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mousePosition.current = [e.clientX, e.clientY]
    })
  }, [])

  return (
    <primitive object={pivotPoint.current}>
      <group position={[5, 2, 0]}>
        {meshes.map((mesh, index) => (
          <primitive key={index} object={mesh}></primitive>
        ))}
        <primitive object={plane.current} />
      </group>
    </primitive>
  )
}

const FollowBox = () => {
  const el = useRef<Mesh>()
  const raycaster = useRef(new Raycaster())
  const plane = useRef(new Plane(new Vector3(0, 0, 1)))
  const mousePosition = useRef([0, 0])

  useFrame((state) => {
    const from = {
      x:
        mousePosition.current[0] / window.innerWidth -
        (state.size.left + state.size.width / 2) / window.innerWidth,
      y: -(
        mousePosition.current[1] / window.innerHeight -
        (state.size.top + state.size.height / 2) / window.innerHeight
      ),
    }
    const intersectPoint = new Vector3()
    raycaster.current.setFromCamera(from, state.camera)
    raycaster.current.ray.intersectPlane(plane.current, intersectPoint)
    intersectPoint.z = 2
    el.current?.lookAt(intersectPoint)
  })

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mousePosition.current = [e.clientX, e.clientY]
    })
  }, [])

  return (
    <group>
      <Box ref={el}>
        <meshPhongMaterial color="#f3f3f3" />
      </Box>
      <primitive object={plane.current} />
    </group>
  )
}

type DaidaiLogoSceneProps = {
  children?: React.ReactNode
}

const DaidaiModel = (props: DaidaiLogoSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }} gl={{ antialias: true }} shadows>
      <ambientLight color="#f2f4fe" />
      <directionalLight
        // ref={lightRef}
        castShadow
        color="#f2f4fe"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* <gridHelper />
      <axesHelper args={[4]} />
      <OrbitControls /> */}
      <LogoModel />
      {/* <FollowBox /> */}
      {/* <Floor /> */}
    </Canvas>
  )
}
export default DaidaiModel
