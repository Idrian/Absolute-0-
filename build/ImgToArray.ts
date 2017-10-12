import * as THREE from 'three';
import {rgbToHex} from './ColourFunctions';
import {componentToHex} from './ColourFunctions';

export class ImgToArray
{
    private theArray : string[][][];
    private imgCount : number;
    private theMesh : THREE.Group;
    private imgArray : string[];
    public colorMatrix : string[];

    constructor()
    {
        this.colorMatrix = new Array<string>();
        this.theArray = new Array();
        this.imgCount = 0;
    }

    convert(inputArray: string[],callback : Function)
    {
        var canvas = document.createElement("canvas");

        for(var i=0;i<inputArray.length;i++)
            {
                 if(canvas.getContext)
                {
                    this.theArray.push(new Array());
                    

                    var ctx = canvas.getContext('2d');

                    var image : HTMLImageElement = new Image();

                    image.onload = (() => this.imageReady(image,ctx)); 
                }

                image.src = inputArray[i];

                this.imgCount++;
            }
       
            
            callback();
          //  console.log("theArray: ",this.theArray);

      //  return this.theArray;
    }

    private imageReady(image : HTMLImageElement,ctx : any)
    {

        
       
        ctx.drawImage(image, 0, 0);

        var imgData = ctx.getImageData(0, 0, image.width, image.height);

        var colors = imgData.data;

       var color : string = null;

       var w = 0;
        for(var p=0;p<colors.length;p += 4)
            {
                this.theArray[this.imgCount - 1].push(new Array(image.width));

                color = rgbToHex(colors[p],colors[p+1],colors[p+2]);

                console.log("P: ",p);
                console.log("color: ",color);
                this.theArray[this.imgCount - 1][w].push(color);
                console.log("w: ",w);
                 w++;

            }

       /* for(var x=0;x<image.width;x++)
            {
                this.theArray[this.imgCount - 1].push(new Array());
                
                for(var y=0;y<image.height;y++)
                    {
                        var color : string = null;

                        var imgData = ctx.getImageData(x, y, 1, 1);

                        var colors = imgData.data;

                         color = rgbToHex(colors[0],colors[1],colors[2]);

                         this.theArray[this.imgCount - 1][x].push(color);

                         console.log("Colour : ",color);
                         console.log("Array value : ",this.theArray[this.imgCount - 1][x][y])

                    }
            }*/
        
    }

    output() : string[][][]
    {
        return this.theArray;
    }
}