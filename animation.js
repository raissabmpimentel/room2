// Audio
var listener;
listener = new THREE.AudioListener();

var soundVideo = new THREE.PositionalAudio(listener);
soundVideo.load('res/samara.mp4');

var soundNoise = new THREE.PositionalAudio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'res/tvnoise.mp4', function( buffer ) {
	soundNoise.setBuffer( buffer );
  soundNoise.setLoop( true );
	soundNoise.setVolume( 0.15 );
	soundNoise.play();
});

camera.add(listener);

// Declaracao de variaveis
var noise = false;
var timeAnim = 30;
var timePassed = 0;

// Funcao para animar a cena
function render(time) {
	requestAnimationFrame(render);

	randomizeParams();
	if(timeAnim > 29){
		timeAnim = 0.0;

		if(noise == false){
			uniformsNoise.u_time.value = timeAnim;

			soundNoise.setVolume(0.15*(soundParams.mute == true ? 0 : 1)*(soundParams.volume/100));
			soundVideo.setVolume(0.0);

			scene.remove(meshVideo);
			scene.add(meshNoise);

			noise = true;
		} else{
			uniformsVideo.u_time.value = timeAnim;

			soundVideo.setVolume(1.0*(soundParams.mute == true ? 0 : 1)*(soundParams.volume/100));
			soundNoise.setVolume(0.0);
			soundVideo.play();
			video.play();

			scene.remove(meshNoise);
			scene.add(meshVideo);

			noise = false;
		}
	} else {
		timeAnim += 0.05;

		if(noise == true){
		    uniformsNoise.u_time.value = timeAnim;
		} else{
		    uniformsVideo.u_time.value = timeAnim;
		}
	}

	grassMaterial.uniforms.time.value = timeAnim;

	if (time - timePassed > 1000) {
		timePassed = time;

		var date = new Date();

		var hrs = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();

		var handHourR = (30 * (hrs > 12 ? hrs - 12 : hrs) * Math.PI) / 180;
		var handMinuteR = (6 * min * Math.PI) / 180;
		var handSecondR = (6 * sec * Math.PI) / 180;

		handHourParent.rotation.z = -handHourR;
		handMinuteParent.rotation.z = -handMinuteR;
		handSecondParent.rotation.z = -handSecondR;
	}

	// Verificar interseccoes com objetos que podem ser transportados
	verify_intersec();

	// Atualizar visao
	controls.update();

	// Desenhar cena
	renderer.render( scene, camera );
}

render();
