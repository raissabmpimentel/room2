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
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
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
var mat_garden_door = new THREE.MeshStandardMaterial({color: 0x9c9c9c,
    roughness: 0.5,
    metalness: 1,
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
var mat_garden_knob = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
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

var mat_door_frame = new THREE.MeshLambertMaterial({color: 0xffffff});
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

var drag_table = [];
var drag_sofa_1 = [];
var drag_sofa_2 = [];

// Mesa central
var mat_wood_2 = new THREE.MeshLambertMaterial({color: 0x96653A});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('table.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_wood_2;
            child.name = "mesa";
        }
    });
    scene.add(object);
    drag_table.push(object);
})

// Sofa 1
var mat_sofa = new THREE.MeshLambertMaterial({color: 0x8c8c97});
var objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/');
objLoader.load('sofa1.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_sofa;
            child.name = "sofa 1";
        }
    });
    scene.add(object);
    drag_sofa_1.push(object);
})

// Sofa 2
objLoader.setPath('obj/');
objLoader.load('sofa2.obj', function(object) {
	object.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = mat_sofa;
            child.name = "sofa 2";
        }
    });
    scene.add(object);
    drag_sofa_2.push(object);
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
