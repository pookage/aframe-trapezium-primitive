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

		//define vertices
		//------------------------------------------------
		const yOrigin 		= -(data.height / 2);
		const bottomHeavy 	= data.topWidth < data.bottomWidth;
		const xOrigin 		= bottomHeavy ? -(data.bottomWidth) / 2 : -(data.topWidth) / 2;
		const wingWidth 	= bottomHeavy ? (data.bottomWidth - data.topWidth) / 2 : wingWidth 	= (data.topWidth - data.bottomWidth) / 2;

		let vertices;
		if(bottomHeavy){
			vertices = [
				[xOrigin, (yOrigin * !data.flat), -(yOrigin * data.flat)],
				[(xOrigin + wingWidth), ((data.height + yOrigin) * !data.flat), -((data.height + yOrigin) * data.flat)],
				[(xOrigin + (wingWidth + data.topWidth)), ((data.height + yOrigin) * !data.flat), -((data.height + yOrigin) * data.flat)],
				[(xOrigin + ((wingWidth * 2) + data.topWidth)), (yOrigin * !data.flat), -(yOrigin * data.flat)],
				[(xOrigin + (wingWidth + data.topWidth)), (yOrigin * !data.flat), -(yOrigin * data.flat)],
				[(xOrigin + wingWidth), (yOrigin * !data.flat), -(yOrigin * data.flat)]
			];
			
		} else {
			vertices = [
				[xOrigin, ((data.height + yOrigin) * !data.flat), -((data.height + yOrigin) * data.flat)],
				[(xOrigin + wingWidth), ((data.height + yOrigin) * !data.flat), -((data.height + yOrigin) * data.flat)],
				[(xOrigin + (wingWidth + data.bottomWidth)), ((data.height + yOrigin) * !data.flat), -((data.height + yOrigin) * data.flat)],
				[(xOrigin + ((wingWidth * 2) + data.bottomWidth)), ((data.height + yOrigin) * !data.flat), -((data.height + yOrigin) * data.flat)],
				[(xOrigin + (wingWidth + data.bottomWidth)), (yOrigin * !data.flat), -(yOrigin * data.flat)],
				[(xOrigin + wingWidth), (yOrigin * !data.flat), -(yOrigin * data.flat)]
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