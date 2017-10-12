    export function rgbToHex(r:number,g:number,b:number) : string
    {
        var hex = "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        console.log("Hex",hex);
        return hex;
    }

    export function componentToHex(c:number) : string
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }