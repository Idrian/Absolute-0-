import * as THREE from 'three';
import {ObjToThree} from './objToThree';
import {ArrayToMesh} from './ArrayToMesh';
import {RuleApplyer} from './RuleApplyer';


export class voxJSCanvas
{
    public scene : THREE.Scene;
    private camera : THREE.Camera;
    private renderer : THREE.WebGLRenderer;
    private voxel : THREE.Group;


    constructor(containerID : string)
    {
        // Create the renderer, in this case using WebGL, we want an alpha channel
        let container = document.getElementById(containerID);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
       
        // Set dimensions to containers and background color to white
        let containerWidth : number = 800; 
        let containerHeight : number = 400;
        this.renderer.setSize(containerWidth,containerHeight);
        this.renderer.setClearColor(0x000000,1);

        // Bind the renderer to the HTML, parenting it to our 'container' DIV
        container.appendChild(this.renderer.domElement);

        // Create a Scene
        this.scene = new THREE.Scene();

        // And a camera.  Set Field of View, Near and Far clipping planes
        this.camera = new THREE.PerspectiveCamera(45, containerWidth/containerHeight, 0.1, 1000);
    
        // Position is -20 along the Z axis and look at the origin
        this.camera.position.set(0,0,-20);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        this.scene.add(this.camera);

         // Add the lights
        let ambientLight = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(ambientLight);

        let light = new THREE.PointLight( 0x111111 );
        light.position.set( -10, 10, -10 );
        this.scene.add( light );
    }

    CameraPosition(x : number,y : number,z : number)
    {
        this.camera.position.set(x,y,z);
    }

    setDimensions(width : number, height : number)
    {
        this.renderer.setSize(width,height);
    }

    setMesh(inputMesh : THREE.Group)
    {
	     this.voxel = inputMesh;

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

     
    }

    setBackgroundColor(color:number)
    {
         this.renderer.setClearColor(color,1);
    }

    render() {
        // Each frame we want to render the scene again
        requestAnimationFrame(() => this.render());

		this.voxel.rotation.y += 0.01;

       // var axis = new THREE.Vector3(0,0,0);

       // this.camera.rotateOnAxis(axis,0.05);

        this.renderer.render(this.scene, this.camera);
    }

    start() 
    {
        this.render();
    }
}

window.onload = () => {
    let converterOne_canvas = new voxJSCanvas("voxelDemo");
   // var loader = new THREE.OBJLoader();
    //loader.load( 'example-models/chr_gumi.obj', three.setMesh );

    let converterOne_model : THREE.Group;




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

    var model : number[][][] = new Array<Array<Array<number>>>();

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
            model[2][i][2] = 0x664611;
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
                                    model[i][k][j] = 0x00ff00;
                                }
                                else{
                                    model[2][k][2] = 0x664611;
                                }
                            
                        }
                        else{
                            if(k == 3)
                                {
                                    model[i][k][j] = 0x00ff00;
                                }
                            else{
                                model[i][k][j] = 0x00ff00;
                            }
                        }
                }
            }
        }

    var arrayToMesh = new ArrayToMesh(model);
    var ruleApplyer = new RuleApplyer(model);

    converterOne_model = ruleApplyer.output();
    converterOne_canvas.CameraPosition(0,0,-10);
    converterOne_canvas.setMesh(converterOne_model);
    converterOne_canvas.start();
    
};
