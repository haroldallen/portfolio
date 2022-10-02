
import * as THREE from '../node_modules/three/build/three.module.js';

import { AsciiEffect } from '../node_modules/three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';

let camera, controls, scene, renderer, effect;

let sphere, square, pfp;

const start = Date.now();

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLightMid = new THREE.PointLight(0xffffff);
    pointLightMid.position.set(0, 0, 0);
    pointLightMid.intensity = 0.25;
    scene.add(pointLightMid);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
    pointLight2.position.set(- 500, - 500, - 500);
    scene.add(pointLight2);

    sphere = new THREE.Mesh(new THREE.SphereGeometry(120, 25, 25), new THREE.MeshPhongMaterial({ flatShading: true }));
    console.log(window.innerWidth / 3.5);
    sphere.position.set(-window.innerWidth / 3.5, window.innerHeight / 4, 0);
    scene.add(sphere);

    square = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshPhongMaterial({ flatShading: true }));
    console.log(window.innerWidth / 3);
    square.position.set(window.innerWidth / 3.35, -window.innerHeight / 3, 0);
    scene.add(square);

    const pfptexture = new THREE.TextureLoader().load('./assets/pfp.png');
    pfp = new THREE.Mesh(new THREE.CircleGeometry(75, 75, 75), new THREE.MeshBasicMaterial({ map: pfptexture }));
    console.log(window.innerHeight/2)
    pfp.position.set(0, 55, 201);
    scene.add(pfp);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';
    document.body.appendChild(effect.domElement);

    controls = new TrackballControls(camera, effect.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    sphere.position.x = -window.innerWidth / 3.5; square.position.x = window.innerWidth / 3.5;

    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    const timer = Date.now() - start;

    sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 100 - document.getElementsByClassName('content')[0].scrollTop / 5 + window.innerHeight / 4;
    sphere.rotation.x = timer * 0.0003;
    sphere.rotation.z = timer * 0.0002;

    square.position.y = document.getElementsByClassName('content')[0].scrollTop / 5 - window.innerHeight / 3;
    square.rotation.x = timer * 0.0005;
    square.rotation.z = timer * -0.0007;

    controls.update();

    effect.render(scene, camera);
}
