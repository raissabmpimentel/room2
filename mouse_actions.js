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

var drag_obj = [];
var dragControls;

function init_drag() {
    dragControls = new THREE.DragControls(drag_obj, camera, renderer.domElement);
    dragControls.transformGroup = false;
    dragControls.addEventListener('dragstart', function(event) {
      controls.enabled = false;
    });
    dragControls.addEventListener('dragend', function(event) {
      controls.enabled = true;
    });

  }

init_drag();

function raycast(event) {
    drag_obj.length = 0;
    var list_obj = [];
    var group_obj = new THREE.Group();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

     intersects = raycaster.intersectObjects( scene.children, true );
     if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names))
     {
             scene.traverse(function(child) {
                 if (child.name === INTERSECTED.name) {
                    drag_obj.push(child); //apply same material to all meshes
                    //list_obj.push(child);
                    //console.log(child.clone());
                 }
               });
               
               //drag_obj.push(group_obj);
     } 
        
}

window.addEventListener( 'mousedown', raycast, false );

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

/// TESTE
var INTERSECTED = null;
var list_names = ["lampada","sofa 1","sofa 2","batente","mesa"];


function intersec() {
    
	// calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children, true);
    
    var mat = new THREE.MeshLambertMaterial({color: 0xffa1a1});

    // Baseado em https://stackoverflow.com/questions/38314521/change-color-of-mesh-using-mouseover-in-three-js
    if ( intersects.length > 0 )
    {
    // if the closest object intersected is not the currently stored intersection object
    if ( intersects[ 0 ].object != INTERSECTED )
    {
        
        // restore previous intersection object (if it exists) to its original color
        if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names))
            {
                    scene.traverse(function(child) {
                        if (child.name === INTERSECTED.name) {
                            child.material = child.currentMat; //apply same material to all meshes
                        }
                      });
            } 
            
        
        // store reference to closest object as current intersection object
        INTERSECTED = intersects[0].object;
        // store color of closest object (for later restoration)
        //INTERSECTED.currentMat = INTERSECTED.material;
        if(valueInArray(INTERSECTED.name,list_names))
                {
                    scene.traverse(function(child) {
                        if (child.name === INTERSECTED.name) {
                            child.currentMat = child.material;
                            child.material = mat; //apply same material to all meshes
                        }
                      });
                }
    }
    }
    else // there are no intersections
    {
        // restore previous intersection object (if it exists) to its original color
        if ( INTERSECTED && valueInArray(INTERSECTED.name,list_names))
            {
                    scene.traverse(function(child) {
                        if (child.name === INTERSECTED.name) {
                          child.material = child.currentMat; //apply same material to all meshes
                        }
                      });
            } 
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        INTERSECTED = null;
    }
}

window.addEventListener( 'mousemove', onMouseMove, false );