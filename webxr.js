import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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

	const loaderGLTF = new GLTFLoader();

	loaderGLTF.load( '../assets/police_hat.glb', function ( hat ) {
		scene.add(hat.scene);
		hat.scene.scale.set(0.075, 0.075, 0.075);
		hat.scene.rotation.set(0, -Math.PI/2, 0);
		hat.scene.position.y = -0.2;
		hat.scene.position.z = -0.4;

	}, function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded') ;
	}, function ( error ) {
		console.error( error );
	} );

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