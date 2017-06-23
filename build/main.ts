///<reference path="objToThree.ts" />

class voxJSCanvas
{
    private scene : THREE.Scene;
    private camera : THREE.Camera;
    private renderer : THREE.WebGLRenderer;
    private voxel : THREE.Mesh;

    constructor(containerID : string)
    {
        // Create the renderer, in this case using WebGL, we want an alpha channel
        let container = document.getElementById(containerID);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });

        // Set dimensions to containers and background color to white
        let containerWidth : number = 800; 
        let containerHeight : number = 400;
        this.renderer.setSize(containerWidth,containerHeight);
        this.renderer.setClearColor(0xFFFFFF,1);

        // Bind the renderer to the HTML, parenting it to our 'container' DIV
        container.appendChild(this.renderer.domElement);

        // Create a Scene
        this.scene = new THREE.Scene();

        // And a camera.  Set Field of View, Near and Far clipping planes
        this.camera = new THREE.PerspectiveCamera(45, containerWidth/containerHeight, 0.1, 1000);

        // Position is -20 along the Z axis and look at the origin
        this.camera.position.set(0,0,-20);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

         // Add the lights
        let ambientLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambientLight);

        let light = new THREE.PointLight( 0xFFFFDD );
        light.position.set( -15, 10, 15 );
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

    setMesh(inputMesh : THREE.Mesh)
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

    render() {
        // Each frame we want to render the scene again
        // Use typescript Arrow notation to retain the thisocity passing render to requestAnimationFrame
        // It's possible I invented the word thisocity.
        requestAnimationFrame(() => this.render());

		this.voxel.rotation.y += 0.01;


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

    let converterOne_model : THREE.Mesh;

    let objToThree_converter = new objToThree();


    //hard coded a obj file for testing
    let objTest : string = 'example-models/chr_gumi.obj';

    converterOne_model = objToThree_converter.convert(objTest)

   // converterOne_model = new THREE.Mesh( geometry, material );

   // var geometry = new THREE.BoxGeometry( 5, 5, 5 );

//	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    converterOne_canvas.setMesh(converterOne_model);
    converterOne_canvas.CameraPosition(0,0,-20);
    converterOne_canvas.start();
};
