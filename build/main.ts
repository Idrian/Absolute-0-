import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';
import {ArrayToMesh} from './ArrayToMesh';
import {RuleApplyer} from './RuleApplyer';
import {RuleInterpreter} from './Interpreter';
import {CellularRuleApplyer} from './CellularRuleApplyer';
import {fileReader} from './ObjToArray';

import {ImgToArray} from './ImgToArray';


class voxJSCanvas
{
    public scene : THREE.Scene;
    public camera : THREE.PerspectiveCamera;
    private renderer : THREE.WebGLRenderer;
    private voxel : THREE.Group;
    private controls : OrbitControls;
    private ambientLight : THREE.AmbientLight;
    private light : THREE.PointLight;
    public play_pause : boolean;

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

        this.scene.background =  new THREE.Color( 0xffffff );


       this.play_pause = true;
        
    }

   public CameraPosition(x : number,y : number,z : number)
    {
        this.camera.position.set(x,y,z);
        
    }

    public setDimensions(width : number, height : number)
    {
        this.renderer.setSize(width,height);
        this.camera.aspect = width/height;

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

        if(this.play_pause)
            {
                this.voxel.rotation.y += 0.01;
            }
           
          // this.voxel.getObjectByName("212").rotation.x += 0.01;
           this.controls.update();


        this.renderer.render(this.scene, this.camera);
    }

    start() 
    {
        this.render();
    }
}


(<any>window).voxJSCanvas = voxJSCanvas;
(<any>window).RuleInterpreter = RuleInterpreter;
(<any>window).ArrayToMesh = ArrayToMesh;
(<any>window).RuleApplyer = RuleApplyer;
(<any>window).CellularRuleApplyer = CellularRuleApplyer;
(<any>window).fileReader = fileReader;
(<any>window).OrbitControls = OrbitControls;
(<any>window).ImgToArray = ImgToArray;



