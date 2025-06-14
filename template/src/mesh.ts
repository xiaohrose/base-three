import * as THREE from 'three';


export default ({ scene }: any) => {
    const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
    const cameraHelper = new THREE.CameraHelper(camera2);
    scene.add(cameraHelper);
};
