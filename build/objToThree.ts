//import * as THREE from 'three';
export class ObjToThree 
{
    private ctx;
    private img : HTMLImageElement;
    public color : number;
    public done : boolean;

    constructor()
    {  
        this.done = false;
        var canvas = document.createElement("canvas");

        if(canvas.getContext)
        {

           this.ctx = canvas.getContext('2d');

            var img = document.createElement("img");
            img.onload = (() => this.imageReady(img,canvas)); 

         img.src = 'example-models/1.png';
        }

      //  document.body.appendChild(canvas);
        this.img = img;
    };

    imageReady(img : HTMLImageElement,canvas : HTMLCanvasElement) 
    {
       // console.log("w:"+img.width+", h:"+img.height);
        img.width = img.width;
        img.height = img.height;
        canvas.width = img.width;
        canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0,img.width,img.height);
 
       var imgData = this.ctx.getImageData(img.width*0.8,img.height*0.5,1,1).data;

      // console.log("imgData: R:"+imgData[0]+",G:"+imgData[1]+",B:"+imgData[2]);

       this.rgbToHex(imgData[0],imgData[1],imgData[2]);
       this.done = true;
    };

    rgbToHex(r:number,g:number,b:number)
    {
        var hex = "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        this.color = parseInt(hex);
    }

    componentToHex(c) : string
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

}