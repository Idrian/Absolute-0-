import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';
import {ArrayToMesh} from './ArrayToMesh';
import {RuleApplyer} from './RuleApplyer';
import {fileReader} from './ObjToArray';


class voxJSCanvas
{
    public scene : THREE.Scene;
    public camera : THREE.PerspectiveCamera;
    private renderer : THREE.WebGLRenderer;
    private voxel : THREE.Group;
    private controls : OrbitControls;
    private ambientLight : THREE.AmbientLight;
    private light : THREE.PointLight;

    constructor(containerID : string)
    {
        // Create the renderer, in this case using WebGL, we want an alpha channel
        let container = document.getElementById(containerID);
        this.renderer = new THREE.WebGLRenderer({alpha: true , antialias: true});
       
        // Set dimensions to containers and background color to white
        let containerWidth : number = 800; 
        let containerHeight : number = 400;
        this.renderer.setSize(containerWidth,containerHeight);
        this.renderer.setClearColor(0xffffff,1);

        // Bind the renderer to the HTML, parenting it to our 'container' DIV
        container.appendChild(this.renderer.domElement);

        // Create a Scene
        this.scene = new THREE.Scene();

        // And a camera.  Set Field of View, Near and Far clipping planes
        this.camera = new THREE.PerspectiveCamera(45, containerWidth/containerHeight, 0.1, 1000);
    
        // Position is -20 along the Z axis and look at the origin
        this.camera.position.set(0,0,20);
        this.camera.up.set(0,1,0);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        this.scene.add(this.camera);

         // Add the lights
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add( this.ambientLight);

        this.light = new THREE.PointLight( 0xffc228 );
         this.light.position.set( -10, 10, 10 );
        this.scene.add(  this.light );

        this.controls = new OrbitControls(this.camera,  this.renderer.domElement);
       // this.controls.addEventListener('change',this.render);
        this.controls.enablePan = true;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minDistance = 0;
        this.controls.maxDistance = Infinity;
        this.controls.enableZoom = true;

        this.scene.background =  new THREE.Color( 0xa5c7ff );


       
        
    }

    public zoomInOut(z : number)
    {
      //  console.log("CameraPos",this.camera.position);
        this.camera.position.z = ((z));
      //  this.controls.object = ;
    }

   public CameraPosition(x : number,y : number,z : number)
    {
        this.camera.position.set(x,y,z);
    }

    public setDimensions(width : number, height : number)
    {
        this.renderer.setSize(width,height);
    }

    public setMesh(inputMesh : THREE.Group)
    {        

        this.scene.remove(this.scene.getObjectByName("Voxel"));
         this.voxel = inputMesh;
         
        this.voxel.castShadow = true;
         
        this.scene.receiveShadow = true;
        this.scene.castShadow = true;

      // this.voxel = inputMesh;

       /* var textureMaterial = new THREE.MeshPhongMaterial(
            {
                map: THREE.ImageUtils.loadTexture("example-models/chr_gumi.png")
            }
        );*/

       // this.voxel.material = textureMaterial;

        // And put it at the origin
        this.voxel.position.set(0,0,0);

        // Add it to the scene and render the scene using the Scene and Camera objects
        this.scene.add(this.voxel);

     // console.log("Children",this.scene.children);
     
    }

   public setGridHelper(x : number, y : number, z : number)
    {
        this.scene.remove(this.scene.getObjectByName("GridHelper"));
        var GridHelper = new THREE.GridHelper(x,z).translateY(-((y/2)));
        GridHelper.name = "GridHelper";
        this.scene.add(GridHelper);
    }

   public setBackgroundColor(color:number)
    {
        this.scene.background =  new THREE.Color( color );
    }

    render() {
        // Each frame we want to render the scene again
        requestAnimationFrame(() => this.render());

           this.voxel.rotation.y += 0.01;
          // this.voxel.getObjectByName("212").rotation.x += 0.01;
           this.controls.update();


        this.renderer.render(this.scene, this.camera);
    }

    start() 
    {
        this.render();
    }
}

window.onload = () => {
   
   // var loader = new THREE.OBJLoader();
    //loader.load( 'example-models/chr_gumi.obj', three.setMesh );

    let converterOne_model = new THREE.Group();




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

    

let arrayToMesh = new ArrayToMesh(model);

//let wireFrameMesh : THREE.Group = arrayToMesh.output();

    let converterOne_canvas = new voxJSCanvas("converter1Canvas");  
    
     
     converterOne_canvas.CameraPosition(0,0,10);
     converterOne_canvas.setMesh(arrayToMesh.output());
     converterOne_canvas.setBackgroundColor(0xffffff);
     converterOne_canvas.start();

     let converterTwo_canvasOne = new voxJSCanvas("converter2Canvas1");  

     // var arrayToMesh = new ArrayToMesh(model);
     converterTwo_canvasOne.CameraPosition(0,0,10);
     converterTwo_canvasOne.setDimensions(400,400);
     converterTwo_canvasOne.setMesh(arrayToMesh.output());
     converterTwo_canvasOne.setBackgroundColor(0xffffff);
     converterTwo_canvasOne.start();

     let converterTwo_canvasTwo = new voxJSCanvas("converter2Canvas2");  

     // var arrayToMesh = new ArrayToMesh(model);
     converterTwo_canvasTwo.CameraPosition(0,0,10);
     converterTwo_canvasTwo.setDimensions(400,400);
     converterTwo_canvasTwo.setMesh(arrayToMesh.output());
     converterTwo_canvasTwo.setBackgroundColor(0xffffff);
     converterTwo_canvasTwo.start();


     var editor = ace.edit("editor");
     //editor.container = <HTMLDivElement>document.getElementById("editor");

 //   var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
 console.log("Full editor",editor.getValue());
 var jsonString = editor.getValue();
 console.log("editor",jsonString)
   // console.log("editor",jsonString);

    var ruleFile = JSON.parse(jsonString);
   // console.log("fileJson",JSON.parse(".resources/ruleExample.json"));

  //  var arrayToMesh = new ArrayToMesh(model);
    var ruleApplyer = new RuleApplyer();
    ruleApplyer.convert(ruleFile, model);

    converterOne_model = ruleApplyer.output();
    let demo_canvas = new voxJSCanvas("voxelDemo");

 
    demo_canvas.CameraPosition(0,0,10);
    demo_canvas.setGridHelper(model.length, model[0].length, model[0][0].length);
    demo_canvas.setMesh(converterOne_model);
    demo_canvas.start();
     
    var uplouder = document.getElementsByClassName("rules-file-upload-button");

    var objUpload = <HTMLInputElement>document.getElementById("file");

    var converterOne : fileReader;
 
    var useME : boolean = true;
    objUpload.addEventListener("input", function(){
        var OBJFile : File = objUpload.files[0];
        useME = false;
        converterOne = new fileReader(OBJFile,doRest,[demo_canvas,converterOne_canvas,ruleApplyer,arrayToMesh]);

       // console.log("Input test",converterOne.getArray());


    });

    if(useME == true)
        {
    uplouder[0].addEventListener("click", function()
        {
           // var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
           
 console.log("Full editor",editor.getValue());
 var jsonString = editor.getValue();
           console.log("editor",jsonString)
 //console.log("Input File array 5",array);
            ruleFile = JSON.parse(jsonString);
            ruleApplyer.convert(ruleFile, model);
            var converterOne_model = new THREE.Group(); 
          //  console.log("Before Group",converterOne_model);
            converterOne_model = ruleApplyer.output();
          //  console.log("After Group",converterOne_model);
           demo_canvas.setGridHelper(model.length, model[0].length, model[0][0].length);
            demo_canvas.setMesh(converterOne_model);
        }) ;
        }
};


function doRest(model : string[][][],other : any)
{


      //  array = converterOne.getArray();

         console.log("Input File array 2",model);

    other[1].CameraPosition(0,0,10);
    var arrayToMesh = new ArrayToMesh(model);
     other[1].setMesh(arrayToMesh.output());

        var editor = ace.edit("editor");
       // var editor = <HTMLDivElement>document.getElementById("editor");
        //  var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
        //    console.log("editor",jsonString)
 //console.log("Input File array 5",array);
        
 console.log("Full editor",editor.getValue());
 var jsonString = editor.getValue();
 var  ruleFile = JSON.parse(jsonString);
            other[2].convert(ruleFile, model);
            var converterOne_model = new THREE.Group(); 
          //  console.log("Before Group",converterOne_model);
    

          //  console.log("After Group",converterOne_model);
           other[0].setGridHelper(model.length, model[0].length, model[0][0].length);
            other[0].setMesh(converterOne_model);


        var uplouder = document.getElementsByClassName("rules-file-upload-button");
             uplouder[0].addEventListener("click", function()
        {
         //   var jsonString =  editor.textContent.slice(editor.textContent.indexOf("{\"Rules\""),editor.textContent.indexOf("}X")+1);
          
          var jsonString = editor.getValue();
         console.log("editor",jsonString)
 //console.log("Input File array 5",array);
            ruleFile = JSON.parse(jsonString);
            other[2].convert(ruleFile, model);
            var converterOne_model = new THREE.Group(); 
          //  console.log("Before Group",converterOne_model);
            converterOne_model = other[2].output();
          //  console.log("After Group",converterOne_model);
           other[0].setGridHelper(model.length, model[0].length, model[0][0].length);
            other[0].setMesh(converterOne_model);
        }) ;
        
}