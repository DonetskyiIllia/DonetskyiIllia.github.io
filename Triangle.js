let markerVisible = { A: false, B: false, C: false};

AFRAME.registerComponent('registerevents', {
	init: function () {
		var marker = this.el;
		marker.addEventListener('markerFound', function() {
			markerVisible[ marker.id ] = true;
			console.log(markerVisible);
		});
		marker.addEventListener('markerLost', function() {
			markerVisible[ marker.id ] = false;
			console.log(markerVisible);
		});
	}
});


AFRAME.registerComponent('run', {
	init: function() {
		this.A = document.querySelector("#A");
		this.B = document.querySelector("#B");
		this.C = document.querySelector("#C");

		this.pA = new THREE.Vector3();
		this.pB = new THREE.Vector3();
		this.pC = new THREE.Vector3();

		let material = new THREE.MeshLambertMaterial({color:0xFF0000});
		let geometry=new THREE.CylinderGeometry( 0.05, 0.05, 1, 12);
		geometry.applyMatrix4( new THREE.Matrix4().makeTranslation(0, 0.5, 0 ) );
		geometry.applyMatrix4( new THREE.Matrix4().makeRotationX(THREE.MathUtils.degToRad( 90 ) ) );

		this.cylinderAB = new THREE.Mesh( geometry, material );
		this.lineAB = document.querySelector('#lineAB').object3D;
		this.lineAB.add( this.cylinderAB );
		//this.cylinderAB.visible = false;

		this.cylinderBC = new THREE.Mesh( geometry, material );
		this.lineBC = document.querySelector('#lineBC').object3D;
		this.lineBC.add( this.cylinderBC );
		//this.cylinderBC.visible = false;

		this.cylinderCA = new THREE.Mesh( geometry, material );
		this.lineCA = document.querySelector('#lineCA').object3D;
		this.lineCA.add( this.cylinderCA );
		//this.cylinderCA.visible = false;
	},
});
