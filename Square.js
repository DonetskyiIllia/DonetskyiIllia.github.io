let markerVisible = { A: false, B: false, C: false, D: false};

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
		this.D = document.querySelector("#D");

		this.pA = new THREE.Vector3();
		this.pB = new THREE.Vector3();
		this.pC = new THREE.Vector3();
		this.pD = new THREE.Vector3();

		let material = new THREE.MeshLambertMaterial({color:0xFF0000});
		let geometry=new THREE.CylinderGeometry( 0.05, 0.05, 1, 12);
		geometry.applyMatrix4( new THREE.Matrix4().makeTranslation(0, 0.5, 0 ) );
		geometry.applyMatrix4( new THREE.Matrix4().makeRotationX(THREE.MathUtils.degToRad( 90 ) ) );

		this.cylinderAB = new THREE.Mesh( geometry, material );
		this.lineAB = document.querySelector('#lineAB').object3D;
		this.lineAB.add( this.cylinderAB );
		this.cylinderAB.visible = false;

		this.cylinderBC = new THREE.Mesh( geometry, material );
		this.lineBC = document.querySelector('#lineBC').object3D;
		this.lineBC.add( this.cylinderBC );
		this.cylinderBC.visible = false;

		this.cylinderCD = new THREE.Mesh( geometry, material );
		this.lineCD = document.querySelector('#lineCD').object3D;
		this.lineCD.add( this.cylinderCD );
		this.cylinderCD.visible = false;

		this.cylinderDA = new THREE.Mesh( geometry, material );
		this.lineDA = document.querySelector('#lineDA').object3D;
		this.lineDA.add( this.cylinderDA );
		this.cylinderDA.visible = false;
	},
	
	tick: function (time, deltaTime) {
		if ( markerVisible["A"] && markerVisible["B"] ) {
			this.A.object3D.getWorldPosition(this.pA);
			this.B.object3D.getWorldPosition(this.pB);
			let distance = this.pA.distanceTo( this.pB );
			this.lineAB.lookAt( this.pB );
			this.cylinderAB.scale.set(1,1,distance);
			this.cylinderAB.visible = true;
		}
		if ( markerVisible["B"] && markerVisible["C"] ) {
			this.B.object3D.getWorldPosition(this.pB);
			this.C.object3D.getWorldPosition(this.pC);
			let distance = this.pB.distanceTo( this.pC );
			this.lineBC.lookAt( this.pC );
			this.cylinderBC.scale.set(1,1,distance);
			this.cylinderBC.visible = true;
		}
		if ( markerVisible["C"] && markerVisible["D"] ) {
			this.C.object3D.getWorldPosition(this.pC);
			this.D.object3D.getWorldPosition(this.pD);
			let distance = this.pC.distanceTo( this.pD );
			this.lineCD.lookAt( this.pD );
			this.cylinderCD.scale.set(1,1,distance);
			this.cylinderCD.visible = true;
		}
		if ( markerVisible["D"] && markerVisible["A"] ) {
			this.D.object3D.getWorldPosition(this.pD);
			this.A.object3D.getWorldPosition(this.pA);
			let distance = this.pD.distanceTo( this.pA );
			this.lineDA.lookAt( this.pA );
			this.cylinderDA.scale.set(1,1,distance);
			this.cylinderDA.visible = true;
		}
		if ( !markerVisible["A"] )
			this.cylinderAB.visible = this.cylinderCD.visible = false;
		if ( !markerVisible["B"] )
			this.cylinderAB.visible = this.cylinderBC.visible = false;
		if ( !markerVisible["C"] )
			this.cylinderCD.visible = this.cylinderBC.visible = false;
		if ( !markerVisible["D"] )
			this.cylinderCD.visible = this.cylinderDA.visible = false;
	}
});
