// Definicao da cena
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 10000 );
camera.position.set(150,65,150);

// Renderer
var renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("mycanvas"),
antialias:true,
alpha:false
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#b3bdc9");
document.body.appendChild( renderer.domElement );
renderer.setPixelRatio( window.devicePixelRatio );

// Controle da camera
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 controls.enableDamping = true;
 controls.dampingFactor = 0.25;
 controls.enableZoom = true;
 controls.maxDistance = 1400; // Limitar distancia maxima do zoom

// Iluminacao ambiente
var keyLight = new THREE.DirectionalLight(0x808080, 0.5);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(0x808080, 0.75);
fillLight.position.set(100, 0, 100);

var fillLight2 = new THREE.DirectionalLight(0x808080, 0.5);
fillLight2.position.set(100, 100, 100);

var fillLight3 = new THREE.DirectionalLight(0x808080, 1);
fillLight3.position.set(0, 0, -100);

scene.add(keyLight);
scene.add(fillLight);
scene.add(fillLight2);
scene.add(fillLight3);

// Luzes para destacarem a lampada
var light_aux_1 = new THREE.PointLight(0xFFFFCC, 0.75, 80);
light_aux_1.position.set(-90, 50, -10);
scene.add(light_aux_1);

var light_aux_2 = new THREE.PointLight(0xFFFFCC, 0.75, 80);
light_aux_2.position.set(-80, 50, -95);
scene.add(light_aux_2);

var light_aux_3 = new THREE.PointLight( 0xFFFFCC,  0.75, 80 );
light_aux_3.position.set( -60, 50, -60 );
scene.add( light_aux_3 );

var light_aux_4 = new THREE.PointLight( 0xFFFFCC,  1.5, 80 );
light_aux_4.position.set( -150, 50, -110 );
scene.add( light_aux_4 );

var light_aux_5 = new THREE.PointLight( 0xFFFFCC,  1.3, 80 );
light_aux_5.position.set( -150, 50, -40 );
scene.add( light_aux_5 );

// Luz amarela que sai da lampada
pointlight = new THREE.PointLight( 0xFFFFCC, 1, 0);
pointlight.position.set( -100, 50, -65 ); // Posicao proxima do centro lampada
scene.add( pointlight );