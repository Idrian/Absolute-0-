class fileReader {
    element: HTMLElement;

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
    //flag to check if matrix has been created
    flag: boolean = false;
    //used to hold colorMatrix
    colorMatrix: string[][] = [];

    //largest ccoordinates
    largestX: number = 0;
    largestY: number = 0;
    largestZ: number = 0;

    lowX: number = 0;
    lowY: number = 0;
    lowZ: number = 0;

    //called immediately
    constructor(element: HTMLElement) {
        this.element = element;
        var me = this;

        //used to upload a file, temp solution to file retrieval
        this.element.innerHTML += "<input type='file' id='thisFile'></input></br>";
        this.element.innerHTML += "<div style='color:blue' id='check'>hello</div>";
        this.element.innerHTML += "<div style='color:blue' id='display'>Bang</div>";

        //function gets called when file is uploaded
        document.getElementById("thisFile").onchange = function () {

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

            var file = this.files[0];

            //initializes arrays
            var vnArray: string[] = [];
            var vtArray: string[] = [];
            var vArray: string[] = [];
            var fArray: string[] = [];

            //opens file
            var reader = new FileReader();
            reader.onload = function (progressEvent) {
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
                        document.getElementById("check").innerHTML = lines[line];
                    }
                    //if this line is a texture coord
                    else if (lines[line][0] == "v" && lines[line][1] == "t") {
                        lines[line] = lines[line].substring(3);
                        me.GvtArray.push(lines[line]);
                        document.getElementById("check").innerHTML = lines[line];
                    }
                    //if this line is a vert
                    else if (lines[line][0] == "v" && lines[line][1] == " ") {
                        lines[line] = lines[line].substring(2);
                        me.GvArray.push(lines[line]);
                        document.getElementById("check").innerHTML = lines[line];
                        me.isBiggest(lines[line]);
                        me.isSmallest(lines[line]);
                        //alert("highest is: " + me.largestX + " lowest is: " + me.lowX);
                    }
                    //if this line is a face
                    else if (lines[line][0] == "f" && lines[line][1] == " ") {
                        lines[line] = lines[line].substring(2);
                        me.GfArray.push(lines[line]);
                        document.getElementById("check").innerHTML = lines[line];
                        me.setVertex(lines[line], false);
                    }
                }

                //displays output, for testing only, can remove
                //alert(me.GvnArray);
                //alert(me.GvtArray);
                //alert(me.GvArray);
                //alert(me.GfArray);
                //alert("LargextX = " + me.largestX + " lowX = " + me.lowX);
                //alert("LargextY = " + me.largestY + " lowY = " + me.lowY);
                //alert("LargextZ = " + me.largestZ + " lowZ = " + me.lowZ);

                //for (var x = 0; x < me.largestX; x++)
                //    alert(me.matrix[x]);
                //alert("in before " + me.largestZ);
                me.buildMatrix();
                document.getElementById("display").innerHTML = "Wow";
                //alert("in " + me.largestX);

                var dis = "";
                for (var x = 0; x < me.largestX - me.lowX; x++) {
                    dis += "<table>";
                    for (var y = 0; y < me.largestY - me.lowY; y++) {
                        dis += "<tr>";
                        for (var z = 0; z < me.largestZ - me.lowZ; z++) {
                            var col = "blue";
                            if (!me.finalMatrix[x][y][z] || me.finalMatrix[x][y][z] == "0")
                                col = "red";
                            dis += "<td style='width:50px;height:50px;border:5px;background-color:" + col + ";'></td>";
                        }
                        dis += "</tr>";
                    }
                    dis += "</table></br>";
                }
                alert(dis);
                document.getElementById("display").innerHTML = dis;
            };
            reader.readAsText(file);
        };
    }

    setVertex(line, skip): void {
        //alert("In setVertex " + line);

            //declaring variables to hold coors and textures
        var v1: string[] = [];
        var t1: string[] = [];
        var n1: string[] = [];
        var v2: string[] = [];
        var t2: string[] = [];
        var n2: string[] = [];
        var v3: string[] = [];
        var t3: string[] = [];
        var n3: string[] = [];

            var tempArray1: string[][];
            var tempArray2 = new Array(2);

            var count = 0;

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
            var x1: string[] = [];
            var y1: string[] = [];
            var z1: string[] = [];

            var x2: string[] = [];
            var y2: string[] = [];
            var z2: string[] = [];

            var x3: string[] = [];
            var y3: string[] = [];
            var z3: string[] = [];

            var temp;

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

        var X1 = Math.round(+x1) - this.lowX;
        var X2 = Math.round(+x2) - this.lowX;
        var X3 = Math.round(+x3) - this.lowX;

        var Y1 = Math.round(+y1) - this.lowY;
        var Y2 = Math.round(+y2) - this.lowY;
        var Y3 = Math.round(+y3) - this.lowY;

        var Z1 = Math.round(+z1) - this.lowZ;
        var Z2 = Math.round(+z2) - this.lowZ;
        var Z3 = Math.round(+z3) - this.lowZ;

        var isGood = 0;

        //alert("Z1 is: " + Z1 + "/" + Z2 + "/" + Z3);

        var largX = this.isBiggest2(X1, X2, X3);          
        var largY = this.isBiggest2(Y1, Y2, Y3);          
        var largZ = this.isBiggest2(Z1, Z2, Z3);  
        
        var lowestX = this.isLowest2(X1, X2, X3);
        var lowestY = this.isLowest2(Y1, Y2, Y3);
        var lowestZ = this.isLowest2(Z1, Z2, Z3);   

        //alert("Largest is: " + largZ)
        this.matrix.push(new face(largX, largY, largZ, lowestX, lowestY, lowestZ, t1, this.getNormals(+n1 - 1))); 

        var xArray: number[] = [X1, X2, X3];
        var yArray: number[] = [Y1, Y2, Y3];
        var zArray: number[] = [Z1, Z2, Z3];
        this.addCoords(this.matrix[this.matrix.length - 1], xArray, yArray, zArray);
        //this.matrix[this.matrix.length-1].display();     
    }

    addCoords(obj, xArray, yArray, zArray): void {
        //if x doesn't change
        console.log("addCoords: ", xArray, yArray, zArray);
        if (obj.normal == "+/0/0" || obj.normal == "-/0/0") {
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

    isLowest2(num1, num2, num3): number {
        var tempLowest = num1;
        if (num2 < tempLowest)
            tempLowest = num2;
        if (num3 < tempLowest)
            tempLowest = num3;
        return tempLowest;
    }

    isBiggest2(num1, num2, num3): number {
        var tempHighest = num1;
        if (num2 > tempHighest)
            tempHighest = num2;
        if (num3 > tempHighest)
            tempHighest = num3;
        return tempHighest;
    }

    getNormals(which): string {
        //console.log(which);
        var temp = this.GvnArray[which].split(" ");
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

    isBiggest(line): void {

        var count = 0;
        //temp arrays to hold number strings

        var tempX: string[] = [];
        var tempY: string[] = [];
        var tempZ: string[] = [];

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

    isSmallest(line): void {

        var count = 0;
        //temp arrays to hold number strings
        var tempX: string[] = [];
        var tempY: string[] = [];
        var tempZ: string[] = [];

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

        //alert("After matrixChecker");
        var isThere: boolean[] = [false, false, false, false, false, false, false, false];
        var put = true;
        var enter = 0;

        for (var x = 0; x < this.largestX - this.lowX; x++) {//setting first layer
            this.finalMatrix[x] = [];
            //alert("first layer success");
            for (var y = 0; y < this.largestY - this.lowY; y++) {//setting second layer
                this.finalMatrix[x][y] = [];
                for (var z = 0; z < this.largestZ - this.lowZ; z++) {//setting third layer
                    this.finalMatrix[x][y][z] = "0";
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

        alert("I'm here large " + this.largestX + " " + this.largestY + " " + this.largestZ + " ");
        alert("I'm here small " + this.lowX + " " + this.lowY + " " + this.lowZ + " ");

        for (var i = 0; i < this.matrix.length; i++) {
            this.add(this.matrix[i]);
        }   
    }   

    add(faceObj): void {
        faceObj.display();

        var realX = faceObj.maxX - faceObj.lowX;
        var realY = faceObj.maxY - faceObj.lowY;
        var realZ = faceObj.maxZ - faceObj.lowZ;
        var count = 0;

        //if x doesnt change
        if (faceObj.normal == "-/0/0" || faceObj.normal == "+/0/0") {
            console.log("In one.one");
            var m = (faceObj.y1 - faceObj.y2) / (faceObj.z1 - faceObj.z2);
            var tempMin = faceObj.lowZ;
            var tempMax = faceObj.maxZ;
            var c = faceObj.y1 - (m * faceObj.z1);
            for (var z = tempMin; z < tempMax; z++) {
                console.log("In one");
                var line = ((m * (faceObj.lowZ + count)) + c);
                if (line % 1 != 0)
                    line = Math.round(line + 0.5);

                if (faceObj.yAngle == "+") {
                    if (faceObj.normal == "+/0/0")
                        this.putIn(faceObj.yo, line, faceObj.normal, faceObj.color, z, faceObj.xo);
                    else
                        this.putIn(faceObj.yo, line, faceObj.normal, faceObj.color, z, faceObj.xo);
                }
                if (faceObj.yAngle == "-") {
                    if (faceObj.normal == "+/0/0")
                        this.putIn(line, faceObj.yo, faceObj.normal, faceObj.color, z, faceObj.xo);
                    else
                        this.putIn(line, faceObj.yo, faceObj.normal, faceObj.color, z, faceObj.xo);
                }
                count++;
            }
        }
        //if y doesnt change
        if (faceObj.normal == "0/+/0" || faceObj.normal == "0/-/0") {
            var m = (faceObj.z1 - faceObj.z2) / (faceObj.x1 - faceObj.x2);
            //alert("m = " + m);
            var c = faceObj.z1 - (m * faceObj.x1);
            for (var x = faceObj.lowX; x < faceObj.maxX; x++) {
                console.log("In two");
                var line = ((m * (faceObj.lowX + count)) + c);
                if (line % 1 != 0)
                    line = Math.round(line + 0.5);

                if (faceObj.zAngle == "+") {
                    if (faceObj.normal == "0/+/0")
                        this.putIn(faceObj.zo, line, faceObj.normal, faceObj.color, x, faceObj.yo)
                    else
                        this.putIn(faceObj.zo, line, faceObj.normal, faceObj.color, x, faceObj.yo) 
                }
                if (faceObj.zAngle == "-") {
                    if (faceObj.normal == "0/+/0")
                        this.putIn(line, faceObj.zo, faceObj.normal, faceObj.color, x, faceObj.yo)
                    else
                        this.putIn(line, faceObj.zo, faceObj.normal, faceObj.color, x, faceObj.yo)
                }
                count++;
            }
        }
        //if z doesnt change
        if (faceObj.normal == "0/0/+" || faceObj.normal == "0/0/-") {
            var m = (faceObj.y1 - faceObj.y2) / (faceObj.x1 - faceObj.x2);
            //alert("m = " + m);
            var c = faceObj.y1 - (m * faceObj.x1);
            for (var x = faceObj.lowX; x < faceObj.maxX; x++) {
                console.log("In three");
                var line = ((m * (faceObj.lowX + count)) + c);
                if (line % 1 != 0)
                    line = Math.round(line + 0.5);

                if (faceObj.xAngle == "+") {
                    if (faceObj.normal == "0/0/+")
                        this.putIn(faceObj.yo, line, faceObj.normal, faceObj.color, x, faceObj.zo);
                    else
                        this.putIn(faceObj.yo, line, faceObj.normal, faceObj.color, x, faceObj.zo);
                }
                if (faceObj.xAngle == "-") {
                    if (faceObj.normal == "0/0/+")
                        this.putIn(line, faceObj.yo, faceObj.normal, faceObj.color, x, faceObj.zo);
                    else
                        this.putIn(line, faceObj.yo, faceObj.normal, faceObj.color, x, faceObj.zo);
                }
                count++;
            }
        }
    }

    putIn(from, to, normal, color, currentLevel, other): void {
        console.log("In put in: " + from + " to " + to);
        if (normal == "+/0/0") {
            for (var y = from; y < to; y++) {
                console.log("Adding " + color + " to " + (other - 1) + "/" + (y) + "/" + currentLevel);
                //if (this.finalMatrix[other - 1][currentLevel][z] != null)
                this.finalMatrix[other - 1][y][currentLevel] = color;
            }
        }
        if (normal == "-/0/0") {
            for (var y = from; y < to; y++) {
                console.log("Adding " + color + " to " + other + "/" + (y) + "/" + (currentLevel));
                //if (this.finalMatrix[other][currentLevel][z] != null)
                this.finalMatrix[other][y][currentLevel] = color;
            }
        }
        if (normal == "0/+/0") {
            for (var z = from; z < to; z++) {
                console.log("Adding " + color + " to " + currentLevel + "/" + (other - 1) + "/" + z);
                //if (this.finalMatrix[x][other - 1][currentLevel])
                this.finalMatrix[currentLevel][other-1][z] = color;
            }
        }
        if (normal == "0/-/0") {
            for (var z = from; z < to; z++) {
                console.log("Adding " + color + " to " + currentLevel + "/" + (other) + "/" + z);
                //if (this.finalMatrix[x] && this.finalMatrix[x][other] && this.finalMatrix[x][other][currentLevel])
                this.finalMatrix[currentLevel][other][z] = color;
            }
        }
        if (normal == "0/0/+") {
            for (var y = from; y < to; y++) {
                console.log("Adding " + color + " to " + y + "   " + y + "/" + (currentLevel) + "/" + other);
                //if (this.finalMatrix[x] && this.finalMatrix[x][currentLevel] && this.finalMatrix[x][currentLevel][other - 1])
                this.finalMatrix[currentLevel][y][other-1] = color;
            }
        }
        if (normal == "0/0/-") {
            for (var y = from; y < to; y++) {
                console.log("Adding " + color + " to " + y + "   " + y + "/" + (currentLevel) + "/" + other);
                //if (this.finalMatrix[x] && this.finalMatrix[x][currentLevel] && this.finalMatrix[x][currentLevel][other])
                    this.finalMatrix[currentLevel][y][other] = color;
            }
        }
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new fileReader(el);
};

class face {
    public maxX: number = 0;
    public maxY: number = 0;
    public maxZ: number = 0;

    public lowX: number = 0;
    public lowY: number = 0;
    public lowZ: number = 0;

    public x1: number = 0;
    public y1: number = 0;
    public z1: number = 0;
    public x2: number = 0;
    public y2: number = 0;
    public z2: number = 0;

    public xo: number = 0;
    public yo: number = 0;
    public zo: number = 0;

    public color: string = "";

    public normal: string = "";

    public xAngle: string = "";
    public yAngle: string = "";
    public zAngle: string = "";

    constructor(mX, mY, mZ, lX, lY, lZ, c, n) {
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

