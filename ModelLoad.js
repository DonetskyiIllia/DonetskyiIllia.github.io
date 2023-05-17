import * as THREE from "../Threejs/three.module.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xeeeeee, 1);

document.body.appendChild( renderer.domElement );

camera.position.z = 3;

var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lightOne);
lightOne.position.set(3, 0, -1);

const loader = new GLTFLoader();

loader.load( '/Models/scene.gltf', function ( home ) {

	scene.add( home.scene );

}, function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}, function ( error ) {

	console.error( error );

} );

scene.position.set(0, -1, 0);

function animate()
	{
		requestAnimationFrame( animate);
		renderer.render( scene, camera);
		scene.rotation.y += Math.PI/180;
	}

animate();

