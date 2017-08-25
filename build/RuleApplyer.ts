import * as THREE from 'three';

export class RuleApplyer
{
    private theArray : string[][][];
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

    convert(ruleFile : RulesFile, inputArray : string[][][]) : THREE.Group
    {   

        this.theArray = inputArray;
        //this.interpreter = new RuleInterpreter(); 
        this.interpreter.setRuleFile(ruleFile);
      

        this.theMesh = new THREE.Group();

        /**
         * To clear the group in order to gaurentee a new empty group
         */
        while(this.theMesh.children.length > 0)
        {
            this.theMesh.remove(this.theMesh.children[0]);
        }



        // console.log("Inside Before Group",this.theMesh);

        var ruleSets = this.interpreter.outPutRuleSet();
        var cellularRuleSets = this.interpreter.outPutCellularRuleSet();

        console.log("CellularRuleSet",cellularRuleSets);

         console.log("ruleSets",ruleSets);
        var xLength = this.theArray.length;
        var yLength = this.theArray[0].length;
        var zLength = this.theArray[0][0].length;

        if(cellularRuleSets.length > 0)
            {
                for(var x=0;x<this.theArray.length;x++)
                {
                    for(var y=0;y<this.theArray[x].length;y++)
                        {
                            for(var z=0;z<this.theArray[x][y].length;z++)
                                {
                                    for(var c=0;c<cellularRuleSets.length;c++)
                                        {
                                            if(this.theArray[x][y][z] == cellularRuleSets[c].Color)
                                                {
                                                    var Top,Bottom,Left,Right,Front,Back;
                                                    if(x != xLength-1)//not the absolute Right
                                                        {
                                                            if(x != 0)//not the absolute Left
                                                                {
                                                                    //thus somewhere in the middle
                                                                    Right = this.theArray[x+1][y][z];
                                                                    Left = this.theArray[x-1][y][z];
                                                                }
                                                                else{//the most Left

                                                                }
                                                        }
                                                        else{//the most right
                                                            Right = null;
                                                        }
                                                    if(y == this.theArray[x][y].length-1)
                                                        {
                                                             Top = null;
                                                        }
                                                        else{
                                                             Top = this.theArray[x][y+1][z]
                                                        }
                                                    
                                                    break;
                                                }
                                        }
                                }
                        }
                }
            }
         /**
         * These Length variables are used to re-centre the group object as each object
         * will be placed at the index values of the arrays so we need to push them back
         * in order to have the centre object be at (or relatively be at) postion 0,0,0
         */
         xLength = Math.floor(inputArray.length/2);
         yLength = Math.floor(inputArray[0].length/2);
         zLength = Math.floor(inputArray[0][0].length/2);

    if(ruleSets.length > 0)
        {
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
        }
    else
        {
            console.warn("There are no rules set");
        }

        this.theMesh.name = "Voxel";
       //  console.log("Inside After Group",this.theMesh);
         return this.theMesh;
    }

    output() : THREE.Group
    {
         //console.log("Inside Before Group output",this.theMesh);
        return this.theMesh.clone();
    }

}


interface RulesFile {
  Rules:    [{
                Color : string ,
                Shape : string,
                rotation : number[],
                scale : number[],
                Texture : string,
                Bmap : string,
            }];
 cellularRules :    [{
                        Color : string,
                        Top : string,
                        Bottom : string,
                        Left : string,
                        Right : string,
                        Front : string,
                        Back : string,
                        newColor : string,
                    }];
}

interface RuleSet {
    Color : string ;
    Geometry : THREE.Geometry;
    Material : THREE.MeshPhongMaterial;
}

interface cellularRuleSet {
    Color : string; 
    rules : colorRules[];
}

class colorPositions {
        Top : string;
        Bottom : string;
        Left : string;
        Right : string;
        Front : string;
        Back : string;

    constructor()
    {

    }
}

class colorRules{
        valids : colorPositions;
        invalids : colorPositions;
        newColor : string;

        constructor()
        {
            this.valids = new colorPositions();
            this.invalids = new colorPositions();
            this.newColor = null;
        }
}

interface Shape{
    ShapeName : string ;
    ShapeGEO : THREE.Geometry;
}

class RuleInterpreter
{
    public Shapes : Shape[];

    private ruleSets : RuleSet[];

    private cellularRuleSets : cellularRuleSet[];

    private textureLoader : THREE.TextureLoader;

    private ruleFile : RulesFile;

    constructor()
    {
        //console.log("Rules",ruleFile)

        this.textureLoader = new THREE.TextureLoader();
        this.textureLoader.crossOrigin = "";
        this.Shapes = new Array<Shape>();
        this.ruleSets = new Array<RuleSet>();
        this.cellularRuleSets = new Array<cellularRuleSet>();
        this.Shapes.push({ShapeName : "cube", ShapeGEO : new THREE.BoxGeometry(1, 1, 1)});
        this.Shapes.push({ShapeName : "cylinder", ShapeGEO : new THREE.CylinderGeometry(0.5, 0.5, 1, 16)});
        this.Shapes.push({ShapeName : "circle", ShapeGEO : new THREE.CircleGeometry( 0.5, 16 )});
        this.Shapes.push({ShapeName : "cone", ShapeGEO : new THREE.ConeGeometry( 0.5, 1, 16 )});
        this.Shapes.push({ShapeName : "dodecahedron", ShapeGEO : new THREE.DodecahedronGeometry( 0.5, 0 )});
        this.Shapes.push({ShapeName : "icosahedron", ShapeGEO : new THREE.IcosahedronGeometry( 0.5, 0 )});
        this.Shapes.push({ShapeName : "octahedron", ShapeGEO : new THREE.OctahedronGeometry( 0.5, 0 )});
        this.Shapes.push({ShapeName : "plane", ShapeGEO : new THREE.PlaneGeometry( 1, 1, 16 )});
        this.Shapes.push({ShapeName : "pyramid", ShapeGEO : new THREE.CylinderGeometry(0, 0.7, 1, 4).rotateY(0.785398)});
        this.Shapes.push({ShapeName : "ring", ShapeGEO : new THREE.RingGeometry( 0.2, 0.5, 16 )});
        this.Shapes.push({ShapeName : "sphere", ShapeGEO : new THREE.SphereGeometry( 0.5, 16, 16 )});
        this.Shapes.push({ShapeName : "torus", ShapeGEO : new THREE.TorusGeometry( 1, 2, 8, 16 ).scale(0.5,0.5,0.5)});
        this.Shapes.push({ShapeName : "torusknot", ShapeGEO : new THREE.TorusKnotGeometry( 1, 2, 16, 8 ).scale(0.5,0.5,0.5)});


    }

    setRuleFile(ruleFile : RulesFile)
    {
        this.ruleFile = ruleFile;
        this.ruleSets = new Array<RuleSet>();
        this.cellularRuleSets = new Array<cellularRuleSet>();
    }

    outPutRuleSet() : RuleSet[]
    {
        for(var i=0;i<this.ruleFile.Rules.length;i++)
            {
                var GEO : THREE.Geometry;
                var MAT : THREE.MeshPhongMaterial;

                var shapeFound : boolean = false;
                if(this.ruleFile.Rules[i].Shape != null)
                {
                    var thisShape = this.ruleFile.Rules[i].Shape.toLowerCase();
                    for(var g=0;g<this.Shapes.length;g++)
                        {
                            if(thisShape == this.Shapes[g].ShapeName.toLowerCase())
                                {
                                    GEO = this.Shapes[g].ShapeGEO;
                                    shapeFound = true;
                                    break;
                                }
                        }
                }
                if(shapeFound == false)
                    {
                        GEO = new THREE.BoxGeometry(1, 1, 1);
                        console.warn("No matching shapes found, defaulting to 'cube'");
                    }
                if(this.ruleFile.Rules[i].rotation != null)
                    {
                       var rotationArray = this.ruleFile.Rules[i].rotation;
                        GEO = GEO.rotateX(rotationArray[0]);
                        GEO = GEO.rotateY(rotationArray[1]);
                        GEO = GEO.rotateZ(rotationArray[2]);
                    }
                  if(this.ruleFile.Rules[i].scale != null)
                    {
                        var scaleArray = this.ruleFile.Rules[i].scale;
                        GEO = GEO.scale(scaleArray[0],scaleArray[1],scaleArray[2]);
                    }
                var texture : THREE.Texture = this.textureLoader.load(this.ruleFile.Rules[i].Texture);
                var bumpTexture : THREE.Texture = null;
                if(this.ruleFile.Rules[i].Bmap != null)
                    {
                         bumpTexture = this.textureLoader.load(this.ruleFile.Rules[i].Bmap);
                    }
               // console.log("Textures","map",texture,"bmap",bumpTexture);
                 MAT = new THREE.MeshPhongMaterial({ map : texture, bumpMap : bumpTexture, bumpScale  :  1.0});
                
               // MAT.color.setHex(this.ruleFile.Rules[i].Color);
               if(thisShape == "ring" || thisShape == "plane" || thisShape == "circle")
               { MAT.side = THREE.DoubleSide;}

     
  
                this.ruleSets.push({Color : this.ruleFile.Rules[i].Color, Geometry : GEO, Material : MAT});
            
                 
            }
       
            //console.log("Rule-set",this.ruleSets);

            return this.ruleSets;
    }

    outPutCellularRuleSet() : cellularRuleSet[]
    {
        if(this.ruleFile.cellularRules != null)
            {
                for(var i=0;i<this.ruleFile.cellularRules.length;i++)
                    {
                        var currentColor = this.ruleFile.cellularRules[i].Color;

  
                        var newColorRuleSet : colorRules = new colorRules();

                        //TOP
                        if(this.ruleFile.cellularRules[i].Top != null)
                            {
                                if(this.ruleFile.cellularRules[i].Top.toLowerCase() == "empty")
                                    {
                                        newColorRuleSet.valids.Top = "empty";
                                    }
                                else
                                {
                                    if(this.ruleFile.cellularRules[i].Top.startsWith("!"))
                                        {
                                            newColorRuleSet.invalids.Top = this.ruleFile.cellularRules[i].Top.slice(1);
                                            newColorRuleSet.valids.Top = null;
                                        }
                                        else
                                            {
                                                newColorRuleSet.valids.Top = this.ruleFile.cellularRules[i].Top;
                                                newColorRuleSet.invalids.Top = null;
                                            }
                                }
                            }
                            else{
                                newColorRuleSet.valids.Top = null;
                                newColorRuleSet.invalids.Top = null;
                            }

                         //BOTTOM
                        if(this.ruleFile.cellularRules[i].Bottom != null)
                            {
                                if(this.ruleFile.cellularRules[i].Bottom.toLowerCase() == "empty")
                                    {
                                        newColorRuleSet.valids.Bottom = "empty";
                                    }
                                else
                                {
                                    if(this.ruleFile.cellularRules[i].Bottom.startsWith("!"))
                                        {
                                            newColorRuleSet.invalids.Bottom = this.ruleFile.cellularRules[i].Bottom.slice(1);
                                            newColorRuleSet.valids.Bottom = null;
                                        }
                                        else
                                            {
                                                newColorRuleSet.valids.Bottom = this.ruleFile.cellularRules[i].Bottom;
                                                newColorRuleSet.invalids.Bottom = null;
                                            }
                                }
                            }
                            else{
                                newColorRuleSet.valids.Bottom = null;
                                newColorRuleSet.invalids.Bottom = null;
                            }
                        
                        //LEFT
                        if(this.ruleFile.cellularRules[i].Left != null)
                            {
                                if(this.ruleFile.cellularRules[i].Left.toLowerCase() == "empty")
                                    {
                                        newColorRuleSet.valids.Left = "empty";
                                    }
                                else
                                {
                                    if(this.ruleFile.cellularRules[i].Left.startsWith("!"))
                                        {
                                            newColorRuleSet.invalids.Left = this.ruleFile.cellularRules[i].Left.slice(1);
                                            newColorRuleSet.valids.Left = null;
                                        }
                                        else
                                            {
                                                newColorRuleSet.valids.Left = this.ruleFile.cellularRules[i].Left;
                                                newColorRuleSet.invalids.Left = null;
                                            }
                                }
                            }
                            else{
                                newColorRuleSet.valids.Left = null;
                                newColorRuleSet.invalids.Left = null;
                            }

                        //RIGHT
                        if(this.ruleFile.cellularRules[i].Right != null)
                            {
                                if(this.ruleFile.cellularRules[i].Right.toLowerCase() == "empty")
                                    {
                                        newColorRuleSet.valids.Right = "empty";
                                    }
                                else
                                {
                                    if(this.ruleFile.cellularRules[i].Right.startsWith("!"))
                                        {
                                            newColorRuleSet.invalids.Right = this.ruleFile.cellularRules[i].Right.slice(1);
                                            newColorRuleSet.valids.Right = null;
                                        }
                                        else
                                            {
                                                newColorRuleSet.valids.Right = this.ruleFile.cellularRules[i].Right;
                                                newColorRuleSet.invalids.Right = null;
                                            }
                                }
                            }
                            else{
                                newColorRuleSet.valids.Right = null;
                                newColorRuleSet.invalids.Right = null;
                            }

                        //FRONT
                        if(this.ruleFile.cellularRules[i].Front != null)
                            {
                                if(this.ruleFile.cellularRules[i].Front.toLowerCase() == "empty")
                                    {
                                        newColorRuleSet.valids.Front = "empty";
                                    }
                                else
                                {
                                    if(this.ruleFile.cellularRules[i].Front.startsWith("!"))
                                        {
                                            newColorRuleSet.invalids.Front = this.ruleFile.cellularRules[i].Front.slice(1);
                                            newColorRuleSet.valids.Front = null;
                                        }
                                        else
                                            {
                                                newColorRuleSet.valids.Front = this.ruleFile.cellularRules[i].Front;
                                                newColorRuleSet.invalids.Front = null;
                                            }
                                }
                            }
                            else{
                                newColorRuleSet.valids.Front = null;
                                newColorRuleSet.invalids.Front = null;
                            }

                        //BACK
                        if(this.ruleFile.cellularRules[i].Back != null)
                            {
                                if(this.ruleFile.cellularRules[i].Back.toLowerCase() == "empty")
                                    {
                                        newColorRuleSet.valids.Back = "empty";
                                    }
                                else
                                {
                                    if(this.ruleFile.cellularRules[i].Back.startsWith("!"))
                                        {
                                            newColorRuleSet.invalids.Back = this.ruleFile.cellularRules[i].Back.slice(1);
                                            newColorRuleSet.valids.Back = null;
                                        }
                                        else
                                            {
                                                newColorRuleSet.valids.Back = this.ruleFile.cellularRules[i].Back;
                                                newColorRuleSet.invalids.Back = null;
                                            }
                                }
                            }
                            else{
                                newColorRuleSet.valids.Back = null;
                                newColorRuleSet.invalids.Back = null;
                            }

                            newColorRuleSet.newColor = this.ruleFile.cellularRules[i].newColor;

                            var colorFound : boolean = false;
                        for(var c=0;c<this.cellularRuleSets.length ; c++)
                            {
                                if(currentColor == this.cellularRuleSets[c].Color)
                                    {
                                        colorFound = true;
                                        this.cellularRuleSets[c].rules.push(newColorRuleSet);
                                        break;
                                    }
                            }
                                if(colorFound == false)
                                    {
                                        var newColorRules = new Array<colorRules>()
                                        newColorRules.push(newColorRuleSet)
                                        this.cellularRuleSets.push({Color : currentColor, rules : newColorRules})
                                    }
                    }
            }
         return this.cellularRuleSets;
    }

    addShape(name : string, GEO : THREE.Geometry)
    {
        this.Shapes.push({ShapeName : name, ShapeGEO : GEO});
    }


}