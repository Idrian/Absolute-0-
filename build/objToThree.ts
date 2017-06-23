class objToThree 
{
    private voxelMesh : THREE.Mesh;
    private loader;

    constructor()
    {
        this.loader  = new THREE.OBJLoader2();
    };

    convert(inputFile : string) : THREE.Mesh
    {
        this.loader.load(inputFile, this.assignMesh );
        return this.voxelMesh;
    };

    private assignMesh(obj : THREE.Mesh)
    {
        this.voxelMesh = obj;
    }
}