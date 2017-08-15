import * as THREE from 'three';

export class RuleApplyer
{
    private theArray : number[][][];
    private theMesh : THREE.Group;
    public interpreter : RuleInterpreter;

    constructor()
    {
      //  console.log("JSON",ruleFile.Rules[0]);

        this.interpreter = new RuleInterpreter(); 
       
        
       
    }

   /* setinterpretor(interpreter : RuleInterpreter)
    {
        this.interpreter = interpreter;
    }*/

    convert(ruleFile : RulesFile, inputArray : number[][][]) : THREE.Group
    {   

        this.theArray = inputArray;
        //this.interpreter = new RuleInterpreter(); 
        this.interpreter.setRuleFile(ruleFile);
      

        this.theMesh = new THREE.Group();

        while(this.theMesh.children.length > 0)
        {
            this.theMesh.remove(this.theMesh.children[0]);
        }

        // console.log("Inside Before Group",this.theMesh);

        var ruleSets = this.interpreter.outPutRuleSet();
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
                                if(this.theArray[x][y][z] == null)
                                    {
                                        //do nothing
                                    }
                                else
                                    {
                                        for(var i=0;i<ruleSets.length;i++)
                                            {
                                                if(this.theArray[x][y][z] == ruleSets[i].Color)
                                                    {
                        
                                                        let newObject = new THREE.Mesh( ruleSets[i].Geometry, ruleSets[i].Material );
                                                        newObject.position.set(-x+xLength,y-yLength,z-zLength);
                                                        newObject.name = x.toString()+y.toString()+z.toString();
                                                        this.theMesh.add(newObject); 
                                                      //  console.log("POS",x,y,z,"Name",newObject.name,"Color",this.theArray[x][y][z]);
                                                    }
                                            }
                                    }
                            }
                    }
            }

        this.theMesh.name = "Voxel";
       //  console.log("Inside After Group",this.theMesh);
         return this.theMesh;
    }

    output() : THREE.Group
    {
         //console.log("Inside Before Group output",this.theMesh);
        return this.theMesh;
    }
}


interface RulesFile {
  Rules:    [{
                Color : number ;
                Shape : string;
                Texture : string;
                Bmap : string;
            }];
}

interface RuleSet {
    Color : number ;
    Geometry : THREE.Geometry;
    Material : THREE.MeshPhongMaterial;
}

interface Shape{
    ShapeName : string ;
    ShapeGEO : THREE.Geometry;
}

class RuleInterpreter
{
    public Shapes : Shape[];

    private ruleSets : RuleSet[];

    private textureLoader : THREE.TextureLoader;

    private ruleFile : RulesFile;

    constructor()
    {
        //console.log("Rules",ruleFile)

        this.textureLoader = new THREE.TextureLoader();
        this.textureLoader.crossOrigin = "";
        this.Shapes = new Array<Shape>();
        this.ruleSets = new Array<RuleSet>();
        this.Shapes.push({ShapeName : "cube", ShapeGEO : new THREE.BoxGeometry(1, 1, 1)});
        this.Shapes.push({ShapeName : "cylinder", ShapeGEO : new THREE.CylinderGeometry(0.5, 0.5, 1, 16)});
        this.Shapes.push({ShapeName : "circle", ShapeGEO : new THREE.CircleGeometry( 0.5, 16 )});
        this.Shapes.push({ShapeName : "cone", ShapeGEO : new THREE.ConeGeometry( 0.5, 1, 16 )});
        this.Shapes.push({ShapeName : "dodecahedron", ShapeGEO : new THREE.DodecahedronGeometry( 0.5, 0 )});
        this.Shapes.push({ShapeName : "icosahedron", ShapeGEO : new THREE.IcosahedronGeometry( 0.5, 0 )});
         this.Shapes.push({ShapeName : "octahedron", ShapeGEO : new THREE.OctahedronGeometry( 0.5, 0 )});
          this.Shapes.push({ShapeName : "plane", ShapeGEO : new THREE.PlaneGeometry( 1, 1, 16 )});
        this.Shapes.push({ShapeName : "ring", ShapeGEO : new THREE.RingGeometry( 0.2, 0.5, 16 )});
        this.Shapes.push({ShapeName : "sphere", ShapeGEO : new THREE.SphereGeometry( 0.5, 16, 16 )});
        this.Shapes.push({ShapeName : "torus", ShapeGEO : new THREE.TorusGeometry( 1, 2, 8, 16 ).scale(0.5,0.5,0.5)});
        this.Shapes.push({ShapeName : "torusknot", ShapeGEO : new THREE.TorusKnotGeometry( 1, 2, 16, 8 ).scale(0.5,0.5,0.5)});


    }

    setRuleFile(ruleFile : RulesFile)
    {
        this.ruleFile = ruleFile;
        this.ruleSets = new Array<RuleSet>();
    }

    outPutRuleSet() : RuleSet[]
    {
                for(var i=0;i<this.ruleFile.Rules.length;i++)
            {
                var GEO : THREE.Geometry;
                var MAT : THREE.MeshPhongMaterial;

                for(var g=0;g<this.Shapes.length;g++)
                    {
                        if(this.ruleFile.Rules[i].Shape.toLowerCase() == this.Shapes[g].ShapeName.toLowerCase())
                            {
                                GEO = this.Shapes[g].ShapeGEO;
                                break;
                            }
                    }
                var texture = this.textureLoader.load(this.ruleFile.Rules[i].Texture);
                var bumpTexture = null;
                if(this.ruleFile.Rules[i].Bmap != null)
                    {
                         bumpTexture = this.textureLoader.load(this.ruleFile.Rules[i].Bmap);
                    }
                MAT = new THREE.MeshPhongMaterial({map : texture, bumpMap : bumpTexture, bumpScale  :  1.0}); 
                MAT.side = THREE.DoubleSide;
                 this.ruleSets.push({Color : this.ruleFile.Rules[i].Color, Geometry : GEO, Material : MAT});
            }
       
            //console.log("Rule-set",this.ruleSets);

            return this.ruleSets;
    }

    addShape(name : string, GEO : THREE.Geometry)
    {
        this.Shapes.push({ShapeName : name, ShapeGEO : GEO});
    }


}