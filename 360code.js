import * as THREE from "/Threejs/three.module.js";
//import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var cube, lightTwo, torus, renderer, scene, camera, controls;

const button = document.getElementById("start");
button.addEventListener("click", start);

function start()
{
	button.style.display = "none";
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0xeeeeee, 1);
	document.body.appendChild( renderer.domElement );
	controls = new OrbitControls( camera, renderer.domElement );
	
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = [
		new THREE.MeshBasicMaterial({
			color: Math.random()*0xffffff,
			transperent: true,
			opacity: 0.7,
			wireframe: false
			}),
		new THREE.MeshBasicMaterial({
			color: Math.random()*0xffffff,
			transperent: true,
			opacity: 0.7,
			wireframe: false
			}),
		new THREE.MeshBasicMaterial({
			color: Math.random()*0xffffff,
			transperent: true,
			opacity: 0.7,
			wireframe: false
			}),
		new THREE.MeshBasicMaterial({
			color: Math.random()*0xffffff,
			transperent: true,
			opacity: 0.7,
			wireframe: false
			}),
		new THREE.MeshBasicMaterial({
			color: Math.random()*0xffffff,
			transperent: true,
			opacity: 0.7,
			wireframe: false
			})
	]
	cube = new THREE.Mesh(geometry, material);
	cube.rotation.y = 45*Math.PI/180;
	cube.rotation.x = 45*Math.PI/180;

	scene.add(cube);

	const geometryCapsule = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
	const materialCapsule = new THREE.MeshPhongMaterial({color: 0xff0000});
	const capsule = new THREE.Mesh(geometryCapsule, materialCapsule);
	scene.add(capsule);
	capsule.position.set(-3, 0, -2);

	var lightOne = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(lightOne);
	var lightTwo = new THREE.PointLight(0xffffff, 0.5);
	scene.add(lightOne);
	lightTwo.position.set(-1.5, 0, -1);

	const geometryTorus = new THREE.TorusGeometry(3, 1.5, 16, 100);
	const materialTorus = new THREE.MeshBasicMaterial();
	const torus = new THREE.Mesh(geometryTorus, materialTorus);
	scene.add(torus);
	torus.position.set(-10, 0, -15);

	const light3 = new THREE.HemisphereLight(0xffffbb, 0x030820, 1);
	scene.add(light3);

	const loader = new THREE.TextureLoader();

	const texture = loader.load("/Video/image1.jpg");

	material[0].map = loader.load("/Video/cube1.jpg");
	material[1].map = loader.load("/Video/cube2.jpg");
	material[2].map = loader.load("/Video/cube3.jpg");
	//material[3].map = loader.load("/*file*/");
	material[4].map = loader.load("/Video/cube4.jpg");
	//material[5].map = loader.load("/Video/cube5.jpg");

	const geometryPlane = new THREE.PlaneGeometry(16, 9);
	const materialPlane = new THREE.MeshBasicMaterial({color: 0xffffff});
	const plane = new THREE.Mesh( geometryPlane, materialPlane );
	scene.add(plane);
	plane.position.set(10, 0, -10);

	materialCapsule.map = texture;

	const video = document.getElementById("videoQ");
	video.play();
	const video_texture = new THREE.VideoTexture(video);
	materialPlane.map = video_texture;
	const video2 = document.getElementById("videoToby");
	video2.play();
	const video_texture2 = new THREE.VideoTexture(video2);

	material[3].map = video_texture2;
	materialTorus.map = video_texture2;

	camera.position.z = 5;
	controls.update();

	animate();
}

function animate()
{
	requestAnimationFrame( animate);
	

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	controls.update();

	renderer.render( scene, camera);
}
