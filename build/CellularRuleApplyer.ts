import * as THREE from 'three';
import {RuleInterpreter} from './Interpreter';
import {RulesFile} from './Interpreter';

export class CellularRuleApplyer
{
    private theArray : string[][][];
    public interpreter : RuleInterpreter;

    constructor()
    {
      //  console.log("JSON",ruleFile.Rules[0]);

        this.interpreter = new RuleInterpreter();   
    }

    convert(ruleFile : RulesFile, inputArray : string[][][]) : string[][][]
    {  
        this.theArray = inputArray;

        this.interpreter.setRuleFile(ruleFile);

        var cellularRuleSets = this.interpreter.outPutCellularRuleSet();

        console.log("ruleSets",cellularRuleSets);

        if(cellularRuleSets.length > 0)
            {
                for(var x=0;x<inputArray.length;x++)
                {
                    for(var y=0;y<inputArray[x].length;y++)
                        {
                            for(var z=0;z<inputArray[x][y].length;z++)
                                {
                                    var Top,Bottom,Left,Right,Front,Back;
                                    var currColor = inputArray[x][y][z]

                                    //LEFT
                                    if(x > 0 )
                                        {
                                            Left = inputArray[x-1][y][z];
                                        }
                                    else
                                        {
                                            Left = null;
                                        }
                                    //RIGHT
                                    if(x < (inputArray.length-1))
                                        {
                                            Right = inputArray[x+1][y][z]
                                        }
                                    else
                                        {
                                            Right = null;
                                        }

                                    //BOTTOM   
                                    if(y > 0 )
                                        {
                                            Bottom = inputArray[x][y-1][z];
                                        }
                                    else
                                        {
                                            Bottom  = null;
                                        }
                                    //TOP
                                    if(y < (inputArray[x].length-1))
                                        {
                                            Top = inputArray[x][y+1][z]
                                        }
                                    else
                                        {
                                            Top = null;
                                        }

                                    //BACK    
                                    if(z > 0 )
                                        {
                                            Back = inputArray[x][y][z+1];
                                        }
                                    else
                                        {
                                            Back = null;
                                        }
                                    //FRONT
                                    if(z < (inputArray[x][y].length-1))
                                        {
                                            Front = inputArray[x][y][z-1]
                                        }
                                    else
                                        {
                                            Front = null;
                                        }

                                    for(var c=0;c<cellularRuleSets.length;c++)
                                        {
                                            if( currColor == cellularRuleSets[c].Color)
                                                {
                                                    for(var r=0;r<cellularRuleSets[c].rules.length;r++)
                                                        {
                                                            if( Top == cellularRuleSets[c].rules[r].valids.Top &&
                                                                Bottom == cellularRuleSets[c].rules[r].valids.Bottom &&
                                                                Front == cellularRuleSets[c].rules[r].valids.Front &&
                                                                Back == cellularRuleSets[c].rules[r].valids.Back &&
                                                                Left == cellularRuleSets[c].rules[r].valids.Left &&
                                                                Right == cellularRuleSets[c].rules[r].valids.Right
                                                            )
                                                            {
                                                                this.theArray[x][y][z] = cellularRuleSets[c].rules[r].newColor;
                                                                break;
                                                            }
                                                        }

                                                }

                                        }

                                }

                        }

                }

            }

        return this.theArray;
    }

    output() : string[][][]
    {
         //console.log("Inside Before Group output",this.theMesh);
        return this.theArray;
    }

    setInterpreter(newInterpreter : RuleInterpreter)
    {
        this.interpreter = newInterpreter; 
    }
}