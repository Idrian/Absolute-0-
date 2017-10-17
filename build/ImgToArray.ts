import * as THREE from 'three';
import {rgbToHex} from './ColourFunctions';
import {componentToHex} from './ColourFunctions';

export class ImgToArray
{
    private theArray : string[][][];
    private imgArray : string[];
    public colorMatrix : string[];

    constructor()
    {
        this.colorMatrix = new Array<string>();
        this.theArray = new Array();

    }

    convert(inputArray: string,callback : Function)
    {

        var canvas = document.createElement("canvas");


                if(canvas.getContext)
                {
                    //this.theArray.push(new Array());
                    

                    var ctx = canvas.getContext('2d');

                    var image : HTMLImageElement = new Image();

                    image.onload = (() => this.imageReady(image,ctx,callback)); 
                }

                image.src = inputArray;

       
            
      
          //  console.log("theArray: ",this.theArray);

      //  return this.theArray;
    }

    private imageReady(image : HTMLImageElement,ctx : any, callback : Function)
    {

        
       
        ctx.drawImage(image, 0, 0);

        var imgData = ctx.getImageData(0, 0, image.width, image.height);

        var colors = imgData.data;

        var color : string = null;

        this.theArray = new Array();
        var x = -1;
        var z = 0;
        for(var p=0;p<colors.length;p += 4)
            {
              //  console.log("P: ",x);
              //  console.log("y: ",this.theArray.length);
               
               
              //  this.theArray[x].push(new Array(image.width));

              //  console.log("x: ",this.theArray[x].length);


                color = rgbToHex(colors[p],colors[p+1],colors[p+2]);

                if(this.colorMatrix.length == 0)
                    {
                        this.colorMatrix.push(color);
                    }
                else
                    {
                        var newColor = true;
                        for(var i=0;i<this.colorMatrix.length;i++)
                            {
                                if(this.colorMatrix[i] == color)
                                    {
                                        newColor = false;
                                        break;
                                    }
                            }
                            if(newColor == true)
                                {
                                    this.colorMatrix.push(color);
                                }
                    }

              //  console.log("x: ",x%image.width);
              //  console.log("z: ",z%image.height);

                if(z%image.width == 0)
                    {
                        this.theArray.push(new Array());
                        x++;
                    }
                    this.theArray[x].push(new Array());
                

                

                this.theArray[x%image.height][z%image.width].push(color);

 


              //  console.log("z: ",this.theArray[x][0]);
              //  console.log("A: ",this.theArray);
               // x++;
                z++;
            }

            callback();
        
    }

    output() : string[][][]
    {
        return this.theArray;
    }

    getColors() : string[]
    {
        return this.colorMatrix;
    }
}