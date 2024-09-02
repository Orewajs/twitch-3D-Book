import * as THREE from "three";
import { frames } from "../constants";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Index = () => {
  return (
    <>
      <group rotation={[-Math.PI * 0.1, Math.PI * 0.1, 0]}>
        {frames.map((frame, index) => {
          return <Page key={index} {...frame} index={index} />;
        })}
      </group>
    </>
  );
};

export default Index;

const Page = (props) => {
  const [isTurned, setIsTurned] = useState(false);
  const { url, index } = props;
  const texture = useTexture(url);
  const meshRef = useRef();

  const handleCLick = (e) => {
    e.stopPropagation();
    setIsTurned(!isTurned);
  };

  useEffect(() => {
    meshRef.current.geometry.translate(0.5, 0, 0);
  }, []);

  useEffect(() => {
    if (isTurned) {
      gsap.to(meshRef.current.position, {
        z: frames.length * 0.01 - 0.01 * index,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(meshRef.current.rotation, {
        y: -Math.PI,
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(meshRef.current.position, {
        z: 0.01 * index,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(meshRef.current.rotation, {
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [isTurned]);

  return (
    <mesh
      ref={meshRef}
      {...props}
      position={[0, 0, 0.01 * index]}
      onClick={handleCLick}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial side={THREE.DoubleSide} map={texture} />
    </mesh>
  );
};
