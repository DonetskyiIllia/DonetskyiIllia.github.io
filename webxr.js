import * as THREE from 'three';

import { ARButton } from 'three/addons/webxr/ARButton.js'; //2

document.addEventListener("DOMContentLoaded", async () => {

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera();

	const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);

	const geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
	const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, -0.3);
	scene.add(mesh);

	var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(lightOne);

	const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
	scene.add(light);

	renderer.xr.enabled = true;//1

	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
	});

	const arButton = ARButton.createButton(renderer, {//3a
		optionalFeatures: ["dom-overlay"],//3b
		domOverlay: {root: document.body}//3c
	});//3d
	document.body.appendChild(arButton);//4
});
