import * as THREE from "/Threejs/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const texture = new THREE.TextureLoader().load("../Textures/perlin-512.png"); 
const materialTexture = new THREE.MeshBasicMaterial( { map:texture } );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xeeeeee, 1);

document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(2, 64, 32); 
//const material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
const sphere = new THREE.Mesh( geometry, materialTexture );
sphere.position.set(0, 0, 0);
scene.add( sphere );

const geometryPlane = new THREE.PlaneGeometry( 5, 5 );
const materialPlane = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
plane.rotation.x = -45*Math.PI/180;
plane.position.set(0, -1, 0);
scene.add( plane );

camera.position.z = 20;

var phi = Math.PI/180;

/*function Jumper()
	{
		var count = 0;
		for (var i = 0; i < 999; i++)
		{
			sphere.position.y += 0.001;
			count ++;
		}
		console.log("count= ", count);
		for (var i = 0; i < 999; i++)
		{
			sphere.position.y -= 0.001;
			sphere.rotation.y += phi/100;
		}
	}*/

function movingUp()
	{
		for (var i = 0; i < 9; i++)
		{
			sphere.position.y += 0.1;
		}
	}

function movingdown()
	{
		for (var i = 0; i < 9; i++)
		{
			sphere.position.y -= 0.1;
		}
	}

function animate()
	{
		requestAnimationFrame( animate);
		renderer.render( scene, camera);
		//Jumper();
		/*
		sphere.position.y += 0.1;
		if (sphere.position.y > 10)
			sphere.position.set(0, 10, 0);
		if (sphere.position.y <= 10)
			sphere.position.y -= 0.1;
		console.log(sphere.position.y);
*/
		//movingUp()
		//movingdown()
	}

animate();

