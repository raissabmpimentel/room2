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
var geometry = new THREE.PlaneGeometry( 750, 250, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x003000, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = + Math.PI/2;
plane.position.set(100,-112,435);
scene.add( plane );

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
	transparent: true
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
    metalness: 1,
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
var drag_frame = [];

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
drag_clock.push(group); //Colocar na lista de objetos para o Drag Controls do relogio

var materials = {
	clockWrapper: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			flatShading: THREE.FlatShading
		}
	),
	clock: new THREE.MeshPhongMaterial(
		{
			color: 0xFFFFFF,
			shininess: 10,
			flatShading: THREE.FlatShading
		}
	),
	line: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			flatShading: THREE.FlatShading
		}
	),
	handHour: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			flatShading: THREE.FlatShading
		}
	),
	handMinute: new THREE.MeshPhongMaterial(
		{
			color: 0x000000,
			shininess: 10,
			flatShading: THREE.FlatShading
		}
	),
	handSecond: new THREE.MeshPhongMaterial(
		{
			color: 0xFF0000,
			shininess: 10,
			flatShading: THREE.FlatShading
		}
	),
	handSecondCircle: new THREE.MeshPhongMaterial(
		{
			color: 0xFF0000,
			shininess: 10,
			flatShading: THREE.FlatShading
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

// Quadro
var groupFrame = new THREE.Group();

var lengthFrame = 200;
var heightFrame = 150;
var depthFrame = 10;

var loader = new THREE.TextureLoader();
loader.load('img/wood.jpg', function ( texture ) {
  var frameGeometry = new THREE.BoxGeometry(lengthFrame, heightFrame, depthFrame);
  var frameMaterial = new THREE.MeshLambertMaterial({map: texture});
  var frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.name = "quadro"; //Nome para identificar o quadro, a ser usado ao identificar a selecao
	groupFrame.add(frame);
});

var lengthPainting = lengthFrame - 20;
var heightPainting = heightFrame - 20;
var depthPainting = depthFrame + 5;

var paintingName = 'the_starry_night.jpeg';
var loader = new THREE.TextureLoader();
loader.setPath('painting/').load(paintingName, function ( texture ) {
  var paintingGeometry = new THREE.BoxGeometry(lengthPainting, heightPainting, depthPainting);
  var paintingMaterial = new THREE.MeshLambertMaterial({map: texture});
  var painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
	painting.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthPainting - depthFrame);
	groupFrame.add(painting);
});

var scale = 0.7;
framePosition = {
    x: 208,
    y: 0,
    z: 100,
}
groupFrame.scale.set(scale, scale, scale);
groupFrame.position.set(framePosition.x, framePosition.y, framePosition.z);
groupFrame.rotateY(-Math.PI/2);
scene.add(groupFrame);
drag_frame.push(groupFrame); //Colocar na lista de objetos para o Drag Controls do quadro


