class Sphere{
    constructor(){
        this.type = "sphere";
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        this.matrix = new Matrix4();
        this.textureNum = -1;
    }


    renderFast(){
        let rgba = this.color;

        // accomodate for textures later
        gl.uniform1i(u_whichTexture, this.textureNum);

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        let d = Math.PI/10;
        let dd = Math.PI/10;

        let allVertices = [];
        let allUVs = [];

        for (let t = 0; t < Math.PI; t += d){
            for (let r = 0; r < (2*Math.PI); r += d){
                let p1 = [Math.sin(t)*Math.cos(r), Math.sin(t)*Math.sin(r),  Math.cos(t)];
                let p2 = [Math.sin(t+dd)*Math.cos(r), Math.sin(t+dd)*Math.sin(r),  Math.cos(t+dd)];
                let p3 = [Math.sin(t)*Math.cos(r+dd), Math.sin(t)*Math.sin(r+dd),  Math.cos(t)];
                let p4 = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd),  Math.cos(t+dd)];

                let uv1 = [t/Math.PI, r/(2*Math.PI)];
                let uv2 = [(t+dd)/Math.PI, r/(2*Math.PI)];
                let uv3 = [t/Math.PI, (r+dd)/(2*Math.PI)];
                let uv4 = [(t+dd)/Math.PI, (r+dd)/(2*Math.PI)];

                allVertices = allVertices.concat(p1);
                allUVs = allUVs.concat(uv1);
                allVertices = allVertices.concat(p2);
                allUVs = allUVs.concat(uv2);
                allVertices = allVertices.concat(p4);
                allUVs = allUVs.concat(uv4);

                allVertices = allVertices.concat(p1);
                allUVs = allUVs.concat(uv1);
                allVertices = allVertices.concat(p4);
                allUVs = allUVs.concat(uv4);
                allVertices = allVertices.concat(p3);
                allUVs = allUVs.concat(uv3);

            }
        }
        gl.uniform4f(u_FragColor, 1, 1, 1, 1);

        drawTriangle3DUVNormal(allVertices, allUVs, allVertices);
    }
}