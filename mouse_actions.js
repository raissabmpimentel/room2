var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Quando o mouse se movimentar
function onMouseMove( event ) {
	// Calcular a posicao do mouse de forma normalizada
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
  // Atualizar o raycaster com a posicao do mouse
  raycaster.setFromCamera( mouse, camera );
}
// Adicionar funcao para ser executada ao mover o mouse
window.addEventListener( 'mousemove', onMouseMove, false );

var state_drag; // Variavel para dizer se esta ocorrendo drag de objetos
var crtl_table, crtl_sofa_1, ctrl_sofa_2; // drag controls para a mesa, sofa 1 e sofa 2



// Inicializar drag control do sofa 1
function init_sofa_1() {
    ctrl_sofa_1 = new THREE.DragControls(drag_sofa_1, camera, renderer.domElement);
    ctrl_sofa_1.transformGroup = true; //Para ser possivel transportar varias geometrias
    // Desabilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
    ctrl_sofa_1.addEventListener('dragstart', function(event) {
      controls.enabled = false;
      state_drag = true;
    });
    // Habilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
    ctrl_sofa_1.addEventListener('dragend', function(event) {
      controls.enabled = true;
      state_drag = false;
    });
    ctrl_sofa_1.addEventListener('drag', function(event) {
      // Impedir movimento nos eixos x e y
      event.object.position.y = 0;
      event.object.position.x = 0;
      // Impedir colisao com itens dentro do quarto
      if(event.object.position.z < -90)
        event.object.position.z = -90;
      else if(event.object.position.z > 215)
        event.object.position.z = 215;
    });
    
  }

// Inicializar drag control do sofa 2
function init_sofa_2() {
  ctrl_sofa_2 = new THREE.DragControls(drag_sofa_2, camera, renderer.domElement);
  ctrl_sofa_2.transformGroup = true; //Para ser possível transportar varias geometrias
  // Desabilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
  ctrl_sofa_2.addEventListener('dragstart', function(event) {
    controls.enabled = false;
    state_drag = true;
  });
  // Habilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
  ctrl_sofa_2.addEventListener('dragend', function(event) {
    controls.enabled = true;
    state_drag = false;
  });
  ctrl_sofa_2.addEventListener('drag', function(event) {
    // Impedir movimento nos eixos x e y
    event.object.position.y = 0;
    event.object.position.x = 0;
    // Impedir colisao com itens dentro do quarto
    if(event.object.position.z < -110)
      event.object.position.z = -110;
    else if(event.object.position.z > 215)
      event.object.position.z = 215;
  });
}

// Inicializar drag control da mesa
function init_table() {
  crtl_table = new THREE.DragControls(drag_table, camera, renderer.domElement);
  crtl_table.transformGroup = true; //Para ser possivel transportar varias geometrias
  // Desabilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
  crtl_table.addEventListener('dragstart', function(event) {
    controls.enabled = false;
    state_drag = true;
  });
  // Habilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
  crtl_table.addEventListener('dragend', function(event) {
    controls.enabled = true;
    state_drag = false;
  });
  crtl_table.addEventListener('drag', function(event) {
    // Impedir movimento nos eixos x e y
    event.object.position.y = 0;
    event.object.position.x = 0;
    // Impedir colisao com itens dentro do quarto
    if(event.object.position.z < -130)
        event.object.position.z = -130;
    else if(event.object.position.z > 255)
        event.object.position.z = 255;
  });

}

// Inicializar drag control do relogio
function init_clock() {
  ctrl_clock = new THREE.DragControls(drag_clock, camera, renderer.domElement);
  ctrl_clock.transformGroup = true; //Para ser possível transportar varias geometrias
  // Desabilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
  ctrl_clock.addEventListener('dragstart', function(event) {
    controls.enabled = false;
    state_drag = true;
  });
  // Habilitar OrbitControls quando se inicia o drag, e atualizar variavel state_drag
  ctrl_clock.addEventListener('dragend', function(event) {
    controls.enabled = true;
    state_drag = false;
  });
  ctrl_clock.addEventListener('drag', function(event) {
    // Impedir movimento nos eixos x e y
    event.object.position.y = clockPosition.y;
    event.object.position.x = clockPosition.x;
    // Impedir colisao com itens dentro do quarto
    if(event.object.position.z < -190)
      event.object.position.z = -190;
    else if(event.object.position.z > 289)
      event.object.position.z = 289;
  });
}

// Inicializar DragControls
init_table();
init_sofa_1();
init_sofa_2();
init_clock();

// Funcao auxiliar para verificar se o valor value está no vetor vec
function valueInArray(value, vec) {
    var result = false;
    for ( var i = 0; i < vec.length; i++ ) {
        if(vec[i] == value)
        {
            result = true;
            break;
        }
    }
    return result;
}

// Guarda a geometria no qual o raycaster intersecta
var INTERSECTED = null;
// Lista dos nomes dos objetos que podem ser transportados
var list_names = ["sofa 1","sofa 2","mesa","relogio"]; 

var index = 0;

// Verificar interseccoes com objetos que podem ser transportados
function verify_intersec() {

	// Objetos da cena que o raycaster instersecta
  var intersects = raycaster.intersectObjects(scene.children, true);
  
  // Material de cor rosa a ser aplicado quando o mouse intersecta os objetos que podem ser transportados
  var mat = new THREE.MeshLambertMaterial({color: 0xffa1a1});

  if (!state_drag) // Enquanto o estado nao eh de drag
  {
    // Baseado em https://stackoverflow.com/questions/38314521/change-color-of-mesh-using-mouseover-in-three-js
    if ( intersects.length > 0 ) // Se ha interseccao
    {
      
      if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names)) // Se o objeto intersecctado for o sofa 1, sofa 2, mesa ou relogio
      {
        scene.traverse(function(child) { // Restaurar o material antigo para todas as geometrias com mesmo nome do objeto intersecctado
            if (child.name === INTERSECTED.name) {
                child.material = child.currentMat; 
            }
          });
      }
      index = 0;
      for ( var i = 0; i < intersects.length; i++ ) {
        /* Verificar o indice do objeto intersectado mais proximo, que pode ser o sofa 1, sofa 2, mesa ou relogio
           Se nao achar, o indice eh do objeto mais proximo (zero) */
        if(valueInArray(intersects[i].object.name,list_names)) // 
        {
            index = i;
            break;
        }
      }
      INTERSECTED = intersects[index].object; // Atualizar objeto intersecctado
      if(valueInArray(INTERSECTED.name,list_names)) // Se o objeto intersecctado for o sofa 1, sofa 2, mesa ou relogio
      {
        scene.traverse(function(child) { // Atualizar para material de cor rosa para todas as geometrias com mesmo nome do objeto intersecctado
            if (child.name === INTERSECTED.name) {
                child.currentMat = child.material; // Guardar o material antigo em currentMat
                child.material = mat; 
            }
          });
      }
    }
    else 
    {
      if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names)) // Se o objeto intersecctado for o sofa 1, sofa 2, mesa ou relogio
      {
        scene.traverse(function(child) { // Restaurar o material antigo para todas as geometrias com mesmo nome do objeto intersecctado
            if (child.name === INTERSECTED.name) {
              child.material = child.currentMat; 
            }
          });
      } 
      INTERSECTED = null;
    }
  }
}

