class Cube{
    constructor(){
        this.type = "cube";
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.matrix = new Matrix4();
        this.textureNum = -1;
    }

    render(){
        // let xy = this.position;
        let rgba = this.color;
        // let size = this.size;

        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // front of cube
        drawTriangle3DUV([0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0]);
        drawTriangle3DUV([0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1]);

        // shaded color
        gl.uniform4f(u_FragColor, rgba[0] * 0.9, rgba[1] * 0.9, rgba[2] * 0.9, rgba[3]);

        // top of cube
        drawTriangle3DUV([0,1,0, 0,1,1, 1,1,1], [0,1, 0,0, 1,0]);
        drawTriangle3DUV([0,1,0, 1,1,1, 1,1,0], [0,1, 1,0, 1,1]);

        // darker shaded color
        gl.uniform4f(u_FragColor, rgba[0] * 0.7, rgba[1] * 0.7, rgba[2] * 0.7, rgba[3]);

        // bottom of cube
        drawTriangle3DUV([0,0,0, 1,0,0, 1,0,1], [0,0, 1,0, 1,1]);
        drawTriangle3DUV([0,0,0, 0,0,1, 1,0,1], [0,0, 0,1, 1,1]);

        // shaded color
        gl.uniform4f(u_FragColor, rgba[0] * 0.8, rgba[1] * 0.8, rgba[2] * 0.8, rgba[3]);

        // left side of cube
        drawTriangle3DUV([0,0,0, 0,1,0, 0,1,1], [0,0, 0,1, 1,1]);
        drawTriangle3DUV([0,0,0, 0,0,1, 0,1,1], [0,0, 1,0, 1,1]);

        // right side of cube
        drawTriangle3DUV([1,0,0, 1,1,0, 1,1,1], [0,0, 0,1, 1,1]);
        drawTriangle3DUV([1,0,0, 1,0,1, 1,1,1], [0,0, 1,0, 1,1]);

        // darker shaded color
        gl.uniform4f(u_FragColor, rgba[0] * 0.7, rgba[1] * 0.7, rgba[2] * 0.7, rgba[3]);

        // back of cube
        drawTriangle3DUV([0,0,1, 1,0,1, 1,1,1], [0,0, 1,0, 1,1]);
        drawTriangle3DUV([0,0,1, 0,1,1, 1,1,1], [0,0, 0,1, 1,1]);
    }

    renderFast(){
        let rgba = this.color;

        // accomodate for textures later
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        let allVertices = [];
        let allUVs = [];

        // front of cube
        allVertices = allVertices.concat([0,0,0, 1,1,0, 1,0,0]);
        allVertices = allVertices.concat([0,0,0, 0,1,0, 1,1,0]);
        allUVs = allUVs.concat([0,0, 1,1, 1,0]);
        allUVs = allUVs.concat([0,0, 0,1, 1,1]);

        // top of cube
        allVertices = allVertices.concat([0,1,0, 0,1,1, 1,1,1]);
        allVertices = allVertices.concat([0,1,0, 1,1,1, 1,1,0]);
        allUVs = allUVs.concat([0,1, 0,0, 1,0]);
        allUVs = allUVs.concat([0,1, 1,0, 1,1]);

        // bottom of cube
        allVertices = allVertices.concat([0,0,0, 1,0,0, 1,0,1]);
        allVertices = allVertices.concat([0,0,0, 0,0,1, 1,0,1]);
        allUVs = allUVs.concat([0,0, 1,0, 1,1]);
        allUVs = allUVs.concat([0,0, 0,1, 1,1]);

        // left side of cube
        allVertices = allVertices.concat([0,0,0, 0,1,0, 0,1,1]);
        allVertices = allVertices.concat([0,0,0, 0,0,1, 0,1,1]);
        allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        allUVs = allUVs.concat([0,0, 1,0, 1,1]);

        // right side of cube
        allVertices = allVertices.concat([1,0,0, 1,1,0, 1,1,1]);
        allVertices = allVertices.concat([1,0,0, 1,0,1, 1,1,1]);
        allUVs = allUVs.concat([0,0, 0,1, 1,1]);
        allUVs = allUVs.concat([0,0, 1,0, 1,1]);

        // back of cube
        allVertices = allVertices.concat([0,0,1, 1,0,1, 1,1,1]);
        allVertices = allVertices.concat([0,0,1, 0,1,1, 1,1,1]);
        allUVs = allUVs.concat([0,0, 1,0, 1,1]);
        allUVs = allUVs.concat([0,0, 0,1, 1,1]);

        drawTriangle3DUV(allVertices, allUVs);
    }
}