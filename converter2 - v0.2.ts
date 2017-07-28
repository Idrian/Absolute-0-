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
    matrix: string[][][] = [];
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

        if (!skip) {
            if (this.flag == false) {
                for (var x = 0; x <= this.largestX - this.lowX; x++) {
                    this.matrix[x] = [];
                    //alert("first layer success");
                    for (var y = 0; y <= this.largestY - this.lowY; y++) {
                        this.matrix[x][y] = [];
                        for (var z = 0; z <= this.largestZ - this.lowZ; z++) {
                            this.matrix[x][y][z] = "";
                        }
                    }
                }
                //alert("changed: " + this.largestX + " " + this.largestY + " " + this.largestZ);
                this.flag = true;
            }

            //declaring variables to hold coors and textures
            var v1: string[] = [];
            var t1: string[] = [];
            var v2: string[] = [];
            var t2: string[] = [];
            var v3: string[] = [];
            var t3: string[] = [];

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

            var count = 0;

            //setting first coord points
            temp = this.GvArray[+v1 - 1].split('');
            while (temp[count] != " ") {
                x1 += temp[count];
                count++;
            }
            count++;
            while (temp[count] != " ") {
                y1 += temp[count];
                count++;
            }
            count++;
            while (count != temp.length) {
                z1 += temp[count];
                count++;
            }

            //setting second coord points
            count = 0;
            temp = this.GvArray[+v2 - 1].split('');
            while (temp[count] != " ") {
                x2 += temp[count];
                count++;
            }
            count++;
            while (temp[count] != " ") {
                y2 += temp[count];
                count++;
            }
            count++;
            while (count != temp.length) {
                z2 += temp[count];
                count++;
            }

            //setting third coord points
            count = 0;
            temp = this.GvArray[+v3 - 1].split('');
            while (temp[count] != " ") {
                x3 += temp[count];
                count++;
            }
            count++;
            while (temp[count] != " ") {
                y3 += temp[count];
                count++;
            }
            count++;
            while (count != temp.length) {
                z3 += temp[count];
                count++;
            }
        }
        else {
            alert("testing: " + line);

            line = line.split('/');
            alert("testing: " + line);

            var x1: string[] = line[0];
            var y1: string[] = line[1];
            var z1: string[] = line[2];

            var x2: string[] = line[3];
            var y2: string[] = line[4];
            var z2: string[] = line[5];

            var x3: string[] = line[6];
            var y3: string[] = line[7];
            var z3: string[] = line[8];

            var temp2: string[] = [];

            var count = 0;

            alert("before" + x1 + "/" + y1 + "/" + z1 + " and " + x2 + "/" + y2 + "/" + z2 + " and " + x3 + "/" + y3 + "/" + z3);
        }
        

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

        var check1 = false;
        var check2 = false;
        var check3 = false;

        //alert("Lowest" + this.lowX + "/" + this.lowY + "/" + this.lowZ)
        //alert("before" + x1 + "/" + y1 + "/" + z1 + " and " + x2 + "/" + y2 + "/" + z2 + " and " + x3 + "/" + y3 + "/" + z3);
        //alert("before" + X1 + "/" + Y1 + "/" + Z1 + " and " + X2 + "/" + Y2 + "/" + Z2 + " and " + X3 + "/" + Y3 + "/" + Z3);

        //if x has multiple inputs
        if (X3 > X2 && X2 == X1) {
            for (var i = X1; i < X3; i++) {
                check1 = this.actualAdd(i, Y1, Z1, i, Y2, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        else if (X3 < X2 && X2 == X1) {
            for (var i = X1; i > X3; i--) {
                check1 = this.actualAdd(i, Y1, Z1, i, Y2, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        //if y has multiple inputs
        else if (Y3 > Y2 && Y2 == Y1) {
            for (var i = Y1; i < Y3; i++) {
                check1 = this.actualAdd(X1, i, Z1, X2, i, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        else if (Y3 < Y2 && Y2 == Y1) {
            for (var i = Y1; i > Y3; i--) {
                check1 = this.actualAdd(X1, i, Z1, X2, i, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        //if Z has multiple inputs
        else if (Z3 > Z2 && Z2 == Z1) {
            for (var i = Z1; i < Z3; i++) {
                check1 = this.actualAdd(X1, Y1, i, X2, Y2, i, this.GvtArray[+t1 - 1]);
            }
        }
        else if (Z3 < Z2 && Z2 == Z1) {
            for (var i = Z1; i > Z3; i--) {
                check1 = this.actualAdd(X1, Y1, i, X2, Y2, i, this.GvtArray[+t1 - 1]);
            }
        }
        else
            check1 = this.actualAdd(X1, Y1, Z1, X2, Y2, Z2, this.GvtArray[+t1 - 1]);
        //isGood += this.actualAdd(Math.round(+x1) - this.lowX, Math.round(+y1) - this.lowY, Math.round(+z1) - this.lowZ, Math.round(+x2) - this.lowX, Math.round(+y2) - this.lowY, Math.round(+z2) - this.lowZ, this.GvtArray[+t1 - 1]);
        //alert("before 1 " + X3 + "/" + Y3 + "/" + Z3 + " and " + X2 + "/" + Y2 + "/" + Z2);

        //if x has multiple inputs
        if (X1 > X2 && X2 == X3) {
            for (var i = X2; i < X1; i++) {
                check2 = this.actualAdd(i, Y3, Z3, i, Y2, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        else if (X1 < X2 && X2 == X3) {
            for (var i = X3; i > X1; i--) {
                check2 = this.actualAdd(i, Y3, Z3, i, Y2, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        //if y has multiple inputs
        else if (Y1 > Y2 && Y2 == Y3) {
            for (var i = Y3; i < Y1; i++) {
                check2 = this.actualAdd(X3, i, Z3, X2, i, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        else if (Y1 < Y2 && Y2 == Y3) {
            for (var i = Y3; i > Y1; i--) {
                check2 = this.actualAdd(X3, i, Z3, X2, i, Z2, this.GvtArray[+t1 - 1]);
            }
        }
        //if Z has multiple inputs
        else if (Z1 > Z2 && Z2 == Z3) {
            for (var i = Z3; i < Z1; i++) {
                check2 = this.actualAdd(X3, Y3, i, X2, Y2, i, this.GvtArray[+t1 - 1]);
            }
        }
        else if (Z1 < Z2 && Z2 == Z3) {
            for (var i = Z3; i > Z1; i--) {
                check2 = this.actualAdd(X3, Y3, i, X2, Y2, i, this.GvtArray[+t1 - 1]);
            }
        }
        else
            check2 = this.actualAdd(X3, Y3, Z3, X2, Y2, Z2, this.GvtArray[+t1 - 1]);
        //isGood += this.actualAdd(Math.round(+x1) - this.lowX, Math.round(+y1) - this.lowY, Math.round(+z1) - this.lowZ, Math.round(+x3) - this.lowX, Math.round(+y3) - this.lowY, Math.round(+z3) - this.lowZ, this.GvtArray[+t3 - 1]);
        //alert("before 2 " + X3 + "/" + Y3 + "/" + Z3 + " and " + X1 + "/" + Y1 + "/" + Z1);

        if (X2 > X1 && X1 == X3) {
            for (var i = X1; i < X2; i++) {
                check3 = this.actualAdd(i, Y3, Z3, i, Y1, Z1, this.GvtArray[+t1 - 1]);
            }
        }
        else if (X2 < X1 && X1 == X3) {
            for (var i = X1; i > X2; i--) {
                check3 = this.actualAdd(i, Y3, Z3, i, Y1, Z1, this.GvtArray[+t1 - 1]);
            }
        }
        //if y has multiple inputs
        else if (Y2 > Y1 && Y1 == Y3) {
            for (var i = Y3; i < Y2; i++) {
                check3 = this.actualAdd(X3, i, Z3, X1, i, Z1, this.GvtArray[+t1 - 1]);
            }
        }
        else if (Y2 < Y1 && Y1 == Y3) {
            for (var i = Y3; i > Y2; i--) {
                check3 = this.actualAdd(X3, i, Z3, X1, i, Z1, this.GvtArray[+t1 - 1]);
            }
        }
        //if Z has multiple inputs
        else if (Z2 > Z1 && Z1 == Z3) {
            for (var i = Z3; i < Z2; i++) {
                check3 = this.actualAdd(X3, Y3, i, X1, Y1, i, this.GvtArray[+t1 - 1]);
            }
        }
        else if (Z2 < Z1 && Z1 == Z3) {
            for (var i = Z3; i > Z2; i--) {
                check3 = this.actualAdd(X3, Y3, i, X1, Y1, i, this.GvtArray[+t1 - 1]);
            }
        }
        else
            check3 = this.actualAdd(X3, Y3, Z3, X1, Y1, Z1, this.GvtArray[+t1 - 1]);
        //isGood += this.actualAdd(Math.round(+x3) - this.lowX, Math.round(+y3) - this.lowY, Math.round(+z3) - this.lowZ, Math.round(+x2) - this.lowX, Math.round(+y2) - this.lowY, Math.round(+z2) - this.lowZ, this.GvtArray[+t2 - 1]);

        //alert("before 3: x1 = " + x1 + " x2 = " + x2 + " x3 = " + x3 + " y1 = " + y1 + " y2 = " + y2 + " y3 = " + y3 + " z1 = " + z1 + " z2 = " + z2 + " z3 = " + z3);
        if (!check1) {
            this.stupidityCatcher(x2, y2, z2, x3, y3, z3, x1, y1, z1, t2);
        }
        if (!check2) {
            this.stupidityCatcher(x3, y3, z3, x2, y2, z2, x1, y1, z1, t3);
        }
        if (!check3) {
            this.stupidityCatcher(x1, y1, z1, x3, y3, z3, x2, y2, z2, t1);
        }
    }

    stupidityCatcher(x1, y1, z1, x2, y2, z2, ox, oy, oz, t): void {
        //alert("alert: " + ox + "/" + oy + "/" + oz);
        var goOn = false;
        var result = "";

        if (x1 != x2 && x1 != ox && ox != x2)
            goOn = true;
        if (y1 != y2 && y1 != oy && oy != y2)
            goOn = true;
        if (z1 != z2 && z1 != oz && oz != z2)
            goOn = true;

        if (goOn == false)
            return;

        if (x1 == x2 && x1 == ox && ox == x2) {
            if (y1 == oy) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + y2 + "/" + z1;
                this.setVertex(result, true);
                return;
            }
            if (y2 == oy) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x1 + "/" + y1 + "/" + z2;
                this.setVertex(result, true);
                return;
            }
            if (z1 == oz) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + y1 + "/" + z2;
                this.setVertex(result, true);
                return;
            }
            if (z2 == oz) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x1 + "/" + y2 + "/" + z1;
                this.setVertex(result, true);
                return;
            }
        }
        if (y1 == y2 && y1 == oy && oy == y2) {
            if (x1 == ox) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + y2 + "/" + z1;
                this.setVertex(result, true);
                return;
            }
            if (x2 == ox) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x1 + "/" + y1 + "/" + z2;
                this.setVertex(result, true);
                return;
            }
            if (z1 == oz) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + y2 + "/" + z1;
                this.setVertex(result, true);
                return;
            }
            if (z2 == oz) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x1 + "/" + y1 + "/" + z2;
                this.setVertex(result, true);
                return;
            }
        }
        if (z1 == z2 && z1 == oz && oz == z2) {
            if (x1 == ox) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + y1 + "/" + z2;
                this.setVertex(result, true); 
                return;
            }
            if (x2 == ox) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x1 + "/" + y2 + "/" + z1;
                this.setVertex(result, true);
                return;
            }
            if (y1 == oy) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x1 + "/" + y2 + "/" + z2;
                this.setVertex(result, true);
                return;
            }
            if (y2 == oy) {
                result = x1 + "/" + y1 + "/" + z1 + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + y1 + "/" + z1;
                this.setVertex(result, true);
                return;
            }
        }

        //abnormal triangle 2
        if (ox == x1 && ox == x2 && oy != y1 && oy != y2 && oz != z1 && oz != z2) {
            if (y1 == y2) {
                result = ox + "/" + oy + "/" + oz + "/" + x1 + "/" + y1 + "/" + z1 + "/" + ox + "/" + y1 + "/" + oz;
                this.setVertex(result, true);
                result = ox + "/" + oy + "/" + oz + "/" + x2 + "/" + y2 + "/" + z2 + "/" + ox + "/" + y2 + "/" + oz;
                this.setVertex(result, true);
                return;
            }
            if (z1 == z2) {
                result = ox + "/" + oy + "/" + oz + "/" + x1 + "/" + y1 + "/" + z1 + "/" + ox + "/" + oy + "/" + z1;
                this.setVertex(result, true);
                result = ox + "/" + oy + "/" + oz + "/" + x2 + "/" + y2 + "/" + z2 + "/" + ox + "/" + oy + "/" + z2;
                this.setVertex(result, true);
                return;
            }
        }
        if (oy == y1 && oy == y2 && ox != x1 && ox != x2 && oz != z1 && oz != z2) {
            if (x1 == x2) {
                result = ox + "/" + oy + "/" + oz + "/" + x1 + "/" + y1 + "/" + z1 + "/" + x1 + "/" + oy + "/" + oz;
                this.setVertex(result, true);
                result = ox + "/" + oy + "/" + oz + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + oy + "/" + oz;
                this.setVertex(result, true);
                return;
            }
            if (z1 == z2) {
                result = ox + "/" + oy + "/" + oz + "/" + x1 + "/" + y1 + "/" + z1 + "/" + ox + "/" + oy + "/" + z1;
                this.setVertex(result, true);
                result = ox + "/" + oy + "/" + oz + "/" + x2 + "/" + y2 + "/" + z2 + "/" + ox + "/" + oy + "/" + z2;
                this.setVertex(result, true);
                return;
            }
        }
        if (oz == z1 && oz == z2 && oy != y1 && oy != y2 && ox != x1 && ox != x2) {
            if (y1 == y2) {
                result = ox + "/" + oy + "/" + oz + "/" + x1 + "/" + y1 + "/" + z1 + "/" + ox + "/" + y1 + "/" + oz;
                this.setVertex(result, true);
                result = ox + "/" + oy + "/" + oz + "/" + x2 + "/" + y2 + "/" + z2 + "/" + ox + "/" + y2 + "/" + oz;
                this.setVertex(result, true);
                return;
            }
            if (x1 == x2) {
                result = ox + "/" + oy + "/" + oz + "/" + x1 + "/" + y1 + "/" + z1 + "/" + x1 + "/" + oy + "/" + oz;
                this.setVertex(result, true);
                result = ox + "/" + oy + "/" + oz + "/" + x2 + "/" + y2 + "/" + z2 + "/" + x2 + "/" + oy + "/" + oz;
                this.setVertex(result, true);
                return;
            }
        }
        alert("Leaving stupidity checker: " + x1 + "/" + y1 + "/" + z1 + " " + x2 + "/" + y2 + "/" + z2 + " " + ox + "/" + oy + "/" + oz);
    }

    isLowest2(num1, num2): number {
        if (num1 < num2)
            return num1;
        return num2;
    }

    isBiggest2(num1, num2): number {
        if (num1 > num2)
            return num1;
        return num2;
    }

    actualAdd(x1, y1, z1, x2, y2, z2, color): boolean {
        //alert(x1 + "/" + y1 + "/" + z1 + " and " + x2 + "/" + y2 + "/" + z2);

        var smaller = 0;
        var larger = 0;
        var result = false;
        var size = 0;

        if (x1 != x2) {
            if (x1 < x2) {
                smaller = x1;
                larger = x2;
            }
            if (x1 > x2) {
                smaller = x2;
                larger = x1;
            }
            size = larger - smaller;
            if (y1 == y2 && z1 == z2) {
                result = true;
                for (var smallCount = smaller; smallCount < smaller + size; smallCount++) {
                    if (this.matrix[smallCount][y1][z1] != "")
                        this.matrix[smallCount][y1][z1] += "/";
                    this.matrix[smallCount][y1][z1] += color + "*+_0_0";
                    //alert("added to " + smallCount + "/" + y1 + "/" + z1 + "   *+_0_0");
                }
                for (var largeCount = smaller + 1; largeCount < smaller + size + 1; largeCount++) {
                    if (this.matrix[largeCount][y1][z1] != "")
                        this.matrix[largeCount][y1][z1] += "/";
                    this.matrix[largeCount][y1][z1] += color + "*-_0_0";
                    //alert("added to " + largeCount + "/" + y1 + "/" + z1 + "   *-_0_0");
                }
            }
        }
        if (y1 != y2) {
            if (y1 < y2) {
                smaller = y1;
                larger = y2;
            }
            if (y1 > y2) {
                smaller = y2;
                larger = y1;
            }
            size = larger - smaller;
            if (x1 == x2 && z1 == z2) {
                result = true;
                for (var smallCount = smaller; smallCount < smaller + size; smallCount++) {
                    if (this.matrix[x1][smallCount][z1] != "")
                        this.matrix[x1][smallCount][z1] += "/";
                    this.matrix[x1][smallCount][z1] += color + "*0_+_0";
                    //alert("added to " + x1 + "/" + smallCount + "/" + z1 + "   *0_+_0");
                }
                for (var largeCount = smaller + 1; largeCount < smaller + size + 1; largeCount++) {
                    if (this.matrix[x1][largeCount][z1] != "")
                        this.matrix[x1][largeCount][z1] += "/";
                    this.matrix[x1][largeCount][z1] += color + "*0_-_0";
                    //alert("added to " + x1 + "/" + largeCount + "/" + z1 + "   *0_-_0");
                }
            }
        }
        if (z1 != z2) {
            if (z1 < z2) {
                smaller = z1;
                larger = z2;
            }
            if (z1 > z2) {
                smaller = z2;
                larger = z1;
            }
            size = larger - smaller;
            if (x1 == x2 && y1 == y2) {
                result = false;
                for (var smallCount = smaller; smallCount < smaller + size; smallCount++) {
                    if (this.matrix[x1][y1][smallCount] != "")
                        this.matrix[x1][y1][smallCount] += "/";
                    this.matrix[x1][y1][smallCount] += color + "*0_0_+";
                    //alert("added to " + x1 + "/" + y1 + "/" + smallCount + "   *0_0_+");
                }
                for (var largeCount = smaller + 1; largeCount < smaller + size + 1; largeCount++) {
                    if (this.matrix[x1][y1][largeCount] != "")
                        this.matrix[x1][y1][largeCount] += "/";
                    this.matrix[x1][y1][largeCount] += color + "*0_0_-";
                    //alert("added to " + x1 + "/" + y1 + "/" + largeCount + "   *0_0_-");
                }
            }
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
        //alert("in " + this.largestZ);

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

        var short = this.matrix;

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

        //alert("I'm here " + this.largestX + " " + this.largestY + " " + this.largestZ + " ");

        for (var x = 0; x < this.largestX - this.lowX; x++) {//setting first layer

            for (var y = 0; y < this.largestY - this.lowY; y++) {//setting second layer

                for (var z = 0; z < this.largestZ - this.lowZ; z++) {//setting third layer
                    put = true;
                    isThere = [false, false, false, false, false, false];

                    isThere[0] = this.isGood(short[x][y][z], 0)
                    isThere[1] = this.isGood(short[x][y][z + 1], 1)
                    isThere[2] = this.isGood(short[x + 1][y][z], 2)
                    isThere[3] = this.isGood(short[x + 1][y][z + 1], 3)
                    isThere[4] = this.isGood(short[x][y + 1][z], 4)
                    isThere[5] = this.isGood(short[x][y + 1][z + 1], 5)
                    isThere[6] = this.isGood(short[x + 1][y + 1][z], 6)
                    isThere[7] = this.isGood(short[x + 1][y + 1][z + 1], 7)

                    var incorrectCounter = 0;

                    for (var i = 0; i < 8; i++) {
                        //alert("isThere[" + i + "] = " + isThere[i]);
                        if (isThere[i] == false)
                            incorrectCounter++;
                    }

                    if (incorrectCounter > 3)
                        put = false;

                    if (put == true) {
                        this.finalMatrix[x][y][z] = this.getTexString(short[x][y][z], short[x][y][z + 1], short[x + 1][y][z], short[x + 1][y][z + 1], short[x][y + 1][z], short[x][y + 1][z + 1], short[x + 1][y + 1][z], short[x + 1][y + 1][z + 1]);
                        //alert("Placed: " + this.getTexString(short[x][y][z], short[x][y][z + 1], short[x + 1][y][z], short[x + 1][y][z + 1], short[x][y + 1][z], short[x][y + 1][z + 1], short[x + 1][y + 1][z], short[x + 1][y + 1][z + 1]) + " in x:" + x + " y:" + y + " z:" + z);
                    }
                    //alert("success: " + put);
                }//end third layer
            }//end second layer
        }//end first layer
        //alert("leaving");
        //for (var x = 0; x <= this.largestX - this.lowX; x++)
        //    alert(this.finalMatrix[x]);     
    }

    isGood(line, position): boolean {
        //alert("In isGood: " + position + " and " + line);
        if (!line || line == "")
            return false;
        //alert("isGood " + line + " " + position)

        var temp = "";
        var size = 0;
        var count = 0;
        var arrowArray: string[] = [];

        for (var x = 0; x < line.length; x++) {
            if (line[x] == "*")
                size++;
        }
        //alert("11111 " + size);
        var i = 0;

        while (line[i] != "*" && i < line.length)
            i++;
        i++;

        for (var x = i; x < line.length; x++) {
            while (line[x] != "*" && line[x] != "/" && x < line.length) {
                temp += line[x];
                //alert("Put in " + line[x]);
                x++;
            }
            arrowArray.push(temp);
            //alert("Added " + temp);
            temp = "";
            count++;
        }

        //alert("arrayArrow = " + arrowArray + "  " + position);

        //in order..................+_0_0..-_0_0..0_+_0..0_-_0..0_0_+..0_0_-
        var checkList: boolean[] = [false, false, false, false, false, false];

        for (var f = 0; f < arrowArray.length; f++) {
            if (arrowArray[f] == "+_0_0")
                checkList[0] = true;
            if (arrowArray[f] == "-_0_0")
                checkList[1] = true;
            if (arrowArray[f] == "0_+_0")
                checkList[2] = true;
            if (arrowArray[f] == "0_-_0")
                checkList[3] = true;
            if (arrowArray[f] == "0_0_+")
                checkList[4] = true;
            if (arrowArray[f] == "0_0_-")
                checkList[5] = true;
        }

        //alert(checkList[0] + " " + checkList[1] + " " + checkList[2] + " " + checkList[3] + " " + checkList[4] + " " + checkList[5]);

        var check = 0;
        //0 3 4
        if (position == 0) {
            if (checkList[0] && checkList[2])
                check++;
            if (checkList[2] && checkList[4])
                check++;
            if (checkList[0] && checkList[4])
                check++;
            if(check > 1)
                return true;
        }
        //0 3 5
        if (position == 1) {
            if (checkList[0] && checkList[2])
                check++;
            if (checkList[2] && checkList[5])
                check++;
            if (checkList[0] && checkList[5])
                check++;
            if (check > 1)
                return true;
        }
        //1 3 4
        if (position == 2) {
            if (checkList[1] && checkList[2])
                check++;
            if (checkList[2] && checkList[4])
                check++;
            if (checkList[1] && checkList[4])
                check++;
            if (check > 1)
                return true;
        }
        //1 3 5
        if (position == 3) {
            if (checkList[1] && checkList[2])
                check++;
            if (checkList[2] && checkList[5])
                check++;
            if (checkList[1] && checkList[5])
                check++;
            if (check > 1)
                return true;
        }
        //0 2 4
        if (position == 4) {
            if (checkList[0] && checkList[3])
                check++;
            if (checkList[3] && checkList[4])
                check++;
            if (checkList[0] && checkList[4])
                check++;
            if (check > 1)
                return true;
        }
        //0 2 5
        if (position == 5) {
            if (checkList[0] && checkList[3])
                check++;
            if (checkList[3] && checkList[5])
                check++;
            if (checkList[0] && checkList[5])
                check++;
            if (check > 1)
                return true;
        }
        //1 2 4
        if (position == 6) {
            if (checkList[1] && checkList[3])
                check++;
            if (checkList[3] && checkList[4])
                check++;
            if (checkList[1] && checkList[4])
                check++;
            if (check > 1)
                return true;
        }
        //1 2 5
        if (position == 7) {
            if (checkList[1] && checkList[3])
                check++;
            if (checkList[3] && checkList[5])
                check++;
            if (checkList[1] && checkList[5])
                check++;
            if (check > 1)
                return true;
        }
        
        return false;
    }

    getTexString(x1, x2, x3, x4, x5, x6, x7, x8): string {
        var flag = true;
        var flags: boolean[] = [false, false, false, false, false, false, false, false];
        var v1 = 0, v2 = 0, v3 = 0, v4 = 0, v5 = 0, v6 = 0, v7 = 0, v8 = 0;
        var count = 0;
        //alert("v1 is " + v1);
        var temp = [];

        do {
            flags = [false, false, false, false, false, false, false, false];
            temp = this.gColors(x1);
            flag = true;
            for (v1 = 0; v1 < temp.length && !flags[0]; v1++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*+_+_0" + " in. And " + temp[v1]);
                if (temp[v1] == (this.GvtArray[count] + "*+_+_0") || temp[v1] == (this.GvtArray[count] + "*0_+_+") || temp[v1] == (this.GvtArray[count] + "*+_0_+"))
                    flags[0] = true;
            }
            temp = this.gColors(x2);
            for (v2 = 0; v2 < temp.length && !flags[1] && flags[0]; v2++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*0_+_-" + " in. And " + temp[v2]);
                if (temp[v2] == (this.GvtArray[count] + "*0_+_-") || temp[v2] == (this.GvtArray[count] + "*+_+_0") || temp[v2] == (this.GvtArray[count] + "*+_0_-"))
                    flags[1] = true;
            }
            temp = this.gColors(x3);
            for (v3 = 0; v3 < temp.length && !flags[2] && flags[1]; v3++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*-_0_+" + " in. And " + temp[v3]);
                if (temp[v3] == (this.GvtArray[count] + "*-_0_+") || temp[v3] == (this.GvtArray[count] + "*-_+_0") || temp[v3] == (this.GvtArray[count] + "*0_+_+"))
                    flags[2] = true;
            }
            temp = this.gColors(x4);
            for (v4 = 0; v4 < temp.length && !flags[3] && flags[2]; v4++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*0_+_-" + " in. And " + temp[v4]);
                if (temp[v4] == (this.GvtArray[count] + "*0_+_-") || temp[v4] == (this.GvtArray[count] + "*-_+_0") || temp[v4] == (this.GvtArray[count] + "*-_0_-"))
                    flags[3] = true;
            }
            temp = this.gColors(x5);
            for (v5 = 0; v5 < temp.length && !flags[4] && flags[3]; v5++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*0_-_+" + " in. And " + temp[v5]);
                if (temp[v5] == (this.GvtArray[count] + "*0_-_+") || temp[v5] == (this.GvtArray[count] + "*+_-_0") || temp[v5] == (this.GvtArray[count] + "*+_0_+"))
                    flags[4] = true;
            }
            temp = this.gColors(x6);
            for (v6 = 0; v6 < temp.length && !flags[5] && flags[4]; v6++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*+_0_-" + " in. And " + temp[v6]);
                if (temp[v6] == (this.GvtArray[count] + "*+_0_-") || temp[v6] == (this.GvtArray[count] + "*+_-_0") || temp[v6] == (this.GvtArray[count] + "*0_-_-"))
                    flags[5] = true;
            }
            temp = this.gColors(x7);
            for (v7 = 0; v7 < temp.length && !flags[6] && flags[5]; v7++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*-_-_0" + " in. And " + temp[v7]);
                if (temp[v7] == (this.GvtArray[count] + "*-_-_0") || temp[v7] == (this.GvtArray[count] + "*0_-_+") || temp[v7] == (this.GvtArray[count] + "*-_0_+"))
                    flags[6] = true;
            }
            temp = this.gColors(x8);
            for (v8 = 0; v8 < temp.length && !flags[7] && flags[6]; v8++) {
                //alert("In getTexString for: " + this.GvtArray[count] + "*-_-_0" + " in. And " + temp[v8]);
                if (temp[v8] == (this.GvtArray[count] + "*-_-_0") || temp[v8] == (this.GvtArray[count] + "*-_0_-") || temp[v8] == (this.GvtArray[count] + "*0_-_-"))
                    flags[7] = true;
            }
            for (var f = 0; f < 8; f++) {
                //alert("checking flags[" + f + "] = " + flags[f]);
                if (!flags[count])
                    flag = false;
            }
            count++;
            //alert("Flag is " + flag + " count " + count + " length " + this.GvtArray.length);
        } while (!flag && count < this.GvtArray.length)
        //alert("Done " + this.GvtArray[count - 1]);
        return this.GvtArray[count - 1];
    }

    //getLineLength
    gColors(line): string[] {
        //alert("getline");
        var count = 0;
        var result: string[] = [];
        var temp = "";

        while (line[count] != "/" && count < line.length) {
            temp = "";
            while (line[count] != "/" && count < line.length) {
                temp += line[count];
                count++;
            }
            count++;
            result.push(temp);
        }
        return result;
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new fileReader(el);
};

//class convert{
//    element: HTMLElement;
//    constructor(element: HTMLElement) {
//        this.element = element;
//        this.element.innerHTML += "<input type='button' id='startButton'>";
//        document.getElementById("startButton").onchange = function () {
//            alert("Hello penis");
//        }
//    }
//}
