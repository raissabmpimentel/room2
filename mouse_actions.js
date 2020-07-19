var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
}

var state_drag;
var crtl_table, crtl_sofa_1, ctrl_sofa_2;

function init_table() {
  crtl_table = new THREE.DragControls(drag_table, camera, renderer.domElement);
  crtl_table.transformGroup = true;
  crtl_table.addEventListener('dragstart', function(event) {
    controls.enabled = false;
    state_drag = true;
  });
  crtl_table.addEventListener('dragend', function(event) {
    controls.enabled = true;
    state_drag = false;
  });

}

function init_sofa_1() {
    ctrl_sofa_1 = new THREE.DragControls(drag_sofa_1, camera, renderer.domElement);
    ctrl_sofa_1.transformGroup = true;
    ctrl_sofa_1.addEventListener('dragstart', function(event) {
      controls.enabled = false;
      state_drag = true;
    });
    ctrl_sofa_1.addEventListener('dragend', function(event) {
      controls.enabled = true;
      state_drag = false;
    });

  }

  function init_sofa_2() {
    ctrl_sofa_2 = new THREE.DragControls(drag_sofa_2, camera, renderer.domElement);
    ctrl_sofa_2.transformGroup = true;
    ctrl_sofa_2.addEventListener('dragstart', function(event) {
      controls.enabled = false;
      state_drag = true;
    });
    ctrl_sofa_2.addEventListener('dragend', function(event) {
      controls.enabled = true;
      state_drag = false;
    });

  }

init_table();
init_sofa_1();
init_sofa_2();

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

var INTERSECTED = null;
var list_names = ["sofa 1","sofa 2","mesa"];


function intersec() {
    
	// calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children, true);
    
    var mat = new THREE.MeshLambertMaterial({color: 0xffa1a1});
    if (!state_drag)
    {
        // Baseado em https://stackoverflow.com/questions/38314521/change-color-of-mesh-using-mouseover-in-three-js
    if ( intersects.length > 0 )
    {
    
    if ( intersects[ 0 ].object != INTERSECTED )
    {
        
        
        if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names))
            {
                    scene.traverse(function(child) {
                        if (child.name === INTERSECTED.name) {
                            child.material = child.currentMat; 
                        }
                      });
            } 
            
        INTERSECTED = intersects[0].object;
        if(valueInArray(INTERSECTED.name,list_names))
                {
                    scene.traverse(function(child) {
                        if (child.name === INTERSECTED.name) {
                            child.currentMat = child.material;
                            child.material = mat; 
                        }
                      });
                }
    }
    }
    else 
    {
        if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names))
            {
                    scene.traverse(function(child) {
                        if (child.name === INTERSECTED.name) {
                          child.material = child.currentMat; 
                        }
                      });
            } 

        INTERSECTED = null;
    }
    }
    
}

window.addEventListener( 'mousemove', onMouseMove, false );