// Background
scene.background = new THREE.CubeTextureLoader()
	.setPath( 'background/' )
	.load( [
		'posx.jpg',
		'negx.jpg',
		'posy.jpg',
		'negy.jpg',
		'posz.jpg',
		'negz.jpg'
	] );

// Importacao de modelos junto com mapeamento de material (de textura ou cor)
var texture;

// Chao
texture = new THREE.TextureLoader().load('img/carpet.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 5 );
texture.anisotropy = 16;
var mat_fl = new THREE.MeshLambertMaterial({map: texture, color: 0xffffff});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('floor.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_fl;
        }
    });
	scene.add(object);
})

// Chao do Jardim
// definir e posicionar plano, analogo ao modelo garden-floor.obj
var geometry = new THREE.PlaneGeometry( 698, 250, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x003000, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = + Math.PI/2;
plane.position.set(100,-112,435);
scene.add( plane );

// Grama [baseada no exemplo: https://al-ro.github.io/]
/////
// variaveis para o mesh de uma folha
var joints = 4;
var bladeWidth = 0.12;
var bladeHeight = 1;
// area em que se pode adicionar grama
var width = 1000000; // quanto maior mais liberdade de posição

var pos = new THREE.Vector2(0.01, 0.01);

// numero de folhas de grama a serem criadas
var instances = 200000;

// variaveis para o shader utilizado na grama
var resolution = 64;
var delta = width/resolution;
var azimuth = 0.4;
var elevation = 0.2;
var ambientStrength = 0.2;
var translucencyStrength = 1.5;
var specularStrength = 0.5;
var diffuseStrength = 1.5;
var shininess = 256;
var sunColour = new THREE.Vector3(1.0, 1.0, 1.0);
var specularColour = new THREE.Vector3(1.0, 1.0, 1.0);

// mapeamento das texturas a serem aplicadas nas folhas de grama
var loader = new THREE.TextureLoader();
loader.crossOrigin = '';
var grassTexture = loader.load( 'img/blade_diffuse.jpg' );
var alphaMap = loader.load( 'img/blade_alpha.jpg' );
var noiseTexture = loader.load( 'img/perlinFbm.jpg' );
noiseTexture.wrapS = THREE.RepeatWrapping;
noiseTexture.wrapT = THREE.RepeatWrapping;

// definir um plano para geometria de uma folha de grama
var grassBaseGeometry = new THREE.PlaneBufferGeometry(bladeWidth, bladeHeight, 1, joints);
grassBaseGeometry.translate(0, bladeHeight/2, 0);

// para curvatura das folhas deve aplicar uma rotação, definida pelos três quaternions a seguir
let vertex = new THREE.Vector3();
let quaternion0 = new THREE.Quaternion();
let quaternion1 = new THREE.Quaternion();
let x, y, z, w, angle, sinAngle, rotationAngle;

// rotação em y
angle = 0.05;
sinAngle = Math.sin(angle / 2.0);
rotationAxis = new THREE.Vector3(0, 1, 0);
x = rotationAxis.x * sinAngle;
y = rotationAxis.y * sinAngle;
z = rotationAxis.z * sinAngle;
w = Math.cos(angle / 2.0);
quaternion0.set(x, y, z, w);

// rotação em x
angle = 0.3;
sinAngle = Math.sin(angle / 2.0);
rotationAxis.set(1, 0, 0);
x = rotationAxis.x * sinAngle;
y = rotationAxis.y * sinAngle;
z = rotationAxis.z * sinAngle;
w = Math.cos(angle / 2.0);
quaternion1.set(x, y, z, w);

// combinar rotações em um unico quaternion
quaternion0.multiply(quaternion1);

// rotação em z
angle = 0.1;
sinAngle = Math.sin(angle / 2.0);
rotationAxis.set(0, 0, 1);
x = rotationAxis.x * sinAngle;
y = rotationAxis.y * sinAngle;
z = rotationAxis.z * sinAngle;
w = Math.cos(angle / 2.0);
quaternion1.set(x, y, z, w);

// combinar rotações em um unico quaternion
quaternion0.multiply(quaternion1);

let quaternion2 = new THREE.Quaternion();

// aplicar curvatura na folha de grama para adicionar realismo
for(let v = 0; v < grassBaseGeometry.attributes.position.array.length; v += 3){
	quaternion2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
	vertex.x = grassBaseGeometry.attributes.position.array[v];
	vertex.y = grassBaseGeometry.attributes.position.array[v+1];
	vertex.z = grassBaseGeometry.attributes.position.array[v+2];
	let frac = vertex.y/bladeHeight;
	quaternion2.slerp(quaternion0, frac);
	vertex.applyQuaternion(quaternion2);
	grassBaseGeometry.attributes.position.array[v] = vertex.x;
	grassBaseGeometry.attributes.position.array[v+1] = vertex.y;
	grassBaseGeometry.attributes.position.array[v+2] = vertex.z;
}

// mesh básico para a folha
grassBaseGeometry.computeFaceNormals();
grassBaseGeometry.computeVertexNormals();
var baseMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
var baseBlade = new THREE.Mesh(grassBaseGeometry, baseMaterial);

// instanced geometry para cada folha a ser inserida
var instancedGeometry = new THREE.InstancedBufferGeometry();
// atributos da geometria
instancedGeometry.index = grassBaseGeometry.index;
instancedGeometry.attributes.position = grassBaseGeometry.attributes.position;
instancedGeometry.attributes.uv = grassBaseGeometry.attributes.uv;
instancedGeometry.attributes.normal = grassBaseGeometry.attributes.normal;

// para cada folha definir um indice, tamanho, posição e orientação
var indices = [];
var offsets = [];
var scales = [];
var halfRootAngles = [];

// para cada folha da grama
for (let i = 0; i < instances; i++){
	indices.push(i/instances);
	// definir uma posição aleatória
	x = -92.5 + Math.random()*697;
	z = 473 + Math.random()*243.5;
  y = 0;
  offsets.push(x, y, z);

	// orientação aleatória
  let angle = Math.PI - Math.random() * (2 * Math.PI);
  halfRootAngles.push(Math.sin(0.5*angle), Math.cos(0.5*angle));

  // definir tamanho da folha
  if(i % 3 != 0){
  	scales.push(8.0+Math.random() * 2.0);
  }else{
    scales.push(8.0+Math.random());
  }
}

// informações geradas como atributos
var offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3);
var scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(scales), 1);
var halfRootAngleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(halfRootAngles), 2);
var indexAttribute = new THREE.InstancedBufferAttribute(new Float32Array(indices), 1);

//aplicando na instanced geometry
instancedGeometry.setAttribute( 'offset', offsetAttribute);
instancedGeometry.setAttribute( 'scale', scaleAttribute);
instancedGeometry.setAttribute( 'halfRootAngle', halfRootAngleAttribute);
instancedGeometry.setAttribute( 'index', indexAttribute);

// definir o material, utilizar os uniforms para o shader
var grassMaterial = new THREE.RawShaderMaterial( {
  uniforms: {
    time: {type: 'float', value: 0},
		delta: {type: 'float', value: delta },
  	posX: {type: 'float', value: pos.x },
  	posZ: {type: 'float', value: pos.y },
  	radius: {type: 'float', value: radius },
  	width: {type: 'float', value: width },
    map: { value: grassTexture},
    alphaMap: { value: alphaMap},
    noiseTexture: { value: noiseTexture},
		sunDirection: {type: 'vec3', value: new THREE.Vector3(Math.sin(azimuth), Math.sin(elevation), -Math.cos(azimuth))},
		cameraPosition: {type: 'vec3', value: camera.position},
		ambientStrength: {type: 'float', value: ambientStrength},
    translucencyStrength: {type: 'float', value: translucencyStrength},
    diffuseStrength: {type: 'float', value: diffuseStrength},
    specularStrength: {type: 'float', value: specularStrength},
    shininess: {type: 'float', value: shininess},
    lightColour: {type: 'vec3', value: sunColour},
    specularColour: {type: 'vec3', value: specularColour},
  },
  vertexShader: document.getElementById( 'grassVertexSource' ).textContent,
  fragmentShader: document.getElementById( 'grassFragmentSource' ).textContent,
  side: THREE.DoubleSide
} );

// construir o mesh completo e adicionar à cena
var grass = new THREE.Mesh(instancedGeometry, grassMaterial);
scene.add(grass);

// Teto
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('ceiling.obj', function(object) {
	scene.add(object);
})

// Paredes
texture = new THREE.TextureLoader().load('img/brick.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 3 );
texture.anisotropy = 16;
var mat_wall_1 = new THREE.MeshLambertMaterial({map: texture, color: 0xFFFFFF});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('back-wall.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_wall_1;

        }
    });
	scene.add(object);
})

texture = new THREE.TextureLoader().load('img/brick2.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 6 );
texture.anisotropy = 16;
var mat_wall_2 = new THREE.MeshLambertMaterial({map: texture, color: 0xFFFFFF});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('window-wall.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_wall_2;
        }
    });
	scene.add(object);
})

texture = new THREE.TextureLoader().load('img/brick.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 3 );
texture.anisotropy = 16;
var mat_wall_3 = new THREE.MeshLambertMaterial({map: texture, color: 0xFFFFFF});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('wall1.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_wall_3;
        }
    });
	scene.add(object);
})

texture = new THREE.TextureLoader().load('img/brick.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 3 );
texture.anisotropy = 16;
var mat_wall_4 = new THREE.MeshLambertMaterial({map: texture, color: 0xFFFFFF});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-wall.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_wall_4;
        }
    });
	scene.add(object);
})

// Moldura da janela
var mat_frame = new THREE.MeshStandardMaterial({color: 0x9c9c9c,
    roughness: 0.5,
    metalness: 1,
    envMapIntensity: 3
});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('window-frame.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_frame;
        }
	});
	scene.add(object);
})

// Vidro da janela
var mat_glass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
	metalness: 0,
	roughness: 0.34,
	transparency: 0.9,
  opacity: 1,
	transparent: true,
	side: THREE.DoubleSide
});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('window-glass.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_glass;
        }
	});
	scene.add(object);
})

// Porta do jardim
var mat_garden_frame = new THREE.MeshStandardMaterial({color: 0x9c9c9c,
    roughness: 0.5,
    metalness: 0.5,
    envMapIntensity: 3
});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-door-frame.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_garden_frame;
        }
	});
	scene.add(object);
})
var mat_garden_door = new THREE.MeshStandardMaterial({color: 0x6c6c6c,
    roughness: 0.4,
    metalness: 0.2,
    envMapIntensity: 3
});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-door1.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_garden_door;
        }
	});
	scene.add(object);
})

var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-door2.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_garden_door;
        }
	});
	scene.add(object);
})

// Vidro do jardim
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-glass1.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_glass;
        }
	});
	scene.add(object);
})
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-glass2.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_glass;
        }
	});
	scene.add(object);
})

// Macaneta do jardim
var mat_garden_knob = new THREE.MeshPhysicalMaterial({color: 0x141414,
        emissive: 0x000000,
        roughness: 0.5,
        metalness: 0.2,
        reflectivity: 0.37,
        clearcoatRoughness: 0.5
});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('garden-knob.obj', function(object) {
  object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
			       child.material = mat_garden_knob;
        }
	});
	scene.add(object);
})

// Macaneta da porta
var mat_knob = new THREE.MeshPhongMaterial({
    color: 0x4c4c4c,
    emissive: 0x141414,
    specular: 0x636363,
    shininess: 20
  });
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('knob.obj', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_knob;
        }
    });
    scene.add(object);
})

// Porta
var mat_door = new THREE.MeshLambertMaterial({color: 0xffffff});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('door.obj', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_door;
        }
    });
    scene.add(object);
})

var mat_door_frame = new THREE.MeshLambertMaterial({color: 0xe1e1e1});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('door-frame.obj', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_door_frame;
        }
    });
    scene.add(object);
})

// Lampada
var mat_light = new THREE.MeshLambertMaterial({color: 0xFFFFCC});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('light-bulb.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
                child.material = mat_light;
        }
    });
	scene.add(object);
})

// Haste da lampada
var mat_lightbase = new THREE.MeshPhysicalMaterial({color: 0xa8a8a8,
        emissive: 0x323232,
        roughness: 0.5,
        metalness: 0.8,
        reflectivity: 0.37,
        clearcoatRoughness: 0.5
});
var objLoader = new THREE.OBJLoader();
  objLoader.setPath('obj/');
  objLoader.load('light-base.obj', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
                child.material = mat_lightbase;
        }
    });
	scene.add(object);
})

// Listas de objetos para serem transportados pelo DragControls
var drag_table = [];
var drag_sofa_1 = [];
var drag_sofa_2 = [];
var drag_clock = [];

// Mesa central
var mat_table = new THREE.MeshLambertMaterial({color: 0x96653A});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('table.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_table;
            child.name = "mesa"; //Nome para identificar a mesa, a ser usado ao identificar a selecao
        }
    });
    scene.add(object);
    drag_table.push(object); //Colocar na lista de objetos para o Drag Controls da mesa
})

// Sofa 1
var mat_sofa_1 = new THREE.MeshLambertMaterial({color: 0x8c8c97});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('sofa1.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_sofa_1;
            child.name = "sofa 1"; //Nome para identificar o sofa 1, a ser usado ao identificar a selecao

        }
    });
    scene.add(object);
    drag_sofa_1.push(object); //Colocar na lista de objetos para o Drag Controls do sofa 1
})

// Sofa 2
var mat_sofa_2 = new THREE.MeshLambertMaterial({color: 0x8c8c97});
objLoader.setPath('obj/');
objLoader.load('sofa2.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_sofa_2;
            child.name = "sofa 2"; //Nome para identificar o sofa 2, a ser usado ao identificar a selecao
        }
    });
    scene.add(object);
    drag_sofa_2.push(object); //Colocar na lista de objetos para o Drag Controls do sofa 2
})

// Batente da TV
texture = new THREE.TextureLoader().load('img/wood.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 3 );
var mat_wood = new THREE.MeshLambertMaterial({map: texture, color: 0xffffff});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('shelves.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_wood;
        }
    });
	scene.add(object);
})

// Haste do batente
var mat_sup = new THREE.MeshPhongMaterial({
    color: 0x4c4c4c,
    emissive: 0x141414,
    specular: 0x636363,
    shininess: 20
  });
  var objLoader = new THREE.OBJLoader();
  objLoader.setPath('obj/');
  objLoader.load('shelves-sup.obj', function(object) {
      object.traverse(function(child) {
          if (child instanceof THREE.Mesh){
              child.material = mat_sup;
          }
      });
      scene.add(object);
  })

// Relogio
var group = new THREE.Group();
scene.add(group);
drag_clock.push(group);

var materials = {
	clockWrapper: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	clock: new THREE.MeshPhongMaterial(
		{
			color: 0xFFFFFF,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	line: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handHour: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handMinute: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handSecond: new THREE.MeshPhongMaterial(
		{
			color: 0xFF0000,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handSecondCircle: new THREE.MeshPhongMaterial(
		{
			color: 0xFF0000,
			shininess: 10,
			shading: THREE.FlatShading
		}
	)
};

var bigRadius = 110;
var depthWrapper = 10;
var clockWrapperGeometry = new THREE.CylinderGeometry(bigRadius, bigRadius, depthWrapper, 360)
var clockWrapper = new THREE.Mesh(clockWrapperGeometry, materials.clockWrapper);
clockWrapper.translateZ(0);
clockWrapper.name = "relogio"; //Nome para identificar o relogio, a ser usado ao identificar a selecao
clockWrapper.rotateX(Math.PI / 2);
group.add(clockWrapper);

var radius = 100;
var depthFace = 20;
var clockGeometry = new THREE.CylinderGeometry(radius, radius, depthFace, 360)
var clock = new THREE.Mesh(clockGeometry, materials.clock);
clock.translateZ(0);
clock.rotateX(Math.PI / 2);
clock.name = "relogio"; //Nome para identificar o relogio, a ser usado ao identificar a selecao
group.add(clock);

var spacing = 5;
var lineLength = 20;
var lineWidth = 5;

for (var i = 0; i < 60; i += 5) {
	var lineGeometry = null;
	var line = null;
	var lineParent = new THREE.Group();
	var lineAngle = (6 * Math.PI * i)/180;
	lineParent.rotateZ(lineAngle);
	lineGeometry = new THREE.BoxGeometry(lineWidth, lineLength, 1);

    line = new THREE.Mesh(lineGeometry, materials.line);
	line.translateOnAxis(new THREE.Vector3(0, 1, 0), radius - lineLength/2 - spacing);
	line.translateOnAxis(new THREE.Vector3(0, 0, 1), depthFace/2 );

	lineParent.add(line);
	group.add(lineParent);
}

var spacingHand = 15;

var lineWidthHandHour = 5;
var handHourLength = 60;
var boxGeometry3 = new THREE.BoxGeometry(lineWidthHandHour, handHourLength, 1);
var handHourParent = new THREE.Object3D();
var handHour = new THREE.Mesh(boxGeometry3, materials.handHour);
handHourParent.add(handHour);
handHour.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), handHourLength / 2 - spacingHand);
handHour.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthFace/2 + 2);
group.add(handHourParent);

var lineWidthHandMinute = 5;
var handMinuteLength = 80;
var boxGeometry4 = new THREE.BoxGeometry(lineWidthHandMinute, handMinuteLength, 1);
var handMinuteParent = new THREE.Object3D();
var handMinute = new THREE.Mesh(boxGeometry4, materials.handMinute);
handMinuteParent.add(handMinute);
handMinute.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), handMinuteLength / 2 - spacingHand);
handMinute.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthFace/2 + 3);
group.add(handMinuteParent);

var lineWidthHandSecond = 1;
var handSecondLength = 90;
var boxGeometry5 = new THREE.BoxGeometry(lineWidthHandSecond, handSecondLength, 1);
var handSecondParent = new THREE.Object3D();
var handSecond = new THREE.Mesh(boxGeometry5, materials.handSecond);
handSecondParent.add(handSecond);
handSecond.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), handSecondLength / 2 - spacingHand);
handSecond.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthFace/2 + 4);
group.add(handSecondParent);

var radiusSmall = 3;
var circleGeometry = new THREE.CircleGeometry(radiusSmall, 360 );
var circle = new THREE.Mesh( circleGeometry, materials.handSecondCircle);
circle.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthFace/2 + 5 );
group.add(circle);

var scale = 0.15;
var clockPosition = {
    x: -248,
    y: 50,
    z: 160,
}
group.scale.set(scale, scale, scale);
group.position.set(clockPosition.x, clockPosition.y, clockPosition.z);
group.rotateY(Math.PI/2);

// Molde da TV
var mat_tv = new THREE.MeshPhysicalMaterial({color: 0x141414,
        emissive: 0x000000,
        roughness: 0.5,
        metalness: 0.2,
        reflectivity: 0.37,
        clearcoatRoughness: 0.5
});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('TV-frame.obj', function(object) {

	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
                   child.material = mat_tv;
        }
	});
	scene.add(object);
})

// TV Video shader
var video = document.createElement('video');
video.loop = false;
video.muted = true;
video.src = 'res/samara.mp4';
texture = new THREE.VideoTexture( video );
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;

var geometry = new THREE.PlaneGeometry( 120, 68, 1);

var uniformsVideo = {
	u_tDiffuse: { type: "t", value: texture },
	u_amount: { type: "f", value: 40.0 },
	u_time: { type: "f", value: 1.0 },
	u_resolution: { type: "v2", value: new THREE.Vector2() },
	u_angle:    { type: "f", value: 0.05 },
	u_magnitude:    { type: "f", value: 0.01 }
};

uniformsVideo.u_resolution.value.x = renderer.domElement.width;
uniformsVideo.u_resolution.value.y = renderer.domElement.height;

var materialVideo = new THREE.ShaderMaterial( {
	uniforms: uniformsVideo,
	vertexShader: document.getElementById( 'vertexVideoShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentVideoShader' ).textContent,
	side: THREE.DoubleSide
} );

var meshVideo = new THREE.Mesh( geometry, materialVideo);
meshVideo.position.set(-89,-29,-206);

// TV Noise shader
var uniformsNoise = {
	u_amount: { type: "f", value: 100.0 },
	u_time: { type: "f", value: 1.0 },
	u_resolution: { type: "v2", value: new THREE.Vector2() },
};

uniformsNoise.u_resolution.value.x = renderer.domElement.width;
uniformsNoise.u_resolution.value.y = renderer.domElement.height;

var materialNoise = new THREE.ShaderMaterial( {
	uniforms: uniformsNoise,
	vertexShader: document.getElementById( 'vertexNoiseShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentNoiseShader' ).textContent,
	side: THREE.DoubleSide
} );
var meshNoise = new THREE.Mesh( geometry, materialNoise );
meshNoise.position.set(-89,-29,-206);

function randomizeParams() {
	uniformsVideo.u_amount.value = Math.random() * 100;
	uniformsNoise.u_amount.value = 400 + Math.random()*(1000 - 400);
}

var cloudParticles = [];

// Funcao para ajustar parametros da cena com o redimensionamento
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniformsVideo.u_resolution.value.x = renderer.domElement.width;
      uniformsVideo.u_resolution.value.y = renderer.domElement.height;
      uniformsNoise.u_resolution.value.x = renderer.domElement.width;
      uniformsNoise.u_resolution.value.y = renderer.domElement.height;
}

window.addEventListener('resize', onWindowResize, false);


var groupFrame = new THREE.Group();

var lengthFrame = 200;
var heightFrame = 150;
var depthFrame = 10;

var loader = new THREE.TextureLoader();
loader.load('img/wood.jpg', function ( texture ) {
  var frameGeometry = new THREE.BoxGeometry(lengthFrame, heightFrame, depthFrame);
  var frameMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
  var frame = new THREE.Mesh(frameGeometry, frameMaterial);
	groupFrame.add(frame);
});

var lengthPainting = lengthFrame - 20;
var heightPainting = heightFrame - 20;
var depthPainting = depthFrame + 5;

var loader = new THREE.TextureLoader();
loader.load('img/vangogh.jpeg', function ( texture ) {
  var paintingGeometry = new THREE.BoxGeometry(lengthPainting, heightPainting, depthPainting);
  var paintingMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
  var painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
	painting.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthPainting - depthFrame);
	groupFrame.add(painting);
});

var scale = 0.7;
groupFrame.scale.set(scale, scale, scale);
groupFrame.position.set(208, 10, 50);
groupFrame.rotateY(-Math.PI/2);
scene.add(groupFrame);
