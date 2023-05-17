import * as THREE from "/Threejs/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xeeeeee, 1);

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry (1, 1, 1);
const material = new THREE.MeshBasicMaterial(
				{ 
				color: 0x00ff00,
				transparent: true,
				opacity: 0.7,
				wireframe: false
				} );
const cube = new THREE.Mesh( geometry, material);
cube.rotation.y = 45*Math.PI/180;
cube.rotation.x = 15*Math.PI/180;
cube.position.set(0, -3, 0);
scene.add(cube);

const geometryCap = new THREE.CapsuleGeometry( 0.5, 1, 4, 8 ); 
const materialCap = new THREE.MeshLambertMaterial( 
				{
				color: 0xff0000
				} ); 
const capsule = new THREE.Mesh( geometryCap, materialCap ); 
scene.add( capsule );
capsule.position.set(-3, -3, -2);

var lightTwo=new THREE.PointLight(0xffffff, 0.5);
scene.add(lightTwo);
lightTwo.position.set(3, 0, -1);
var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lightOne);
lightOne.position.set(3, 0, -1);

var boxgeometry=new THREE.BoxGeometry(1, 1, 1);
var boxmaterial=new THREE.MeshNormalMaterial(
				{
				color: 0xFF0000,
				transparent: true,
				opacity: 1
				});

var boxmesh=new THREE.Mesh(boxgeometry, boxmaterial);
boxmesh.position.set(-2, 0, 0);
scene.add(boxmesh);

const geometryPir = new THREE.ConeGeometry( 1, 2, 3 ); 
const materialPir = new THREE.MeshLambertMaterial( {color: 0x00ffff} );
const piramide = new THREE.Mesh(geometryPir, materialPir );
piramide.position.set(0, 2.5, 0);
piramide.rotation.y = 45*Math.PI/180;
scene.add(piramide);

var spheregeometry=new THREE.SphereGeometry(0.5);
var spherematerial=new THREE.LineBasicMaterial({color: 0x888888});
var spheremesh=new THREE.Line(spheregeometry, spherematerial);
spheremesh.position.set(0.9, 0, 2);
scene.add(spheremesh);

var circlegeometry=new THREE.CircleGeometry(0.5);
var circlematerial=new THREE.MeshStandardMaterial(
				{
				color: 0x098877,
				roughness: 90.0,
				metalness: 0.2
				});

var circlemesh=new THREE.Mesh(circlegeometry, circlematerial);
circlemesh.position.set(2, 0, 2);
circlemesh.rotation.set(0, 0.5, 0);
scene.add(circlemesh);

const geometryTor = new THREE.TorusGeometry( 2, 0.5, 16, 100 ); 
const materialTor = new THREE.MeshNormalMaterial(); 
const torus = new THREE.Mesh( geometryTor, materialTor ); 
torus.position.set(0, 0, -5);
scene.add( torus );

camera.position.z = 5;

var phi = 0;

function animate()
	{
		requestAnimationFrame( animate);
		renderer.render( scene, camera);

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		//const x = 1.5*Math.cos(phi)+(-3);
		//const z = 1.5*Math.sin(phi)+(-2);
		//phi += Math.PI/180;
		//lightTwo.position.set(x, 0, z);

		//camera.rotation.y += phi/100;
	}

animate();

var paraFunction=function(a, b)
{
var x= (-5) + 5*a;
var y= (-5) + 5*b;
var z=(Math.sin(a*Math.PI)+Math.sin(b*Math.PI))*(-7);
return new THREE.Vector3(x, y, z);
}