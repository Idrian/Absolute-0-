import * as THREE from 'three';

export class ArrayToMesh
{
    private theArray : number[][][];
    private theMesh : THREE.Group;

    constructor(inputArray : number[][][])
    {
        this.theArray = inputArray;
        this.theMesh = new THREE.Group();

        /**
         * These Length variables are used to re-centre the group object as each object
         * will be placed at the index values of the arrays so we need to push them back
         * in order to have the centre object be at (or relatively be at) postion 0,0,0
         */
        var xLength = Math.floor(inputArray.length/2);
        var yLength = Math.floor(inputArray[0].length/2);
        var zLength = Math.floor(inputArray[0][0].length/2);

        for(var x=0;x<this.theArray.length;x++)
            {
                for(var y=0;y<this.theArray[x].length;y++)
                    {
                        for(var z=0;z<this.theArray[x][y].length;z++)
                            {
                                let geometry = new THREE.BoxGeometry( 1, 1, 1 );
                               /* for ( let face in geometry.faces ) 
                                {
                                    geometry.faces[ face ].materialIndex = materialCounter;
                                }*/

                                let material = new THREE.MeshBasicMaterial( { color: this.theArray[x][y][z] } );
                                material.wireframe = true;
                                if(this.theArray[x][y][z] == null)
                                    {
                                    
                                    }
                                else{
                                     let singleCube = new THREE.Mesh( geometry, material );

                                    singleCube.position.set(-x+xLength,y-yLength,z-zLength);

                                    this.theMesh.add(singleCube);
                                }
                               

                               // scene.add(singleCube);
                            }
                    }
            }

           // console.log((inputArray.length/2),(inputArray[0].length/2),(inputArray[0][0].length/2));
           // this.theMesh.position.set(-(inputArray.length/2),-(inputArray[0].length/2),-(inputArray[0][0].length/2));
    }

    output() : THREE.Group
    {
        return this.theMesh.clone();
    }
}
