

function loadVoxels(){
    var converterOne_canvas =  new voxJSCanvas("voxelDemo") ;
    // var loader = new THREE.OBJLoader();
    //loader.load( 'example-models/chr_gumi.obj', three.setMesh );
    var converterOne_model;
    //hard coded a obj file for testing
    //objToThree_converter.convert();
    /* var geometry = new THREE.BoxGeometry( 5, 5, 5 );
 
     var material = new THREE.MeshBasicMaterial( { color: 0x0033ff } );
 
      converterOne_model = new THREE.Mesh( geometry, material );
 
     converterOne_canvas.setMesh(converterOne_model);
     */
    var model = new Array();
    for (var i = 0; i < 5; i++) {
        model.push(new Array());
        for (var j = 0; j < 5; j++) {
            model[i].push(new Array());
            for (var k = 0; k < 5; k++) {
                model[i][j].push(null);
            }
        }
    }
    for (var i = 0; i < 5; i++) {
        model[2][i][2] = 0x664611;
    }
    for (var k = 3; k < 5; k++) {
        for (var i = k - 3; i < 8 - k; i++) {
            for (var j = k - 3; j < 8 - k; j++) {
                if (i == 2 && j == 2) {
                    if (k == 4) {
                        model[i][k][j] = 0x00ff00;
                    }
                    else {
                        model[2][k][2] = 0x664611;
                    }
                }
                else {
                    if (k == 3) {
                        model[i][k][j] = 0x00ff00;
                    }
                    else {
                        model[i][k][j] = 0x00ff00;
                    }
                }
            }
        }
    }
    console.log(model);
    var arrayToMesh = new voxc.ArrayToMesh(converterOne_canvas.scene, model);
    converterOne_model = voxc.arrayToMesh.output();
    converterOne_canvas.CameraPosition(0, 0, -10);
    converterOne_canvas.setMesh(converterOne_model);
    converterOne_canvas.start();
};