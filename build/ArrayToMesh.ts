import * as THREE from 'three';

export class ArrayToMesh
{
    private theArray : number[][][];
    private theMesh : THREE.Mesh;

    constructor(scene : THREE.Scene,inputArray : number[][][])
    {
        this.theArray = inputArray;
        var mergedGeometry = new THREE.Geometry();
        var mergedMaterialArray : THREE.MeshBasicMaterial[] = new Array<THREE.MeshBasicMaterial>();
        var materialCounter : number = 0;
         


        
        for(var x=0;x<this.theArray.length;x++)
            {
                for(var y=0;y<this.theArray[x].length;y++)
                    {
                        for(var z=0;z<this.theArray[x][y].length;z++)
                            {
                                let geometry = new THREE.BoxGeometry( 1, 1, 1 );
                                for ( let face in geometry.faces ) 
                                {
                                    geometry.faces[ face ].materialIndex = materialCounter;
                                }

                                let material = new THREE.MeshBasicMaterial( { color: this.theArray[x][y][z] } );
                                material.wireframe = true;
                                if(this.theArray[x][y][z] == null)
                                    {
                                    
                                    }
                                else{
                                     let singleCube = new THREE.Mesh( geometry, material );

                                    singleCube.position.set(-x,y,z);

                                    mergedMaterialArray.push(material);
                                    // mergedGeometry.merge(geometry, singleCube.matrix ,materialCounter);
                                    mergedGeometry.mergeMesh(singleCube);
                                
                                    materialCounter++;
                                }
                               

                               // scene.add(singleCube);
                            }
                    }
            }

	    
        var meshFaceMaterial = new THREE.MeshFaceMaterial( mergedMaterialArray );
        this.theMesh = new THREE.Mesh( mergedGeometry, meshFaceMaterial );
        this.theMesh.geometry.center();
    }

    output() : THREE.Mesh
    {
        return this.theMesh;
    }
}