AFRAME.registerGeometry("trapezium", {
	
	schema : {
		topWidth: { 
			default: 1, 
			min: 0 
		},
		bottomWidth: { 
			default: 2, 
			min: 0
		},
		height: { 
			default: 1, 
			min: 0
		},
		flat: {
			default: false
		},
		pivot: {
			default: "center"
		}
	},

	init: function(data){
	
		const geometry  = new THREE.Geometry();
		const { flat, height, topWidth, bottomWidth, pivot } = data;

		let yOrigin;
		switch(pivot){
			case "center":
				yOrigin = -(height / 2);
				break;
			case "top":
				yOrigin = -height;
				break;
			case "bottom":
				yOrigin = 0;
				break;
		}

		//define vertices
		//------------------------------------------------
		const bottomHeavy 	= topWidth < bottomWidth;
		const xOrigin 		= bottomHeavy ? -bottomWidth / 2 : -topWidth / 2;
		const wingWidth 	= bottomHeavy ? (bottomWidth - topWidth) / 2 : (topWidth - bottomWidth) / 2;



		let vertices;
		if(bottomHeavy){
			vertices = [
				[xOrigin, (yOrigin * !flat), -(yOrigin * flat)],
				[(xOrigin + wingWidth), ((height + yOrigin) * !flat), -((height + yOrigin) * flat)],
				[(xOrigin + (wingWidth + topWidth)), ((height + yOrigin) * !flat), -((height + yOrigin) * flat)],
				[(xOrigin + ((wingWidth * 2) + topWidth)), (yOrigin * !flat), -(yOrigin * flat)],
				[(xOrigin + (wingWidth + topWidth)), (yOrigin * !flat), -(yOrigin * flat)],
				[(xOrigin + wingWidth), (yOrigin * !flat), -(yOrigin * flat)]
			];
			
		} else {
			vertices = [
				[xOrigin, ((height + yOrigin) * !flat), -((height + yOrigin) * flat)],
				[(xOrigin + wingWidth), ((height + yOrigin) * !flat), -((height + yOrigin) * flat)],
				[(xOrigin + (wingWidth + bottomWidth)), ((height + yOrigin) * !flat), -((height + yOrigin) * flat)],
				[(xOrigin + ((wingWidth * 2) + bottomWidth)), ((height + yOrigin) * !flat), -((height + yOrigin) * flat)],
				[(xOrigin + (wingWidth + bottomWidth)), (yOrigin * !flat), -(yOrigin * flat)],
				[(xOrigin + wingWidth), (yOrigin * !flat), -(yOrigin * flat)]
			];
		}
	
		//define faces
		//-------------------------------------------------
		let faces = [
			[5, 1, 0],
			[5, 2, 1],
			[5, 4, 2],
			[4, 3, 2]
		];
		
		//attach vertices
		//-----------------------------------------------
		let vertex, vector3;
		for(vertex of vertices){
			vector3 = new THREE.Vector3(vertex[0], vertex[1], vertex[2]);
			geometry.vertices.push(vector3);
		}
		geometry.computeBoundingBox();
		geometry.computeBoundingSphere();
		
		//attach faces
		//-----------------------------------------------
		let face, face3;
		for(face of faces){
			face3 = new THREE.Face3(face[0], face[1], face[2]);
			geometry.faces.push(face3);
		}
		
		//setup normals etc
		//-----------------------------------------------
		geometry.mergeVertices();         
		geometry.computeFaceNormals();    
		geometry.computeVertexNormals();  
		
		this.geometry = geometry;
  }//init
});

AFRAME.registerPrimitive('a-trapezium', {
	defaultComponents: {
		geometry: {
			primitive: "trapezium"
		}
	},
	mappings: {
		height: 'geometry.height',
		topwidth: 'geometry.topWidth',
		bottomwidth: 'geometry.bottomWidth',
		flat: "geometry.flat"
	}
});