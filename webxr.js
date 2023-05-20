import { ARButton } from 'three/addons/webxr/ARButton.js'; //2

import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xeeeeee, 1);

document.body.appendChild( renderer.domElement );
	
const texture = new THREE.TextureLoader().load("/Textures/perlin-512.png"); 
const materialTexture = new THREE.MeshBasicMaterial( { map:texture } );

const texture1 = new THREE.TextureLoader().load("/Textures/grass texture.jpg"); 
const materialTexture1 = new THREE.MeshBasicMaterial( { map:texture1 } );
	
const geometry = new THREE.SphereGeometry(2, 64, 32); 
const sphere = new THREE.Mesh( geometry, materialTexture );
sphere.position.set(0, 0, 0);

const geometryPlane = new THREE.PlaneGeometry( 40, 5 );
const materialPlane = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryPlane, materialTexture1 );
plane.rotation.x = -45*Math.PI/180;
plane.position.set(0, -1, 0);
	
let group = new THREE.Group();
group.add(plane);
group.add(sphere);
scene.add( group );

group.rotation.set(0, 0, -Math.PI/6);

group.scale.set(0.01, 0.01, 0.01);

camera.position.set(0, 0, 0.2);

let x, y, t = 0, r = 1;

let timer=new THREE.Clock();

function animate()
{
	requestAnimationFrame(animate);

	t += timer.getDelta()*5;
		
	x=r*(t-Math.sin(t))-20;
	y=r*(1-Math.cos(t))-0;
	sphere.position.set(x, y, 0);
	if(x>20)
		t=0;	

	camera.position.x = (-20+t)*0.01;
	camera.position.y = (12-t/2)*0.01;

	renderer.render( scene, camera );
}

	renderer.xr.enabled = true;//1

	const arButton = ARButton.createButton(renderer, {//3a
		optionalFeatures: ["dom-overlay"],//3b
		domOverlay: {root: document.body}//3c
	});//3d
	document.body.appendChild(arButton);//4

animate();
