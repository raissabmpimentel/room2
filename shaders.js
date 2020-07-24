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
var ambientStrength = 0.5;
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
	x = -92.5 + Math.random()*698;
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
