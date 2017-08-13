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
		}
	},

	init: function(data){
	
		const geometry  = new THREE.Geometry();

		console.log("flat trapezium : ", data.flat);

		//define vertices
		//------------------------------------------------
		let vertices, wingWidth, origin;
		const bottomHeavy = data.topWidth < data.bottomWidth;
		if(bottomHeavy){
			origin 		= -(data.bottomWidth / 2);
			wingWidth 	= (data.bottomWidth - data.topWidth) / 2;
			vertices 	= [
				[origin, 0, 0],
				[(origin + wingWidth), (data.height * !data.flat), -(data.height * data.flat)],
				[(origin + (wingWidth + data.topWidth)), (data.height * !data.flat), -(data.height * data.flat)],
				[(origin + ((wingWidth * 2) + data.topWidth)), 0, 0],
				[(origin + (wingWidth + data.topWidth)), 0, 0],
				[(origin + wingWidth), 0, 0]
			];
			
		} else {
			origin 		= -(data.topWidth / 2);
			wingWidth 	= (data.topWidth - data.bottomWidth) / 2;
			vertices 	= [
				[origin, data.height, 0],
				[(origin + wingWidth), (data.height * !data.flat), -(data.height * data.flat)],
				[(origin + (wingWidth + data.bottomWidth)), (data.height * !data.flat), -(data.height * data.flat)],
				[(origin + ((wingWidth * 2) + data.bottomWidth)), (data.height * !data.flat), -(data.height * data.flat)],
				[(origin + (wingWidth + data.bottomWidth)), 0, 0],
				[(origin + wingWidth), 0, 0]
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
		
		//setup normal etc
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
		flat: "trapezium.flat"
	}
});