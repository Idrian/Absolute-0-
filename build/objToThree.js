export class objToThree {
    constructor() {
        // this.loader  = new THREE.OBJLoader2();
    }
    ;
    convert(inputFile) {
        // this.loader.load(inputFile, this.assignMesh );
        return this.voxelMesh;
    }
    ;
    assignMesh(obj) {
        this.voxelMesh = obj;
    }
}
