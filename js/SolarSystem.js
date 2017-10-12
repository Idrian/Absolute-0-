function loadSolarSystem()
{
  //  var solarSystem = new  voxJSCanvas("solarSystem");
  //  solarSystem.setDimensions(window.innerWidth, window.innerHeight);
  //  solarSystem.setBackgroundColor(0x020202);

let container = document.getElementById("solarSystem");

var renderer = new THREE.WebGLRenderer({alpha: true , antialias: true});

        var containerWidth  = window.innerWidth; 
        var containerHeight  = window.innerHeight;
        renderer.setSize(containerWidth,containerHeight);
        renderer.setClearColor(0xffffff,1);

        // Bind the renderer to the HTML, parenting it to our 'container' DIV
        container.appendChild(renderer.domElement);

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(45, containerWidth/containerHeight, 0.1, 1000);

        camera.position.set(0,0,60);
        camera.up.set(0,1,0);
        camera.lookAt(new THREE.Vector3(0,0,0));

        scene.add(camera);

        var ambientLight = new THREE.AmbientLight(0xFFFFFF);

        scene.add( ambientLight);

        var controls = new THREE.OrbitControls(camera,  renderer.domElement);

        scene.background =  new THREE.Color( 0x020202 );

    var model = new Array();
    for(var i=0;i<100;i++)
        {
            model.push(new Array());
            for(var j=0;j<1;j++)
                {
                    model[i].push(new Array());
                    for(var k=0;k<1;k++)
                        {
                            model[i][j].push(null);
                        }
                }
        }

        model[50][0][0] = "0xffff33"; //sun

        model[59][0][0] = "0xdd0000"; //mercury

        model[61][0][0] = "0x01ee00"; //venus

        model[65][0][0] = "0x0000ee"; //earth

        model[67][0][0] = "0x220000"; //mars

        model[73][0][0] = "0xffff00"; //jupiter
        
        model[80][0][0] = "0xcc0099"; //saturn

        model[85][0][0] = "0x000033"; //neptune

        model[92][0][0] = "0x3300cc"; //uranus



        //let arrayToMesh = new  ArrayToMesh(model);
      //  var mesh = arrayToMesh.output()

      //  solarSystem.setMesh(mesh);
       // solarSystem.start();


    /*var SolarFile = new File(,"/example-models/solarSystem.obj");
    console.log(SolarFile);
    var model;
    var converterOne = new  fileReader(SolarFile,function()
    {
        var model =  converterOne.getArray();

        console.log(model);

        var arrayToMesh = new ArrayToMesh(model);
        solarSystem.setMesh(arrayToMesh.output());
        solarSystem.start();
    });*/


    var ruleFile1 = '{"Rules" : [{"Key" : "0xffff33" , "Shape" : "Sphere","scale" : [10,10,10],  "Texture" : "./resources/textures/2k_sun.jpg" },{"Key" : "0xdd0000",  "Shape" : "Sphere","scale" : [0.5,0.5,0.5],"Texture" : "./resources/textures/2k_mercury.jpg"},{  "Key" : "0x01ee00",  "Shape" : "Sphere", "scale" : [0.8,0.8,0.8],  "Texture" : "./resources/textures/2k_venus_surface.jpg"},{  "Key" : "0x0000ee",  "Shape" : "Sphere",  "scale" : [1,1,1],  "Texture" : "./resources/textures/2k_earth_daymap.jpg"},{  "Key" : "0x220000",  "Shape" : "Sphere",  "scale" : [1,1,1],  "Texture" : "./resources/textures/2k_mars.jpg"},{ "Key" : "0xffff00",  "Shape" : "Sphere",  "scale" : [4,4,4], "Texture" : "./resources/textures/2k_jupiter.jpg"},{  "Key" : "0xcc0099",  "Shape" : "Sphere",  "scale" : [1.5,1.5,1.5],  "Texture" : "./resources/textures/2k_saturn.jpg"},{"Key" : "0xcc0099" , "Shape" : "ring","scale" : [2,2,2], "rotation" : [1.5, 0, 0],  "Texture" : "./resources/textures/2k_saturn.jpg"},{  "Key" : "0x000033",  "Shape" : "Sphere",  "scale" : [1.3,1.3,1.3],  "Texture" : "./resources/textures/2k_uranus.jpg" },{   "Key" : "0x3300cc",   "Shape" : "Sphere","scale" : [1.2,1.2,1.2],  "Texture" : "./resources/textures/2k_neptune.jpg"}]}';
    

    var ruleFile = JSON.parse(ruleFile1);


    var solarRuleApplyer = new  RuleApplyer();

    solarRuleApplyer.convert(ruleFile, model);
    var arrayToMesh = new  ArrayToMesh(model);

    var mesh;
   // mesh = arrayToMesh.output();
    mesh = solarRuleApplyer.output()

    //mesh.position.set(-25,0,0);
   // mesh.applyMatrix( new THREE.Matrix4().makeTranslation(-25, 0, 0) );
    scene.add(mesh);

// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 0.5
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ);

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);


    function render()
    {
        requestAnimationFrame(() => render());

        var vector  = new THREE.Vector3(0,0,0)
        var pivot = new THREE.Object3D();

        var matrix = new THREE.Matrix4();
       
      // mesh.rotation.y += 0.01;
        
        


        var sun = mesh.getChildByName("5000");
           sun.rotation.y += 0.1
       

        var merc = mesh.getChildByName("5900");
           merc.rotation.y += 0.1 
            matrix.makeRotationY(1*Math.PI/180);
           merc.position.applyMatrix4(matrix);
        var venus = mesh.getChildByName("6100");
           venus.rotation.y += 0.1
            matrix.makeRotationY(0.9*Math.PI/180);
           venus.position.applyMatrix4(matrix);

        var earth = mesh.getChildByName("6500");
           earth.rotation.y += 0.1
                      matrix.makeRotationY(0.7*Math.PI/180);
           earth.position.applyMatrix4(matrix);

                var mars = mesh.getChildByName("6700");
           mars.rotation.y += 0.1
                      matrix.makeRotationY(0.65*Math.PI/180);
           mars.position.applyMatrix4(matrix);


                var jupiter = mesh.getChildByName("7300");
           jupiter.rotation.y += 0.1
                      matrix.makeRotationY(0.5*Math.PI/180);
           jupiter.position.applyMatrix4(matrix);


for(var i=0;i<mesh.children.length;i++)
    {
        if(mesh.children[i].name == "8000")
            {
                      var saturn = mesh.children[i];
            saturn.rotation.y += 0.1
                      matrix.makeRotationY(0.3*Math.PI/180);
           saturn.position.applyMatrix4(matrix);
            }
    }

          

                var uranus = mesh.getChildByName("8500");
           uranus.rotation.y += 0.1
                      matrix.makeRotationY(0.2*Math.PI/180);
           uranus.position.applyMatrix4(matrix);

                var neptune = mesh.getChildByName("9200");
           neptune.rotation.y += 0.1
                      matrix.makeRotationY(0.1*Math.PI/180);
           neptune.position.applyMatrix4(matrix);
          // this.voxel.getObjectByName("212").rotation.x += 0.01;
           controls.update();


        renderer.render(scene, camera);
    }

    
    function start() 
    {
        render();
    }

    start();

}

