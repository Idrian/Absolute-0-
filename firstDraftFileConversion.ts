class fileReader {
    element: HTMLElement;

    //declaring the arrays to hold the .obj data
    //holds the normals
    vnArray: string[] = [];
    //holds the texture coordinates
    vtArray: string[] = [];
    //holds the vert
    vArray: string[] = [];
    //holds the faces
    fArray: string[] = [];

    //called immediately
    constructor(element: HTMLElement) {
        this.element = element;
        //used to upload a file, temp solution to file retrieval
        this.element.innerHTML += "<input type='file' id='thisFile'>";

        //function gets called when file is uploaded
        document.getElementById("thisFile").onchange = function () {

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
                        vnArray.push(lines[line]);
                    }
                    //if this line is a texture coord
                    else if (lines[line][0] == "v" && lines[line][1] == "t") {
                        lines[line] = lines[line].substring(3);
                        vtArray.push(lines[line]);
                    }
                    //if this line is a vert
                    else if (lines[line][0] == "v" && lines[line][1] == " ") {
                        lines[line] = lines[line].substring(2);
                        vArray.push(lines[line]);
                    }
                    //if this line is a face
                    else if (lines[line][0] == "f" && lines[line][1] == " ") {
                        lines[line] = lines[line].substring(2);
                        fArray.push(lines[line]);
                    }
                }
                //displays output, for testing only, can remove
                alert(vnArray);
                alert(vtArray);
                alert(vArray);
                alert(fArray);
            };
            reader.readAsText(file);
        };
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new fileReader(el);
};
