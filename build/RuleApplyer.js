import * as THREE from 'three';
export class RuleApplyer {
    constructor(inputArray) {
        this.theArray = inputArray;
        this.theMesh = new THREE.Group();
        this.textureLoader = new THREE.TextureLoader();
        this.textureLoader.crossOrigin = "";
        this.texturesArray = new Array();
        this.geometryArray = new Array();
        this.materialsArray = new Array();
        this.colorArray = new Array();
        var texture = this.textureLoader.load("./resources/textures/oak.png");
        this.materialsArray.push(new THREE.MeshPhongMaterial({ map: texture }));
        texture = this.textureLoader.load("./resources/textures/leaves.jpg");
        this.materialsArray.push(new THREE.MeshPhongMaterial({ map: texture }));
        this.geometryArray.push(new THREE.CylinderGeometry(0.5, 0.5, 1, 16));
        this.geometryArray.push(new THREE.BoxGeometry(1, 1, 1));
        this.colorArray.push(0x664611);
        this.colorArray.push(0x00ff00);
        /**
         * These Length variables are used to re-centre the group object as each object
         * will be placed at the index values of the arrays so we need to push them back
         * in order to have the centre object be at (or relatively be at) postion 0,0,0
         */
        var xLength = Math.floor(inputArray.length / 2);
        var yLength = Math.floor(inputArray[0].length / 2);
        var zLength = Math.floor(inputArray[0][0].length / 2);
        for (var x = 0; x < this.theArray.length; x++) {
            for (var y = 0; y < this.theArray[x].length; y++) {
                for (var z = 0; z < this.theArray[x][y].length; z++) {
                    if (this.theArray[x][y][z] == null) {
                        //do nothing
                    }
                    else {
                        for (var i = 0; i < this.colorArray.length; i++) {
                            if (this.theArray[x][y][z] == this.colorArray[i]) {
                                let newObject = new THREE.Mesh(this.geometryArray[i], this.materialsArray[i]);
                                newObject.position.set(-x + xLength, y - yLength, z - zLength);
                                this.theMesh.add(newObject);
                            }
                        }
                    }
                }
            }
        }
    }
    output() {
        return this.theMesh;
    }
}
