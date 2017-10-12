var model = new Array();

    for(var i=0;i<5;i++)
        {
            model.push(new Array());
            for(var j=0;j<5;j++)
                {
                    model[i].push(new Array());
                    for(var k=0;k<5;k++)
                        {
                            model[i][j].push(null);
                        }
                }
        }

        for(var i=0;i<5;i++)
        {
            model[2][i][2] = "0x664611";
        }

        for(var k=3;k<5;k++)
        {

            for(var i=k-3;i<8-k;i++)
            {
                
                for(var j=k-3;j<8-k;j++)
                {
                    
                    if(i == 2 && j==2) 
                        {
                            if(k == 4)
                                {
                                    model[i][k][j] = "0x00ff00";
                                }
                                else{
                                    model[2][k][2] = "0x664611";
                                }
                            
                        }
                        else{
                            if(k == 3)
                                {
                                    model[i][k][j] = "0x00ff00";
                                }
                            else{
                                model[i][k][j] = "0x00ff00";
                            }
                        }
                }
            }
        }

function loadVoxelMain()
{
     
   // var loader = new THREE.OBJLoader();
    //loader.load( 'example-models/chr_gumi.obj', three.setMesh );

    //var voxcTest = new  voxJSCanvas("voxelDemo");

    //console.log("I am here?");

    let converterOne_model = new  THREE.Group();




    //let objToThree_converter = new ObjToThree();

    //hard coded a obj file for testing
   // let objTest : string = 'example-models/chr_gumi.obj';

    //objToThree_converter.convert();

  // var hex = objToThree_converter.color;

   //console.log("main hex: "+hex);

   /* var geometry = new THREE.BoxGeometry( 5, 5, 5 );

	var material = new THREE.MeshBasicMaterial( { color: 0x0033ff } );

     converterOne_model = new THREE.Mesh( geometry, material );

    converterOne_canvas.setMesh(converterOne_model);
    */

    

var ruleFileModel = new Array();

    for(var i=0;i<10;i++)
        {
            ruleFileModel.push(new Array());
            for(var j=0;j<10;j++)
                {
                    ruleFileModel[i].push(new Array());
                    for(var k=0;k<10;k++)
                        {
                            ruleFileModel[i][j].push(null);
                        }
                }
        }

for(var x=0;x<10;x++)
    {
        for(var z=0;z<10;z++)
            {
                  ruleFileModel[x][0][z] = "0x00bb00";
            }
    }

for(var y=0;y<8;y++)
    {
         ruleFileModel[3][y][2] = "0x3300cc";
         ruleFileModel[3][y][3] = "0x3300cc";
         ruleFileModel[4][y][2] = "0x3300cc";
         ruleFileModel[4][y][3] = "0x3300cc";
    } 

         ruleFileModel[3][8][2] = "0xee0000";
         ruleFileModel[3][8][3] = "0xee0000";
         ruleFileModel[4][8][2] = "0xee0000";
         ruleFileModel[4][8][3] = "0xee0000";
        
    for(var y=0;y<6;y++)
    {
         ruleFileModel[2][y][7] = "0x3300cc";
    } 
        ruleFileModel[2][6][7] = "0xee0000";
    for(var y=0;y<5;y++)
    {
         ruleFileModel[7][y][8] = "0x3300cc";
    } 
         ruleFileModel[7][5][8] = "0xee0000";

let arrayToMesh = new  ArrayToMesh(model);
//let wireFrameMesh : THREE.Group = arrayToMesh.output();

   /* let converterOne_canvas = new  voxJSCanvas("converter1Canvas");  
    

     
     converterOne_canvas.CameraPosition(0,0,10);
     converterOne_canvas.setMesh(arrayToMesh.output());
     converterOne_canvas.setBackgroundColor(0xffffff);
     converterOne_canvas.start();*/

  //  var ruleFile1 = '{"Rules" : [{"Key" : "0x3300cc" ,"Shape" : "cube","Texture" : "./resources/textures/industrial-buildings.jpg"},{"Color" : "0xee0000","Shape" : "pyramid","Texture" : "./resources/textures/slate-roof-texture.jpg"},{"Key" : "0x00bb00","Shape" : "Cube","Texture" : "./resources/textures/brick-texture.jpg"}]}';
  //  var ruleFile2 = '{"Rules" : [{"Key" : "0x3300cc" ,"Shape" : "cube","Texture" : "./resources/textures/cactus.png"},{"Color" : "0xee0000","Shape" : "dodecahedron","Texture" : "./resources/textures/flowerbed-texture.jpg"},{"Key" : "0x00bb00","Shape" : "Cube","Texture" : "./resources/textures/sand.jpg"}]}'

  //  var ruleFile = JSON.parse(ruleFile1);

  //  var ruleApplyerDemo = new  RuleApplyer();
  //  ruleApplyerDemo.convert(ruleFile, ruleFileModel);

  /*   let converterTwo_canvasOne = new  voxJSCanvas("converter2Canvas1");  

     // var arrayToMesh = new ArrayToMesh(model);
     converterTwo_canvasOne.CameraPosition(0,0,20);
     converterTwo_canvasOne.setMesh(ruleApplyerDemo.output());
     converterTwo_canvasOne.setBackgroundColor(0xffffff);
     converterTwo_canvasOne.start();

      var ruleFile = JSON.parse(ruleFile2);
 ruleApplyerDemo.convert(ruleFile, ruleFileModel);

     let converterTwo_canvasTwo = new  voxJSCanvas("converter2Canvas2");  

     // var arrayToMesh = new ArrayToMesh(model);
     converterTwo_canvasTwo.CameraPosition(0,0,20);
     converterTwo_canvasTwo.setMesh(ruleApplyerDemo.output());
     converterTwo_canvasTwo.setBackgroundColor(0xffffff);
     converterTwo_canvasTwo.start();

*/
    



     var editor = ace.edit("editor");
     //editor.container = <HTMLDivElement>document.getElementById("editor");

 //   var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
 //console.log("Full editor",editor.getValue());
 var jsonString = editor.getValue();
 //console.log("editor",jsonString)
   // console.log("editor",jsonString);

    var ruleFile = JSON.parse(jsonString);
   // console.log("fileJson",JSON.parse(".resources/ruleExample.json"));

  //  var arrayToMesh = new ArrayToMesh(model);
    var ruleApplyer = new  RuleApplyer();
    ruleApplyer.convert(ruleFile, model);

    converterOne_model = ruleApplyer.output();
    let demo_canvas = new  voxJSCanvas("voxelDemo");

 
    demo_canvas.CameraPosition(0,0,10);
    demo_canvas.setGridHelper(model.length, model[0].length, model[0][0].length);
    demo_canvas.setMesh(converterOne_model);
   
    var darkgrey = document.getElementById("darkgrey");
    darkgrey.addEventListener("click",function(){
         demo_canvas.setBackgroundColor(0x020202);
    });
    var lightgrey = document.getElementById("lightgrey");
    lightgrey.addEventListener("click",function(){
         demo_canvas.setBackgroundColor(0x0b0b0b);
    });
    var lightblue = document.getElementById("lightblue");
    lightblue.addEventListener("click",function(){

         demo_canvas.setBackgroundColor(0xA5C7FF);
    });
    var darkdarkgrey = document.getElementById("darkdarkgrey");
    darkdarkgrey.addEventListener("click",function(){
     
         demo_canvas.setBackgroundColor(0x010101);
    });
    var white = document.getElementById("white");
    white.addEventListener("click",function(){
      
         demo_canvas.setBackgroundColor(0xffffff);
    });

    
    demo_canvas.start();
    var colorCanvas = new  voxJSCanvas("colorGuidelinesCanvas");

    fillColorModal(["0x00ff00","0x664611"],arrayToMesh.output(),colorCanvas);
     
    var uplouder = document.getElementsByClassName("rules-file-upload-button");

    var objUpload = document.getElementById("objfile");

    var converterOne;
 
    var useME = true;
    objUpload.addEventListener("change", function(){
     //   console.log("I am here");


        var OBJFile = objUpload.files[0];
        useME = false;
        converterOne = new  fileReader(OBJFile,function()
    {
                    //  array = converterOne.getArray();

            //    console.log("Input File array 2",model);

            // console.log(other);

            var model = converterOne.getArray();

            var largest = model.length;
            if(model[0].length > largest)
                {
                    largest > model[0].length;
                }
            if(model[0][0].length > largest)
                {
                    largest > model[0][0].length;
                }
        

              //  converterOne_canvas.CameraPosition(0,0,largest*2);
                var arrayToMesh = new  ArrayToMesh(model);
            // var wireframeModel = arrayToMesh.output();
              //  converterOne_canvas.setMesh(arrayToMesh.output());
                fillColorModal(converterOne.getColors(),arrayToMesh.output(),colorCanvas);
                    var editor = ace.edit("editor");
                // var editor = <HTMLDivElement>document.getElementById("editor");
                    //  var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
                    //    console.log("editor",jsonString)
            //console.log("Input File array 5",array);
                    
            //console.log("Full editor",editor.getValue());
            var jsonString = editor.getValue();
            var  ruleFile = JSON.parse(jsonString);
                        ruleApplyer.convert(ruleFile, model);
                        var converterOne_model = new  THREE.Group(); 
                    //  console.log("Before Group",converterOne_model);
                

                    //  console.log("After Group",converterOne_model);
                    demo_canvas.setGridHelper(model.length, model[0].length, model[0][0].length);
                    demo_canvas.CameraPosition(0,0,largest*2);
                        demo_canvas.setMesh(converterOne_model);


                    var uplouder = document.getElementsByClassName("rules-file-upload-button");
                        uplouder[0].addEventListener("click", function()
                    {
                    //   var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
                    
                    var jsonString = editor.getValue();
                    // console.log("editor",jsonString)
            //console.log("Input File array 5",array);
                        ruleFile = JSON.parse(jsonString);
                        ruleApplyer.convert(ruleFile, model);
                        var converterOne_model = new  THREE.Group(); 
                    //  console.log("Before Group",converterOne_model);
                        converterOne_model = ruleApplyer.output();
                    //  console.log("After Group",converterOne_model);
                        demo_canvas.setMesh(converterOne_model);
                    }) ;
                });

                // console.log("Input test",converterOne.getArray());


    });

    if(useME == true)
        {
    uplouder[0].addEventListener("click", function()
        {
           // var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
           
 //console.log("Full editor",editor.getValue());
 var jsonString = editor.getValue();
       //    console.log("editor",jsonString)
 //console.log("Input File array 5",array);
            ruleFile = JSON.parse(jsonString);
            ruleApplyer.convert(ruleFile, model);
            var converterOne_model = new  THREE.Group(); 
          //  console.log("Before Group",converterOne_model);
            converterOne_model = ruleApplyer.output();
          //  console.log("After Group",converterOne_model);
            demo_canvas.setMesh(converterOne_model);
        }) ;
        }

      /*  var imgConverter = new  ImgToArray();

        var imgArray = new Array();

        imgArray.push('./example-models/1.png');

    imgConverter.convert(imgArray,function()
    {
        console.log("imgArray: ",imgConverter.output());
    });*/

    var pauseBtn = document.getElementById("playPauseButton");

    pauseBtn.addEventListener("click",function(){
        demo_canvas.play_pause = !demo_canvas.play_pause;
    });
};


/*function doRest()
{



        
}*/

  function  rgbToHex(r,g,b)
    {
        var hex = "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        console.log("Hex",parseInt(hex,16));
        return hex;
    }

  function  componentToHex(c)
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

function fillColorModal(colors,model, colorCanvas)
{

    
    var modal = document.getElementById("availableColorList");
    colorCanvas.setMesh(model);
    colorCanvas.start();

    modal.innerHTML = "";

    for(var i=0;i<colors.length;i++)
        {
            var color = colors[i].split("x");
            var div = '<div class="col-xs-12 available-color-container">';
                div +=  '<div class="col-xs-2 available-color-display" style="background-color: #'+ color[1] +'">';
                div +=          '&nbsp;';
                div += '</div>';
                div += '<div class="col-xs-10 available-color-name">';
                div +=  ' | ' + colors[i];
                div +=  '</div>';
                div +='</div>';

                modal.innerHTML += div;
        }
}

function LoadconverterOne()
{
    let arrayToMesh = new  ArrayToMesh(model);
//let wireFrameMesh : THREE.Group = arrayToMesh.output();

    let converterOne_canvas = new  voxJSCanvas("converter1Canvas");  
    

     
     converterOne_canvas.CameraPosition(0,0,10);
     converterOne_canvas.setMesh(arrayToMesh.output());
     converterOne_canvas.setBackgroundColor(0xffffff);
     converterOne_canvas.start();
}