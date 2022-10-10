import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { VOXLoader } from "three/examples/jsm/loaders/VOXLoader"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { Box, OrbitControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group, Mesh, Plane, Raycaster, Vector3 } from "three"

const Floor = () => {
  return (
    <mesh position={[0, -4, 0]} rotation={[0, 0, 0]} receiveShadow>
      <meshPhongMaterial></meshPhongMaterial>
      <planeGeometry args={[20, 20]}></planeGeometry>
    </mesh>
  )
}

const LogoModel = () => {
  const mtl = useLoader(MTLLoader, "/cat.mtl")
  const obj = useLoader(OBJLoader, "/cat.obj", (loader) => {
    mtl.preload()
    // @ts-ignore
    loader.setMaterials(mtl)
  })
  // @ts-ignore
  const vox = useLoader(VOXLoader, "/cat.vox")
  // @ts-ignore
  const geometry = obj.children[0].geometry
  console.log(obj, vox, mtl)

  const mousePosition = useRef([0, 0])

  useFrame((state) => {
    obj.lookAt(
      (mousePosition.current[0] / window.innerWidth - 1 / 2) * 8,
      -(mousePosition.current[1] / window.innerHeight - 1 / 2) * 8,
      state.camera.position.z
    )
  })

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mousePosition.current = [e.clientX, e.clientY]
    })
  }, [])
  return <primitive object={obj} position={[0, -30, 0]}></primitive>
}

const FollowBox = () => {
  const el = useRef<Mesh>()
  const mousePosition = useRef([0, 0])
  const raycaster = useRef(new Raycaster())
  const plane = useRef(new Plane(new Vector3(0, 0, 2)))

  useFrame((state) => {
    const from = {
      x: mousePosition.current[0] / window.innerWidth - 1 / 2,
      y: -(mousePosition.current[1] / window.innerHeight - 1 / 2),
    }
    const intersectPoint = new Vector3()
    raycaster.current.setFromCamera(from, state.camera)
    raycaster.current.ray.intersectPlane(plane.current, intersectPoint)
    // intersectPoint.z = 0
    console.log(intersectPoint)
    el.current?.lookAt(intersectPoint)
  })

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mousePosition.current = [e.clientX, e.clientY]
    })
  }, [])
  return (
    <group>
      <Box ref={el} />
      <primitive object={plane.current} />
    </group>
  )
}

type DaidaiLogoSceneProps = {
  children?: React.ReactNode
}

const DaidaiModel = (props: DaidaiLogoSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: true }} shadows>
      <ambientLight />
      <directionalLight
        // ref={lightRef}
        castShadow
        color="red"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <gridHelper />
      <axesHelper args={[4]} />
      <OrbitControls />
      <LogoModel />
      <FollowBox />
      <Floor />
    </Canvas>
  )
}
export default DaidaiModel
