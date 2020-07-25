gui = new dat.GUI();

// Audio Controllers
var soundParams = {
	mute: false,
  volume: 100
};

var f1 = gui.addFolder('Sound');
f1.add(soundParams, 'mute').onChange(onToggleMute);
f1.add(soundParams, 'volume', 0, 100).step(1).onChange(onVolumeChange);

function onToggleMute() {
	if(soundParams.mute == true){
    soundNoise.setVolume(0.0);
    soundVideo.setVolume(0.0);
  } else {
    if(noise == true){
      soundNoise.setVolume(noiseMaxVolume*(soundParams.volume/100));
    } else {
      soundVideo.setVolume(videoMaxVolume*(soundParams.volume/100));
    }
  }
}

function onVolumeChange() {
	if(noise == true){
    soundNoise.setVolume(noiseMaxVolume*(soundParams.mute == true ? 0.0 : 1.0)*(soundParams.volume/100));
  } else {
    soundVideo.setVolume(videoMaxVolume*(soundParams.mute == true ? 0.0 : 1.0)*(soundParams.volume/100));
  }
}


// Light Controllers
var lightParams = {
  lamp: 100,
  ambient: 100
}

var f2 = gui.addFolder('Lights');
f2.add(lightParams, 'lamp', 0, 100).step(1).onChange(onLampIntensityChange);
f2.add(lightParams, 'ambient', 0, 100).step(1).onChange(onAmbientLightIntensityChange);

function onLampIntensityChange() {
  light_aux_1.intensity = 0.75*(lightParams.lamp/100);
  light_aux_2.intensity = 0.75*(lightParams.lamp/100);
  light_aux_3.intensity = 0.75*(lightParams.lamp/100);
  light_aux_4.intensity = 1.5*(lightParams.lamp/100);
  light_aux_5.intensity = 1.3*(lightParams.lamp/100);
  pointlight.intensity = 1*(lightParams.lamp/100);
}

function onAmbientLightIntensityChange() {
  keyLight.intensity = 0.5*(lightParams.ambient/100);
  fillLight.intensity = 0.75*(lightParams.ambient/100);
  fillLight2.intensity = 0.5*(lightParams.ambient/100);
  fillLight3.intensity = 1*(lightParams.ambient/100);
}


// Clock controllers
var clockColorParams = {
	clock: "#FFFFFF",
	clockWrapper: "#000000",
	line: "#000000",
	hands: "#000000",
	handSecond: "#FF0000"
};

var f3 = gui.addFolder('Clock');
f3.addColor(clockColorParams, 'clockWrapper').onChange(onClockWrapperColorChange);
f3.addColor(clockColorParams, 'clock').onChange(onClockColorChange);
f3.addColor(clockColorParams, 'hands').onChange(onHandsColorChange);
f3.addColor(clockColorParams, 'handSecond').onChange(onHandSecondColorChange);
f3.addColor(clockColorParams, 'line').onChange(onLineColorChange);

function onClockWrapperColorChange() {
	materials.clockWrapper.color.setHex(clockColorParams.clockWrapper.replace('#', '0x'));
};

function onClockColorChange() {
	materials.clock.color.setHex(clockColorParams.clock.replace('#', '0x'));
};

function onHandsColorChange() {
	materials.handHour.color.setHex(clockColorParams.hands.replace('#', '0x'));
	materials.handMinute.color.setHex(clockColorParams.hands.replace('#', '0x'));
};

function onHandSecondColorChange() {
	materials.handSecond.color.setHex(clockColorParams.handSecond.replace('#', '0x'));
	materials.handSecondCircle.color.setHex(clockColorParams.handSecond.replace('#', '0x'));
};

function onLineColorChange() {
	materials.line.color.setHex(clockColorParams.line.replace('#', '0x'));
};

// Sofa controllers
var sofasParams = {
	left: "#8c8c97",
  right: "#8c8c97"
};

var f4 = gui.addFolder('Sofas');
f4.addColor(sofasParams, 'left').onChange(onSofaLeftColorChange);
f4.addColor(sofasParams, 'right').onChange(onSofaRightColorChange);

function onSofaLeftColorChange() {
	mat_sofa_1.color.setHex(sofasParams.left.replace('#', '0x'));
};

function onSofaRightColorChange() {
	mat_sofa_2.color.setHex(sofasParams.right.replace('#', '0x'));
};

// Table controllers
var tableParams = {
	color: "#96653A"
};

var f5 = gui.addFolder('Table');
f5.addColor(tableParams, 'color').onChange(onTableColorChange);

function onTableColorChange() {
	mat_table.color.setHex(tableParams.color.replace('#', '0x'));
};

// Door controllers
var doorParams = {
	door: "#ffffff",
  doorFrame: "#e1e1e1"
};

var f6 = gui.addFolder('Door');
f6.addColor(doorParams, 'door').onChange(onDoorColorChange);
f6.addColor(doorParams, 'doorFrame').onChange(onDoorFrameColorChange);

function onDoorColorChange() {
	mat_door.color.setHex(doorParams.door.replace('#', '0x'));
};

function onDoorFrameColorChange() {
	mat_door_frame.color.setHex(doorParams.doorFrame.replace('#', '0x'));
};

// Painting controllers
var paintingParams = {
	painting: 'the_starry_night.jpeg'
};

var f7 = gui.addFolder('Painting');
f7.add(paintingParams, 'painting', {
  TheStarryNight: 'the_starry_night.jpeg',
  Guernica: 'guernica.jpg',
  ImpressionSunrise: 'impression_sunrise.jpg',
  Sea: 'sea.jpg',
  Abstract1: 'abstract_1.jpg',
  Abstract2: 'abstract_2.jpg'
} ).onChange(onPaintingChange);

function onPaintingChange() {
  paintingName = paintingParams.painting;
  var loader = new THREE.TextureLoader();
  loader.setPath('img/painting/').load(paintingName, function ( texture ) {
    var paintingGeometry = new THREE.BoxGeometry(lengthPainting, heightPainting, depthPainting);
    var paintingMaterial = new THREE.MeshLambertMaterial({map: texture});
    var painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  	painting.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), depthPainting - depthFrame);
  	groupFrame.add(painting);
  });
};

// Floor controllers
var floorParams = {
	floor: 'carpet-v1.jpg'
};

var f8 = gui.addFolder('Floor');
f8.add(floorParams, 'floor', {
  LightGray: 'carpet-v1.jpg',
	Gray: 'carpet-v4.jpg',
  DarkGray: 'carpet-v3.jpg',
	Beige: 'carpet-v2.jpg',
	DarkWood: 'wood.jpg',
	LightWood:'light-wood.jpg'
} ).onChange(onFloorChange);

function onFloorChange() {
 carpetName = floorParams.floor;
	texture = new THREE.TextureLoader().setPath('img/carpet/').load(carpetName);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 5, 5 );
	texture.anisotropy = 16;
	mat_fl = new THREE.MeshLambertMaterial({map: texture, color: 0xffffff});
	objLoader = new THREE.OBJLoader();
	objLoader.setPath('obj/');
	objLoader.load('floor.obj', function(object) {
			object.traverse(function(child) {
	        if (child instanceof THREE.Mesh){
	            child.material = mat_fl;
	        }
	    });
			scene.add(object);
	});
};
