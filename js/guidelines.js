var texture_guidelines = [
    ['Bark', './resources/textures/bark.tif'],
    ['Brick', './resources/textures/brick-texture.jpg'],
    ['Pine Bark', './resources/textures/PineBark.tif'],
    ['Cactus', './resources/textures/cactus.png'],
    ['', './resources/textures/cool-background-textures-gp_textures.jpg'],
    ['Dummy', './resources/textures/dummytexture.jpg'],
    ['Flowerbed', './resources/textures/flowerbed-texture.jpg'],
    ['Grass', './resources/textures/grass-texture.jpg'],
    ['Green Leaves', './resources/textures/green-leaves-texture-background-1920x1080.jpg'],
    ['Industrial Buildings', './resources/textures/industrial-buildings.jpg'],
    ['Leaves', './resources/textures/leaves.jpg'],
    ['Leaves Bump', './resources/textures/leavesBump.jpg'],
    ['Oak', './resources/textures/oak.png'],
    ['Oak Bump', './resources/textures/oakBump.png'],
    ['Sand', './resources/textures/sand.jpg'],
    ['Slate Roof', './resources/textures/slate-roof-texture.jpg'],
    ['Leaves', './resources/textures/texture_leaves_by_kuschelirmel_stock.jpg'],
    ['Leaves', './resources/textures/texture_leaves_by_kuschelirmel_stockBump.jpg'],
    ['Pine Bark', './resources/textures/TexturesCom_PineBark2_512_albedo.tif'],
    ['Pine Bark', './resources/textures/TexturesCom_PineBark2_512_height.tif'],
]
var shape_guidelines = [
    ["hemisphere","resources/shapes/hemisphere.png"],
    ["cube","resources/shapes/cube.png"],
    ["cylinder","resources/shapes/cylinder.png"],
    ["circle","resources/shapes/circle.png"],
    ["cone","resources/shapes/cone.png"],
    ["plane","resources/shapes/plane.jpg"],
    ["pyramid","resources/shapes/pyramid.png"],
    ["ring","resources/shapes/ring.png"],
    ["sphere","resources/shapes/sphere.png"],
    ["torus","resources/shapes/torus.jpeg"],
    ["torusknot","resources/shapes/torusknot.png"],
    ["dodecahedron","resources/shapes/dodecahedron.jpeg"],
    ["icosahedron","resources/shapes/icosahedron.png"],
    ["octahedron","resources/shapes/octahedron.png"]
]

document.getElementById("colorGuidelines").onclick = function(){
    document.getElementById("colorCanvasLoader").innerHTML = '<div id="colorGuidelinesCanvas" width="800" height="400">'; 
}

document.getElementById("textureGuidelines").onclick = function(){
    var textureList = document.getElementById("availableTexturesList");
    for(var i = 0; i < 14; i++){
        textureList.innerHTML += '<div class="texture-example-container col-xs-10"><div class="texture-example-image-container col-xs-2"><img class="texture-example-image" src="' + texture_guidelines[i][1] + '"/></div><div class="texture-example-name col-xs-10">'+ texture_guidelines[i][0] + ' | <span class="texture-example-value">"' + texture_guidelines[i][1] + '"</span></div></div>';
    }
}

document.getElementById("textureSearchText").oninput = function(){
    var searchText = document.getElementById("textureSearchText").value.toLowerCase();
    var textureList = document.getElementById("availableTexturesList");
    var searchResults = []
    if(searchText == ""){
        textureList.innerHTML = "";
        for(var i = 0; i < 20; i++){
            textureList.innerHTML += '<div class="texture-example-container col-xs-10"><div class="texture-example-image-container col-xs-2"><img class="texture-example-image" src="' + texture_guidelines[i][1] + '"/></div><div class="texture-example-name col-xs-10">'+ texture_guidelines[i][0] + ' | <span class="texture-example-value">"' + texture_guidelines[i][1] + '"</span></div></div>';
        }
    } else {
        textureList.innerHTML = "";
        for (var i = 0; i < texture_guidelines.length; i++){
            if(texture_guidelines[i][0].toLowerCase().includes(searchText)){
                searchResults.push(texture_guidelines[i])
            }
        }
        if(searchResults.length > 0){
            for (var i = 0; i < searchResults.length; i++){
                textureList.innerHTML += '<div class="texture-example-container col-xs-10"><div class="texture-example-image-container col-xs-2"><img class="texture-example-image" src="' + searchResults[i][1] + '"/></div><div class="texture-example-name col-xs-10">'+ searchResults[i][0] + ' | <span class="texture-example-value">"' + searchResults[i][1] + '"</span></div></div>';
            }
        }
        else{
            textureList.innerHTML = "No search results found...";
        }
        
    }
}

document.getElementById("shapeGuidelines").onclick = function(){
    var shapesList = document.getElementById("availableShapesList");
    for(var i = 0; i < shape_guidelines.length; i++){
        shapesList.innerHTML += '<div class="row"><div class="shape-example-container col-xs-10"><div class="shape-example-image-container col-xs-2"><img class="shape-example-image" src="' + shape_guidelines[i][1] + '"></div><div class="shape-example-name">' + shape_guidelines[i][0] + '</div></div></div>';
    }
}

document.getElementById("shapeSearchText").oninput = function(){
    var searchText = document.getElementById("shapeSearchText").value.toLowerCase();
    var shapesList = document.getElementById("availableShapesList");
    var searchResults = []
    if(searchText == ""){
        shapesList.innerHTML = "";
        for(var i = 0; i < shape_guidelines.length; i++){
            shapesList.innerHTML += '<div class="row"><div class="shape-example-container col-xs-10"><div class="shape-example-image-container col-xs-2"><img class="shape-example-image" src="' + shape_guidelines[i][1] + '"></div><div class="shape-example-name">' + shape_guidelines[i][0] + '</div></div></div>';
        }
    } else {
        shapesList.innerHTML = "";
        for (var i = 0; i < shape_guidelines.length; i++){
            if(shape_guidelines[i][0].toLowerCase().includes(searchText)){
                searchResults.push(shape_guidelines[i])
            }
        }
        if(searchResults.length > 0){
            for (var i = 0; i < searchResults.length; i++){
                shapesList.innerHTML += '<div class="row"><div class="shape-example-container col-xs-10"><div class="shape-example-image-container col-xs-2"><img class="shape-example-image" src="' + searchResults[i][1] + '"></div><div class="shape-example-name">' + searchResults[i][0] + '</div></div></div>';
            }
        }
        else{
            shapesList.innerHTML = "No search results found...";
        }
        
    }
}