var scene, camera, renderer;
var arToolkitSource, arToolkitContext;

document.addEventListener("DOMContentLoaded", initialize);

function initialize()
{
	scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
				
	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////


	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
		sourceWidth: 1280,
		sourceHeight: 720,
		// resolution displayed for the source
		displayWidth: 1280,
		displayHeight: 720
	});

	function onResize()
	{
		arToolkitSource.onResizeElement();
		arToolkitSource.copyElementSizeTo(renderer.domElement);
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(onResize);
	
	// handle resize event
	window.addEventListener('resize', function(){
		onResize();
	});
	
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: '/Assets/camera_para.dat',
		detectionMode: 'mono'
	});
	
	// copy projection matrix to camera when initialization complete
	arToolkitContext.init(() => {
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	let markerHiro = new THREE.Group();

	scene.add(markerHiro);

	let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerHiro, {
			type : 'pattern', patternUrl : "/Assets/pattern-hiro.patt",
		});
	

	let markerKanji = new THREE.Group();

	scene.add(markerKanji);

	markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerKanji, {
			type : 'pattern', patternUrl : "/Assets/pattern-kanji.patt",
		});
	
	const texture = new THREE.TextureLoader().load("/Textures/perlin-512.png"); 
	const materialTexture = new THREE.MeshBasicMaterial( { map:texture } );

	const geometry = new THREE.SphereGeometry(2, 64, 32); 
	const sphere = new THREE.Mesh( geometry, materialTexture );
	sphere.position.set(0, 0, 0);
	//scene.add(sphere);
	
	const geometryPlane = new THREE.PlaneGeometry( 40, 5 );
	const materialPlane = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometryPlane, materialPlane );
	plane.rotation.x = -45*Math.PI/180;
	plane.position.set(0, -1, 0);
	
	let group = new THREE.Group();
	group.add(plane);
	group.add(sphere);
	scene.add( group );

	group.rotation.set(0, 0, -Math.PI/6);
	//group.scale.set(0.25, 0.25, 0.25);


let x, y, t=0, r = 1;

let timer=new THREE.Clock();

function anima()
{
	t += timer.getDelta()*5;
		
	x=r*(t-Math.sin(t))-20;
	y=r*(1-Math.cos(t))-0;
	sphere.position.set(x, y, 0);
	if(x>20)
		t=0;	

	camera.position.x = -20+t;
	camera.position.y = 10-t/2;
}

	anima();
	markerHiro.add(group);
	animate();

}



function animate()
{
	requestAnimationFrame(animate);

	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
	renderer.render( scene, camera );
}

