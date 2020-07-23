// Light Controllers
var lightParams = {
  lamp: 100,
  ambient: 100
}

gui = new dat.GUI();
var f1 = gui.addFolder('Lights');
f1.add(lightParams, 'lamp', 0, 100).step(1).onChange(onLampIntensityChange);
f1.add(lightParams, 'ambient', 0, 100).step(1).onChange(onAmbientLightIntensityChange);

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

// Audio Controllers
var soundParams = {
	mute: false,
  volume: 100
};

var f2 = gui.addFolder('Sound');
f2.add(soundParams, 'mute').onChange(onToggleMute);
f2.add(soundParams, 'volume', 0, 100).step(1).onChange(onVolumeChange);

function onToggleMute() {
	if(soundParams.mute == true){
    soundNoise.setVolume(0.0);
    soundVideo.setVolume(0.0);
  } else {
    if(noise == true){
      soundNoise.setVolume(0.15*(soundParams.volume/100));
    } else {
      soundVideo.setVolume(1.0*(soundParams.volume/100));
    }
  }
}

function onVolumeChange() {
	if(noise == true){
    soundNoise.setVolume(0.15*(soundParams.mute == true ? 0.0 : 1.0)*(soundParams.volume/100));
  } else {
    soundVideo.setVolume(1.0*(soundParams.mute == true ? 0.0 : 1.0)*(soundParams.volume/100));
  }
}


// Clock controllers

var clockColorParams = {
	clock: "#FFFFFF",
	clockWrapper: "#AAAAAA",
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
