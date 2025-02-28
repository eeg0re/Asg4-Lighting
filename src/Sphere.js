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
        let dd = Math.PI/100;

        let allVertices = [];
        let allUVs = [];
        let allNormals = [];

        for (let t = 0; t < Math.PI; t += d){
            for (let r = 0; r < (2*Math.PI); r += d){
                let p1 = [sin(t+dd)*cos(r), sin(t)*sin(r),  cos(t)];
                let p2 = [sin(t+dd)*cos(r), sin(t+dd)*sin(r),  cos(t+dd)];
                let p3 = [sin(t)*cos(r+dd), sin(t)*sin(r+dd),  cos(t)];
                let p4 = [sin(t+dd)*cos(r+dd), sin(t+dd)*sin(r+dd),  cos(t+dd)];
            }
        }

        // // front of cube
        // allVertices = allVertices.concat([0,0,0, 1,1,0, 1,0,0]);
        // allVertices = allVertices.concat([0,0,0, 0,1,0, 1,1,0]);
        // allUVs = allUVs.concat([0,0, 1,1, 1,0]);
        // allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        // allNormals = allNormals.concat([0,0,-1, 0,0,-1, 0,0,-1]); 
        // allNormals = allNormals.concat([0,0,-1, 0,0,-1, 0,0,-1]); 

        // // top of cube
        // allVertices = allVertices.concat([0,1,0, 0,1,1, 1,1,1]);
        // allVertices = allVertices.concat([0,1,0, 1,1,1, 1,1,0]);
        // allUVs = allUVs.concat([0,1, 0,0, 1,0]);
        // allUVs = allUVs.concat([0,1, 1,0, 1,1]);
        // allNormals = allNormals.concat([0,1,0, 0,1,0, 0,1,0]);
        // allNormals = allNormals.concat([0,1,0, 0,1,0, 0,1,0]);

        // // bottom of cube
        // allVertices = allVertices.concat([0,0,0, 1,0,0, 1,0,1]);
        // allVertices = allVertices.concat([0,0,0, 0,0,1, 1,0,1]);
        // allUVs = allUVs.concat([0,0, 1,0, 1,1]);
        // allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        // allNormals = allNormals.concat([0,-1,0, 0,-1,0, 0,-1,0]);
        // allNormals = allNormals.concat([0,-1,0, 0,-1,0, 0,-1,0]);

        // // left side of cube
        // allVertices = allVertices.concat([0,0,0, 0,1,0, 0,1,1]);
        // allVertices = allVertices.concat([0,0,0, 0,0,1, 0,1,1]);
        // allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        // allUVs = allUVs.concat([0,0, 1,0, 1,1]);
        // allNormals = allNormals.concat([-1,0,0, -1,0,0, -1,0,0]);
        // allNormals = allNormals.concat([-1,0,0, -1,0,0, -1,0,0]);

        // // right side of cube
        // allVertices = allVertices.concat([1,0,0, 1,1,0, 1,1,1]);
        // allVertices = allVertices.concat([1,0,0, 1,0,1, 1,1,1]);
        // allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        // allUVs = allUVs.concat([0,0, 1,0, 1,1]);
        // allNormals = allNormals.concat([1,0,0, 1,0,0, 1,0,0]);
        // allNormals = allNormals.concat([1,0,0, 1,0,0, 1,0,0]);

        // // back of cube
        // allVertices = allVertices.concat([0,0,1, 1,0,1, 1,1,1]);
        // allVertices = allVertices.concat([0,0,1, 0,1,1, 1,1,1]);
        // allUVs = allUVs.concat([0,0, 1,0, 1,1]);
        // allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        // allNormals = allNormals.concat([0,0,1, 0,0,1, 0,0,1]);
        // allNormals = allNormals.concat([0,0,1, 0,0,1, 0,0,1]);

        drawTriangle3DUVNormal(allVertices, allUVs, allNormals);
    }
}