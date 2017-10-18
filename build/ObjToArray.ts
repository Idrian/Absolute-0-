import {rgbToHex} from './ColourFunctions';
import {componentToHex} from './ColourFunctions';

export class fileReader {
    element: File;

     reader:FileReader = new FileReader();
    //declaring the arrays to hold the .obj data
    //holds the normals
    GvnArray: string[] = [];
    //holds the texture coordinates
    GvtArray: string[] = [];
    //holds the vert
    GvArray: string[] = [];
    //holds the faces
    GfArray: string[] = [];
    //3Darray of coords
    matrix: face[];
    //final matrix
    finalMatrix: string[][][] = [];
    theArray: number[][][] = [];
    //flag to check if matrix has been created
    flag: boolean = false;
    //used to hold colorMatrix
    colorMatrix: string[] = [];

    //largest ccoordinates
    largestX: number = 0;
    largestY: number = 0;
    largestZ: number = 0;

    lowX: number = 0;
    lowY: number = 0;
    lowZ: number = 0;

    ready: boolean ;

    //called immediately
    constructor(element: File, callback : Function) {
       // this.ready = false;
        this.element = element;

     //   this.loadOBJ();
       // var me = this


            //opens file
   
       console.log("Cameron is wrong test 1",this.element.name);
        var me: fileReader = this;
    
            //declaring the arrays to hold the .obj data
            //holds the normals
            me.GvnArray = [];
            //holds the texture coordinates
            me.GvtArray = [];
            //holds the vert
            me.GvArray = [];
            //holds the faces
            me.GfArray = [];
            //3Darray of coords
            me.matrix = [];
            //final matrix
            me.finalMatrix = [];
            //flag to check if matrix has been created
            me.flag = false;

            //largest ccoordinates
            me.largestX = 0;
            me.largestY = 0;
            me.largestZ = 0;

            me.lowX = 0;
            me.lowY = 0;
            me.lowZ = 0;

            var file = this.element;

            //initializes arrays
            var vnArray: string[] = [];
            var vtArray: string[] = [];
            var vArray: string[] = [];
            var fArray: string[] = [];

        this.reader = new FileReader();
       // var callback = fn;
               this.reader.onload =  function () {
                // console.log("Cameron is wrong test 4",file.name);
                //alert("I'm in");
                // By lines
                var lines = this.result.split('\n');
                //begins reading
                for (var line = 0; line < lines.length; line++) {
                    //alert(lines[line]);
                    //if this line is a normal
                    if (lines[line][0] == "v" && lines[line][1] == "n") {
                        lines[line] = lines[line].substring(3);
                        me.GvnArray.push(lines[line]);
                       // document.getElementById("check").innerHTML = lines[line];
                    }
                    //if this line is a texture coord
                    else if (lines[line][0] == "v" && lines[line][1] == "t") {
                        lines[line] = lines[line].substring(3);
                        me.GvtArray.push(lines[line]);
                       // document.getElementById("check").innerHTML = lines[line];
                    }
                    //if this line is a vert
                    else if (lines[line][0] == "v" && lines[line][1] == " ") {
                        lines[line] = lines[line].substring(2);
                        me.GvArray.push(lines[line]);
                     //   document.getElementById("check").innerHTML = lines[line];
                        me.isBiggest(lines[line]);
                        me.isSmallest(lines[line]);
                        //alert("highest is: " + me.largestX + " lowest is: " + me.lowX);
                    }
                    //if this line is a face
                    else if (lines[line][0] == "f" && lines[line][1] == " ") {
                        lines[line] = lines[line].substring(2);
                        me.GfArray.push(lines[line]);
                      //  document.getElementById("check").innerHTML = lines[line];
                        me.setVertex(lines[line], false);
                    }
                }

                //console.log("Vertexes" , me.GvArray);
                 //console.log("Normals" , me.GvnArray);
                  //console.log("Faces" , me.GfArray);
 //console.log("Cameron is wrong test 1",this.element.name);
             me.buildMatrix();
             me.fillColors(callback);
                me.ready = true;

               // console.log("ready state", this.readyState)
            //    document.getElementById("display").innerHTML = "Wow";
            //    //alert("in " + me.largestX);

            //    var dis = "";
            //    for (var x = 0; x < me.largestX - me.lowX; x++) {
            //        dis += "<table>";
            //        for (var y = 0; y < me.largestY - me.lowY; y++) {
            //            dis += "<tr>";
            //            for (var z = 0; z < me.largestZ - me.lowZ; z++) {
            //                var col = "blue";
            //                if (!me.finalMatrix[x][y][z] || me.finalMatrix[x][y][z] == "0")
            //                    col = "red";
            //                dis += "<td style='width:50px;height:50px;border:5px;background-color:" + col + ";'></td>";
            //            }
            //            dis += "</tr>";
            //        }
            //        dis += "</table></br>";
            //    }
            //    alert(dis);
            //    document.getElementById("display").innerHTML = dis;
            //};
            //reader.readAsText(file);
           
           // callback.returnValue()

          // console.log()
         //  callback(this,other[0],other[1]);
               
           
        }; 
        this.reader.readAsText(file);    
     
}  


getArray(): string[][][] {

    return this.finalMatrix; 
}

getColors() : string[] {
    return this.colorMatrix;
}

/*getFinalMatrix() : string[][][]
{
    var returnArray : string[][][];
    var me = this;
    this.getArray().then(returnArray  => me.finalMatrix);
    return returnArray;
}*/
/*async constructMatrix() : Promise<string[][][]>
{
    await this.loadOBJ();
    return new Promise<string[][][]>(resolve => {
        resolve(this.finalMatrix);
    });
}*/

fillColors(callback : Function)
{
    //console.log("Colors",this.GvtArray[0]);
    //console.log("Colors",this.GvtArray[1]);
    //console.log("Matrix",this.finalMatrix);


 var canvas = document.createElement("canvas");

      if(canvas.getContext)
        {
            var ctx = canvas.getContext('2d');

            var image : HTMLImageElement = new Image();
           
            image.onload = (() => this.imageReady(image,ctx,callback)); 


        }

            image.src = './example-models/1.png';
        
}

imageReady(image : HTMLImageElement,ctx : any,callback : Function)
{
                 var me = this;
                 ctx.drawImage(image, 0, 0,image.width,image.height);

                 for(var c=0;c<me.GvtArray.length;c++)
                    {
                        var color : string = null;
                        var UV = me.GvtArray[c].split(" ");
                        var imgData = ctx.getImageData(image.width*parseFloat(UV[0]),image.height*parseFloat(UV[1]),1,1).data;

                        color = rgbToHex(imgData[0],imgData[1],imgData[2]);
                        me.colorMatrix[c] = color;
                    }
                for(var x=0;x<me.finalMatrix.length;x++)
                {
                    for(var y=0;y<me.finalMatrix[x].length;y++)
                    {
                        for(var z=0;z<me.finalMatrix[x][y].length;z++)
                        {
                            var color : string = null;

                            var colorIndex = me.finalMatrix[x][y][z]
                            if(colorIndex != "")
                                {
                                    console.log("index",x,y,z,colorIndex);
                            var color = me.colorMatrix[parseInt(colorIndex)-1];
                         //   var u : number = parseFloat(colors[0]);
                         //   var v : number = parseFloat(colors[1]);
                         //   console.log("u",u,"v",v);
                         //   var imgData = ctx.getImageData(image.width*u,image.height*v,1,1).data;

                         //   color = me.rgbToHex(imgData[0],imgData[1],imgData[2]);

                         //   console.log("Color",x,y,z,color);

                            me.finalMatrix[x][y][z] = color;
                                }
                        else{
                            me.finalMatrix[x][y][z] = null;
                        }
                 //   me.theArray.push(color);
                        }
                    }
                }

                // console.log("Matrix",me.finalMatrix);
                 //other.push(me.colorMatrix);

                  callback();
}



    setVertex(line: string[], skip: boolean): void {
        //alert("In setVertex " + line);

        //declaring variables to hold coors, normals and textures
        var v1: string = "";
        var t1: string = "";
        var n1: string = "";
        var v2: string = "";
        var t2: string = "";
        var n2: string = "";
        var v3: string = "";
        var t3: string = "";
        var n3: string = "";

            var tempArray1: string[][];

            var count: number = 0;

            //getting the first vertex and texture [x/x/x] x/x/x x/x/x
            while (line[count] != " ") {
                while (line[count] != "/") {
                    v1 += line[count];
                    //alert("v1 success " + v1);
                    count++;
                }
                count++;
                while (line[count] != "/") {
                    t1 += line[count];
                    //alert("t1 success");
                    count++;
                }
                count++;
                while (line[count] != " ") {
                    n1 += line[count];
                    count++;
                }
            }
            count++;

            //getting the second vertex and texture x/x/x [x/x/x] x/x/x
            while (line[count] != " ") {
                while (line[count] != "/") {
                    v2 += line[count];
                    //alert("v2 success");
                    count++;
                }
                count++;
                while (line[count] != "/") {
                    t2 += line[count];
                    //alert("t2 success");
                    count++;
                }
                count++;
                while (line[count] != " ") {
                    n2 += line[count];
                    count++;
                }
            }
            count++;

            //getting the third vertex and texture x/x/x x/x/x [x/x/x]
            while (count != line.length) {
                while (line[count] != "/") {
                    v3 += line[count];
                    //alert("v3 success");
                    count++;
                }
                count++;
                while (line[count] != "/") {
                    t3 += line[count];
                    //alert("t3 success");
                    count++;
                }
                count++;
                while (count != line.length) {
                    n3 += line[count];
                    count++;
                }
            }


            //alert("verts = " + v1 + " " + t1 + " " + v2 + " " + t2 + " " + v3 + " " + t3);

            //declaring x/y/z coords for all three points
        var x1: string = "";
        var y1: string = "";
        var z1: string = "";

        var x2: string = "";
        var y2: string = "";
        var z2: string = "";

        var x3: string = "";
        var y3: string = "";
        var z3: string = "";

        var temp: string[] = [];

            //setting first coord points
        temp = this.GvArray[+v1 - 1].split(' ');

        x1 = temp[0];
        y1 = temp[1];
        z1 = temp[2];


            //setting second coord points
        temp = this.GvArray[+v2 - 1].split(' ');
            
        x2 = temp[0];
        y2 = temp[1];
        z2 = temp[2];

            //setting third coord points
        temp = this.GvArray[+v3 - 1].split(' ');

        x3 = temp[0];
        y3 = temp[1];
        z3 = temp[2];

        //converting x coords from string to rounded int
        var X1: number = Math.round(+x1) - this.lowX;
        var X2: number = Math.round(+x2) - this.lowX;
        var X3: number = Math.round(+x3) - this.lowX;
        //converting y coords from string to rounded int
        var Y1: number = Math.round(+y1) - this.lowY;
        var Y2: number = Math.round(+y2) - this.lowY;
        var Y3: number = Math.round(+y3) - this.lowY;
        //converting z coords from string to rounded int
        var Z1: number = Math.round(+z1) - this.lowZ;
        var Z2: number = Math.round(+z2) - this.lowZ;
        var Z3: number = Math.round(+z3) - this.lowZ;

        var isGood = 0;

        //setting largest and smallest coords for this vertex
        var largX: number = this.isBiggest2(X1, X2, X3);          
        var largY: number = this.isBiggest2(Y1, Y2, Y3);          
        var largZ: number = this.isBiggest2(Z1, Z2, Z3);  
        
        var lowestX: number = this.isLowest2(X1, X2, X3);
        var lowestY: number = this.isLowest2(Y1, Y2, Y3);
        var lowestZ: number = this.isLowest2(Z1, Z2, Z3);   

        //alert("Largest is: " + largZ)
        this.matrix.push(new face(largX, largY, largZ, lowestX, lowestY, lowestZ, t1, this.getNormals((+n1 - 1)))); 

        var xArray: number[] = [X1, X2, X3];
        var yArray: number[] = [Y1, Y2, Y3];
        var zArray: number[] = [Z1, Z2, Z3];
        this.addCoords(this.matrix[this.matrix.length - 1], xArray, yArray, zArray);
        //this.matrix[this.matrix.length-1].display();     
    }

    addCoords(obj: face, xArray: number[], yArray: number[], zArray: number[]): void {
        //if x doesn't change
        //console.log("addCoords: ", xArray, yArray, zArray);
        if (obj.normal == "+/0/0" || obj.normal == "-/0/0") {
            //if Array[2] if the right angle
            if (zArray[0] != zArray[1] && yArray[0] != yArray[1]) {
                obj.z1 = zArray[0];
                obj.z2 = zArray[1];
                obj.y1 = yArray[0];
                obj.y2 = yArray[1];
                obj.x1 = xArray[0];
                obj.x2 = xArray[1];
                obj.zo = zArray[2];
                obj.yo = yArray[2];
                obj.xo = xArray[2];
            }
            //if Array[1] if the right angle
            if (zArray[0] != zArray[2] && yArray[0] != yArray[2]) {
                obj.z1 = zArray[0];
                obj.z2 = zArray[2];
                obj.y1 = yArray[0];
                obj.y2 = yArray[2];
                obj.x1 = xArray[0];
                obj.x2 = xArray[2];
                obj.zo = zArray[1];
                obj.yo = yArray[1];
                obj.xo = xArray[1];
            }
            //if Array[0] if the right angle
            if (zArray[2] != zArray[1] && yArray[2] != yArray[1]) {
                obj.z1 = zArray[2];
                obj.z2 = zArray[1];
                obj.y1 = yArray[2];
                obj.y2 = yArray[1];
                obj.x1 = xArray[2];
                obj.x2 = xArray[1];
                obj.zo = zArray[0];
                obj.yo = yArray[0];
                obj.xo = xArray[0];
            }
            //setting angle code
            if (obj.y1 > obj.yo || obj.y2 > obj.yo)
                obj.yAngle = "+";
            if (obj.z1 > obj.zo || obj.z2 > obj.zo)
                obj.zAngle = "+";
            if (obj.y1 < obj.yo || obj.y2 < obj.yo)
                obj.yAngle = "-";
            if (obj.z1 < obj.zo || obj.z2 < obj.zo)
                obj.zAngle = "-";
            if (obj.x1 < obj.xo || obj.x2 < obj.xo)
                obj.xAngle = "-";
            if (obj.x1 > obj.xo || obj.x2 > obj.xo)
                obj.xAngle = "-";
        }

        //if y doesn't change
        if (obj.normal == "0/+/0" || obj.normal == "0/-/0") {
            //if Array[2] if the right angle
            if (zArray[0] != zArray[1] && xArray[0] != xArray[1]) {
                obj.x1 = xArray[0];
                obj.x2 = xArray[1];
                obj.z1 = zArray[0];
                obj.z2 = zArray[1];
                obj.y1 = yArray[0];
                obj.y2 = yArray[1];
                obj.zo = zArray[2];
                obj.xo = xArray[2];
                obj.yo = yArray[2];
            }
            //if Array[1] if the right angle
            if (zArray[0] != zArray[2] && xArray[0] != xArray[2]) {
                obj.x1 = xArray[0];
                obj.x2 = xArray[2];
                obj.z1 = zArray[0];
                obj.z2 = zArray[2];
                obj.y1 = yArray[0];
                obj.y2 = yArray[2];
                obj.zo = zArray[1];
                obj.xo = xArray[1];
                obj.yo = yArray[1];
            }
            //if Array[0] if the right angle
            if (zArray[2] != zArray[1] && xArray[2] != xArray[1]) {
                obj.x1 = xArray[2];
                obj.x2 = xArray[1];
                obj.z1 = zArray[2];
                obj.z2 = zArray[1];
                obj.y1 = yArray[2];
                obj.y2 = yArray[1];
                obj.zo = zArray[0];
                obj.xo = xArray[0];
                obj.yo = yArray[0];
            }
            //setting angle code
            if (obj.x1 > obj.xo || obj.x2 > obj.xo)
                obj.xAngle = "+";
            if (obj.z1 > obj.zo || obj.z2 > obj.zo)
                obj.zAngle = "+";
            if (obj.x1 < obj.xo || obj.x2 < obj.xo)
                obj.xAngle = "-";
            if (obj.z1 < obj.zo || obj.z2 < obj.zo)
                obj.zAngle = "-";
            if (obj.y1 > obj.yo || obj.y2 > obj.yo)
                obj.yAngle = "+";
            if (obj.y1 < obj.yo || obj.y2 < obj.yo)
                obj.yAngle = "-";
        }

        //if z doesn't change
        if (obj.normal == "0/0/+" || obj.normal == "0/0/-") {
            //if Array[2] if the right angle
            if (yArray[0] != yArray[1] && xArray[0] != xArray[1]) {
                obj.x1 = xArray[0];
                obj.x2 = xArray[1];
                obj.y1 = yArray[0];
                obj.y2 = yArray[1];
                obj.z1 = zArray[0];
                obj.z2 = zArray[1];
                obj.yo = yArray[2];
                obj.xo = xArray[2];
                obj.zo = zArray[2];
            }
            //if Array[1] if the right angle
            if (yArray[0] != yArray[2] && xArray[0] != xArray[2]) {
                obj.x1 = xArray[0];
                obj.x2 = xArray[2];
                obj.y1 = yArray[0];
                obj.y2 = yArray[2];
                obj.z1 = zArray[0];
                obj.z2 = zArray[2];
                obj.yo = yArray[1];
                obj.xo = xArray[1];
                obj.zo = zArray[1];
            }
            //if Array[0] if the right angle
            if (yArray[2] != yArray[1] && xArray[2] != xArray[1]) {
                obj.x1 = xArray[2];
                obj.x2 = xArray[1];
                obj.y1 = yArray[2];
                obj.y2 = yArray[1];
                obj.z1 = zArray[2];
                obj.z2 = zArray[1];
                obj.yo = yArray[0];
                obj.xo = xArray[0];
                obj.zo = zArray[0];
            }
            //setting angle code
            if (obj.y1 > obj.yo || obj.y2 > obj.yo)
                obj.yAngle = "+";
            if (obj.x1 > obj.xo || obj.x2 > obj.xo)
                obj.xAngle = "+";
            if (obj.y1 < obj.yo || obj.y2 < obj.yo)
                obj.yAngle = "-";
            if (obj.x1 < obj.xo || obj.x2 < obj.xo)
                obj.xAngle = "-";
            if (obj.z1 > obj.zo || obj.z2 > obj.zo)
                obj.zAngle = "+";
            if (obj.z1 < obj.zo || obj.z2 < obj.zo)
                obj.zAngle = "-";
        }
    }

    isLowest2(num1: number, num2: number, num3: number): number {
        //find lowest of num1, num2 and num3
        var tempLowest: number = num1;
        if (num2 < tempLowest)
            tempLowest = num2;
        if (num3 < tempLowest)
            tempLowest = num3;
        return tempLowest;
    }

    isBiggest2(num1: number, num2: number, num3: number): number {
        //find highest of num1, num2 and num3
        var tempHighest: number = num1;
        if (num2 > tempHighest)
            tempHighest = num2;
        if (num3 > tempHighest)
            tempHighest = num3;
        return tempHighest;
    }

    getNormals(which: number): string {
        //console.log(which);
        var temp: string[] = this.GvnArray[which].split(" ");
        //alert(temp[0] + "  " + temp[1] + "  " + temp[2]);
        var result = "";

        if (+temp[0] > 0) {
            result += "+/";
        }
        if (+temp[0] < 0) {
            result += "-/";
        }
        if (+temp[0] == 0) {
            result += "0/";
        }
        if (+temp[1] > 0) {
            result += "+/";
        }
        if (+temp[1] < 0) {
            result += "-/";
        }
        if (+temp[1] == 0) {
            result += "0/";
        }
        if (+temp[2] > 0) {
            result += "+";
        }
        if (+temp[2] < 0) {
            result += "-";
        }
        if (+temp[2] == 0) {
            result += "0";
        }

        return result;
    }

    isBiggest(line: string[]): void {

        var count = 0;
        //temp arrays to hold number strings

        var tempX: string = "";
        var tempY: string = "";
        var tempZ: string = "";

        //fetching temp x value
        while (line[count] != " ") {
            tempX += line[count];
            //alert("tempX = " + +tempX);
            count++;
        }
        count++;
        //fetching temp y value
        while (line[count] != " ") {
            tempY += line[count];
            //alert("tempY = " + +tempY);
            count++;
        }
        count++;
        //fetching temp z value
        while (count != line.length) {
            tempZ += line[count];
            //alert("tempZ = " + +tempZ);
            count++;
        }

        //checking if co-cordinates are larger than current largest
        if (Math.round(+tempX) > this.largestX) {
            //alert("Setting X from " + this.largestX + " to " + +tempX);
            this.largestX = Math.round(+tempX);
            //alert("this.largestX is now " + this.largestX);
        }
        if (Math.round(+tempY) > this.largestY) {
            //alert("Setting Y from " + this.largestY + " to " + +tempY);
            this.largestY = Math.round(+tempY);
            //alert("this.largestY is now " + this.largestY);
        }
        if (Math.round(+tempZ) > this.largestZ) {
            //alert("Setting Z from " + this.largestZ + " to " + +tempZ);
            this.largestZ = Math.round(+tempZ);
            //alert("this.largestZ is now " + this.largestZ);
        }

        //alert("Current temp xyz = " + +tempX + " " + +tempY + " " + +tempZ + " ");
        //alert("Current xyz = " + this.largestX + " " + this.largestY + " " + this.largestZ + " ");
    }

    isSmallest(line: string[]): void {

        var count = 0;
        //temp arrays to hold number strings
        var tempX: string = "";
        var tempY: string = "";
        var tempZ: string = "";

        //fetching temp x value
        while (line[count] != " ") {
            tempX += line[count];
            //alert("tempX = " + +tempX);
            count++;
        }
        count++;
        //fetching temp y value
        while (line[count] != " ") {
            tempY += line[count];
            //alert("tempY = " + +tempY);
            count++;
        }
        count++;
        //fetching temp z value
        while (count != line.length) {
            tempZ += line[count];
            //alert("tempZ = " + +tempZ);
            count++;
        }

        //checking if co-cordinates are larger than current largest
        if (Math.round(+tempX) < this.lowX) {
            //alert("Setting X from " + this.lowX + " to " + +tempX);
            this.lowX = Math.round(+tempX);
            //alert("this.lowX is now " + this.lowtX);
        }
        if (Math.round(+tempY) < this.lowY) {
            //alert("Setting Y from " + this.lowY + " to " + +tempY);
            this.lowY = Math.round(+tempY);
            //alert("this.largestY is now " + this.lowY);
        }
        if (Math.round(+tempZ) < this.lowZ) {
            //alert("Setting Z from " + this.lowZ + " to " + +tempZ);
            this.lowZ = Math.round(+tempZ);
            //alert("this.lowZ is now " + this.lowZ);
        }

        if (this.lowX >= 0)
            this.lowX = 0;
        if (this.lowY >= 0)
            this.lowY = 0;
        if (this.lowZ >= 0)
            this.lowZ = 0;

        //alert("Current temp xyz = " + +tempX + " " + +tempY + " " + +tempZ + " ");
        //alert("Current xyz = " + this.largestX + " " + this.largestY + " " + this.largestZ + " ");
    }

    buildMatrix(): void {
        //alert("in buildMatrix");

         console.log("Cameron is wrong test 2",this.element.name,this.finalMatrix);

        //alert("After matrixChecker");
        var isThere: boolean[] = [false, false, false, false, false, false, false, false];
        var put: boolean = true;
        var enter: number = 0;

        for (var x: number = 0; x < this.largestX - this.lowX; x++) {//setting first layer
            this.finalMatrix[x] = [];
            //alert("first layer success");
            for (var y: number = 0; y < this.largestY - this.lowY; y++) {//setting second layer
                this.finalMatrix[x][y] = [];
                for (var z: number = 0; z < this.largestZ - this.lowZ; z++) {//setting third layer
                    this.finalMatrix[x][y][z] = "";
                }//end third layer
            }//end second layer
        }//end third layer

        //for (var x = 0; x <= this.largestX - this.lowZ; x++)
        //    alert("Exists " + short[x]);

        //document.getElementById("display").innerHTML = "Wow";

        //var dis = "";
        //for (var x = 0; x <= this.largestX - this.lowX; x++) {
        //    dis += "<table>";
        //    for (var y = 0; y <= this.largestY - this.lowY; y++) {
        //        dis += "<tr>";
        //        for (var z = 0; z <= this.largestZ - this.lowZ; z++) {
        //            var col = "blue";
        //            if (short[x][y][z] == "")
        //                col = "red";
        //            dis += "<td style='width:50px;height:50px;color:black;border:5px;background-color:" + col + ";'>" + this.matrix[x][y][z] + "</td>";
        //        }
        //        dis += "</tr>";
        //    }
        //    dis += "</table></br>";
        //}
        //alert(dis);
        //document.getElementById("display").innerHTML = dis;

        //alert("I'm here large " + this.largestX + " " + this.largestY + " " + this.largestZ + " ");
        //alert("I'm here small " + this.lowX + " " + this.lowY + " " + this.lowZ + " ");

        for (var i: number = 0; i < this.matrix.length; i++) {
            this.add(this.matrix[i]);
        }  
        
        console.log("Cameron is wrong test 3",this.element.name,this.finalMatrix);
    }   

    add(faceObj: face): void {
        //adding a single face
        //faceObj.display();

        var realX: number = faceObj.maxX - faceObj.lowX;
        var realY: number = faceObj.maxY - faceObj.lowY;
        var realZ: number = faceObj.maxZ - faceObj.lowZ;
        var count = 0;

        //if x doesnt change
        if (faceObj.normal == "-/0/0" || faceObj.normal == "+/0/0") {
            //console.log("In one.one");
            var m: number = (faceObj.y1 - faceObj.y2) / (faceObj.z1 - faceObj.z2);
            var tempMin: number = faceObj.lowZ;
            var tempMax: number = faceObj.maxZ;
            var c: number = faceObj.y1 - (m * faceObj.z1);
            for (var z: number = tempMin; z < tempMax; z++) {
                //console.log("In one");
                var line: number = ((m * (faceObj.lowZ + count)) + c);
                if (line % 1 != 0)
                    line = Math.round(line + 0.5);

                if (faceObj.yAngle == "+") {
                    this.putIn(faceObj.yo, line, faceObj.normal, faceObj.color, z, faceObj.xo, faceObj);
                }
                if (faceObj.yAngle == "-") {
                    this.putIn(line, faceObj.yo, faceObj.normal, faceObj.color, z, faceObj.xo, faceObj);
                }
                count++;
            }
        }
        //if y doesnt change
        if (faceObj.normal == "0/+/0" || faceObj.normal == "0/-/0") {
            var m: number = (faceObj.z1 - faceObj.z2) / (faceObj.x1 - faceObj.x2);
            //alert("m = " + m);
            var c: number = faceObj.z1 - (m * faceObj.x1);
            for (var x: number = faceObj.lowX; x < faceObj.maxX; x++) {
                //console.log("In two");
                var line: number = ((m * (faceObj.lowX + count)) + c);
                if (line % 1 != 0)
                    line = Math.round(line + 0.5);

                if (faceObj.zAngle == "+") {
                    this.putIn(faceObj.zo, line, faceObj.normal, faceObj.color, x, faceObj.yo, faceObj)
                }
                if (faceObj.zAngle == "-") {
                    this.putIn(line, faceObj.zo, faceObj.normal, faceObj.color, x, faceObj.yo, faceObj)
                }
                count++;
            }
        }
        //if z doesnt change
        if (faceObj.normal == "0/0/+" || faceObj.normal == "0/0/-") {
            var m: number = (faceObj.y1 - faceObj.y2) / (faceObj.x1 - faceObj.x2);
            //alert("m = " + m);
            var c: number = faceObj.y1 - (m * faceObj.x1);
            for (var x: number = faceObj.lowX; x < faceObj.maxX; x++) {
                //console.log("In three");
                var line: number = ((m * (faceObj.lowX + count)) + c);
                if (line % 1 != 0)
                    line = Math.round(line + 0.5);

                if (faceObj.xAngle == "+") {
                    this.putIn(faceObj.yo, line, faceObj.normal, faceObj.color, x, faceObj.zo, faceObj);
                }
                if (faceObj.xAngle == "-") {
                    this.putIn(line, faceObj.yo, faceObj.normal, faceObj.color, x, faceObj.zo, faceObj);
                }
                count++;
            }
        }
    }

    putIn(from: number, to: number, normal: string, color: string, currentLevel: number, other: number, faceObj: face): void {
        console.log("In put in: " + from + " to " + to);
        if (normal == "+/0/0") {
            for (var y: number = from; y < to; y++) {
                console.log("Adding " + color + " to " + (other - 1) + "/" + (y) + "/" + currentLevel + "  " + "+/0/0");
                //if (this.finalMatrix[other - 1][currentLevel][z] != null)
                if (this.check(other - 1, y, currentLevel, faceObj))
                    this.finalMatrix[other - 1][y][currentLevel] = color;
            }
        }
        if (normal == "-/0/0") {
            for (var y: number = from; y < to; y++) {
                console.log("Adding " + color + " to " + other + "/" + (y) + "/" + (currentLevel) + "  " + "-/0/0");
                //if (this.finalMatrix[other][currentLevel][z] != null)
                if (this.check(other, y, currentLevel, faceObj))
                    this.finalMatrix[other][y][currentLevel] = color;
            }
        }
        if (normal == "0/+/0") {
            for (var z: number = from; z < to; z++) {
                console.log("Adding " + color + " to " + currentLevel + "/" + (other - 1) + "/" + z + "  " + "0/+/0");
                //if (this.finalMatrix[x][other - 1][currentLevel])
                if (this.check(currentLevel, other - 1, z, faceObj))
                    this.finalMatrix[currentLevel][other - 1][z] = color;
            }
        }
        if (normal == "0/-/0") {
            for (var z: number = from; z < to; z++) {
                console.log("Adding " + color + " to " + currentLevel + "/" + (other) + "/" + z + "  " + "0/-/0");
                //if (this.finalMatrix[x] && this.finalMatrix[x][other] && this.finalMatrix[x][other][currentLevel])
                if (this.check(currentLevel, other, z, faceObj))
                    this.finalMatrix[currentLevel][other][z] = color;
            }
        }
        if (normal == "0/0/+") {
            for (var y: number = from; y < to; y++) {
                console.log("Adding " + color + " to " + currentLevel + "   " + y + "/" + (y) + "/" + (other - 1) + "  " + "0/0/+");
                //if (this.finalMatrix[x] && this.finalMatrix[x][currentLevel] && this.finalMatrix[x][currentLevel][other - 1])
                if (this.check(currentLevel, y, other - 1, faceObj))
                    this.finalMatrix[currentLevel][y][other - 1] = color;
            }
        }
        if (normal == "0/0/-") {
            for (var y: number = from; y < to; y++) {
                console.log("Adding " + color + " to " + y + "   " + currentLevel + "/" + (y) + "/" + other + "  " + "0/0/-  " + (this.largestY - this.lowY));
                //if (this.finalMatrix[x] && this.finalMatrix[x][currentLevel] && this.finalMatrix[x][currentLevel][other])
                if (this.check(currentLevel, y, other, faceObj))
                    this.finalMatrix[currentLevel][y][other] = color;
            }
        }
    }

    check(x: number, y: number, z: number, faceObj: face): boolean {
        if (faceObj.maxX == faceObj.lowX) {
            console.log("Equal X");
        }
        else if (x < faceObj.lowX || x >= faceObj.maxX) {
            console.log("failed in x: " + x + " maxe= " + faceObj.maxX + " min= " + faceObj.lowX);
            return false;
        }
        if (faceObj.maxY == faceObj.lowY) {
            console.log("Equal Y");
        }
        else if (y < faceObj.lowY || y >= faceObj.maxY) {
            console.log("failed in y: " + y + " maxe= " + faceObj.maxY + " min= " + faceObj.lowY);
            return false;
        }
        if (faceObj.maxZ == faceObj.lowZ) {
            console.log("Equal Z");
        }
        else if (z < faceObj.lowZ || z >= faceObj.maxZ) {
            console.log("failed in z: " + z + " maxe= " + faceObj.maxZ + " min= " + faceObj.lowZ);
            return false;
        }

        return true;
    }
}



class face {
    //highest and lowest coords
    public maxX: number = 0;
    public maxY: number = 0;
    public maxZ: number = 0;

    public lowX: number = 0;
    public lowY: number = 0;
    public lowZ: number = 0;
    
    //non-right angle coords
    public x1: number = 0;
    public y1: number = 0;
    public z1: number = 0;
    public x2: number = 0;
    public y2: number = 0;
    public z2: number = 0;

    //right angle coords
    public xo: number = 0;
    public yo: number = 0;
    public zo: number = 0;

    public color: string = "";

    public normal: string = "";

    public xAngle: string = "";
    public yAngle: string = "";
    public zAngle: string = "";

    constructor(mX:number , mY:number , mZ:number , lX:number , lY:number , lZ:number , c:string, n:string) {
        this.maxX = mX;
        this.maxY = mY;
        this.maxZ = mZ;

        this.lowX = lX;
        this.lowY = lY;
        this.lowZ = lZ;

        this.color = c;

        this.normal = n;
    }

    display(): void {
        console.log(this.maxX + "/" + this.maxY + "/" + this.maxZ + "   " + this.lowX + "/" + this.lowY + "/" + this.lowZ + "   " + this.color + "    " + this.normal + " angle: " + this.xAngle + "/" + this.yAngle + "/" + this.zAngle);
        console.log(this.x1 + "/" + this.x2 + "/" + this.xo + "   " + this.y1 + "/" + this.y2 + "/" + this.yo + "   " + this.z1 + "/" + this.z2 + "/" + this.zo);
    }
}
