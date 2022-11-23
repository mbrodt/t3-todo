import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, PerspectiveCamera } from "@react-three/drei";

import { Physics, useBox, usePlane, Debug } from "@react-three/cannon";

function Brick({ meshProps, dragging, setDragging }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    ...meshProps,
    type: "Kinematic",
  }));

  const isDragged = dragging && dragging?.uuid === ref.current?.uuid;

  useFrame(({ mouse: { x, y }, viewport: { height, width } }) => {
    if (isDragged) {
      api.velocity.set(0, 0, 0);
      const newX = (x * width) / 2;
      const newZ = -(y * height) / 2;

      const roundedX = Math.round(newX / 0.5) * 0.5;
      const roundedZ = Math.round(newZ / 0.5) * 0.5;
      api.position.set(roundedX, 0, roundedZ);
    }
  });
  return (
    <mesh
      {...meshProps}
      ref={ref}
      onPointerDown={() => setDragging(ref.current)}
      onPointerUp={() => setDragging(null)}
      onTouchStart={() => setDragging(ref.current)}
      onTouchEnd={() => setDragging(null)}
    >
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

const Ground = (props) => {
  const [ref] = usePlane(() => ({
    ...props,
    type: "Static",
    onCollide: (target) => {
      // console.log("collided", target.body);
      // console.log("target position", target.body.position);
    },
  }));

  return (
    <>
      <mesh ref={ref} scale={20}>
        <planeGeometry />
        <meshBasicMaterial color="#5D3BB2" />
      </mesh>
      <gridHelper args={[20, 20]} position={props.position} />
    </>
  );
};

const TestScene = () => {
  const [dragging, setDragging] = useState(false);
  return (
    <Canvas className="h-screen">
      <PerspectiveCamera makeDefault position={[0, 8, 10]} />
      <Sparkles count={2000} scale={20} size={2} />

      <OrbitControls enabled={!dragging} />
      <ambientLight intensity={0.5} />

      <pointLight position={[0, 10, 0]} />
      <Physics>
        {/* <Debug color="black" scale={1.1}> */}
        {/* <Brick position={[-8, 2, 0]} /> */}

        <Brick
          meshProps={{ position: [-8, 0, 0] }}
          dragging={dragging}
          setDragging={setDragging}
        />
        <Brick
          meshProps={{ position: [0, 0, 0] }}
          dragging={dragging}
          setDragging={setDragging}
        />
        <Brick
          meshProps={{ position: [6, 0, 0] }}
          dragging={dragging}
          setDragging={setDragging}
        />

        {/* <Brick position={[6, 10, 0]} /> */}

        <Ground rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.5, 0]} />
        {/* </Debug> */}
      </Physics>
    </Canvas>
  );
};

export default TestScene;
