// App.js — React Native + Expo + Three.js VR overlay scaffold
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';

export default function App() {
  let timeout;

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'blue' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 2;

    const render = () => {
      timeout = requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roofing Estimator with VR Overlay</Text>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
      <Text style={styles.instructions}>Rotate the 3D cube as a VR placeholder</Text>
      <Button title="Start Estimate" onPress={() => alert('Estimator flow coming soon')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  instructions: {
    marginTop: 10,
    color: '#444',
  },
});
