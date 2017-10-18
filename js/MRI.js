function loadMRI()
{
       var imgConverter = new ImgToArray();

        var imgSrc = new Array();
       // var imgSrc10 = './resources/images/64x64/normal_brain_mri_10.jpg';
      //  var imgSrc11 = './resources/images/64x64/normal_brain_mri_11.jpg';
   /* for(var i=8;i<11;i++)
        {
            imgSrc.push('./resources/images/64x64/normal_brain_mri_'+i.toString()+'.jpg')
        }
*/
        var model;
        



    let container = document.getElementById("MRI");

    var renderer = new THREE.WebGLRenderer({alpha: true , antialias: true});

      var containerWidth  = window.innerWidth; 
        var containerHeight  = window.innerHeight;
        renderer.setSize(containerWidth,containerHeight);
        renderer.setClearColor(0xffffff,1);

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

         scene.background =  new THREE.Color( 0xffffff );


 var mriRuleApplyer = new  RuleApplyer();

         imgConverter.convert('./resources/images/64x64/normal_brain_mri_'+10+'.jpg',function()
        {
            model = imgConverter.output();
         // console.log("imgArray: ",model);
        // console.log("colors: ",imgConverter.getColors());
            var mesh = generateMesh();
            scene.add(mesh);
        });

document.getElementById("imageTextForm").onsubmit = function(e)
{
    e.preventDefault();
    var text_url = document.getElementById("imageText").value;

        imgConverter.convert(text_url,function()
        {
            model = imgConverter.output();
         // console.log("imgArray: ",model);
        // console.log("colors: ",imgConverter.getColors());
             scene.remove(scene.getObjectByName("Voxel"));
            var mesh = generateMesh();
            scene.add(mesh);
        });

}

    function render()
    {
        requestAnimationFrame(() => render());
        controls.update();
        renderer.render(scene, camera);
    }

    function start() 
    {
        render();
    }

    start();

    function generateMesh()
    {
       var ruleFileJson = '{"Rules" : ['; 
        var colors = imgConverter.getColors();
        console.log("Colors: ",colors);
            var i
            for(i=0;i<colors.length-1;i++)
                {
                    if(!colors[i].includes("0x0"))
                        {
                        ruleFileJson += '{"Key" : "'+ colors[i] +'" ,"Color" : "'+colors[i] +'" , "Shape" : "Cube","Texture" : "./resources/textures/oak.png" },';
                        }
                }
            ruleFileJson += '{"Key" : "'+ colors[i] +'" ,"Color" : "'+colors[i] +'" , "Shape" : "Cube","Texture" : "./resources/textures/oak.png" }]}';    

            var ruleFile = JSON.parse(ruleFileJson);
            let arrayToMesh = new  RuleApplyer();
            mriRuleApplyer.convert(ruleFile, model);
            

           // let arrayToMesh = new  ArrayToMesh(model);
            var mesh = mriRuleApplyer.output();
           // var mesh = arrayToMesh.output();
            return mesh;
    }
}


