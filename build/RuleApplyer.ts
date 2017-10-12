import * as THREE from 'three';
import {RuleInterpreter} from './Interpreter';
import {RulesFile} from './Interpreter';

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
       // var cellularRuleSets = this.interpreter.outPutCellularRuleSet();

       // console.log("CellularRuleSet",cellularRuleSets);

         //console.log("ruleSets",ruleSets);
        var xLength = this.theArray.length;
        var yLength = this.theArray[0].length;
        var zLength = this.theArray[0][0].length;

       /* if(cellularRuleSets.length > 0)
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
            }*/
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

    setInterpreter(newInterpreter : RuleInterpreter)
    {
        this.interpreter = newInterpreter; 
    }

}


