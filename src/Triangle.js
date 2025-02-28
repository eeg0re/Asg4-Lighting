class Triangle{
    constructor(exactVertices = null){
        this.type = "triangle";
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.exactTri = exactVertices;
    }
    render(){
        let xy = this.position;
        let rgba = this.color;
        let size = this.size;

        // Pass the position of a triangle to a_Position variable
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], xy[2]);
        // Pass the color of a triangle to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Pass size of triangle to u_Size variable
        gl.uniform1f(u_Size, size);

        var delta = this.size/200.0;
        if(this.exactTri){
            drawTriangle(this.exactTri);
        }
        else{
            drawTriangle([xy[0], xy[1], xy[0] + delta, xy[1], xy[0], xy[1] + delta]);
        }
    }   
}

function drawTriangle(vertices){
    let n = 3 // num vertices

    // create buffer object
    let vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log("Failed to create the buffer object");
        return -1;
    }

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // assign buffer object to a_Position variable 
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    
    // enable assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3D(vertices){
    let n = vertices.length / 3; // number of vertices

    if (n % 3 != 0) {
        console.log("Not enough vertices to form a triangle");
        return;
    }

    // create buffer object
    let vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log("Failed to create the buffer object");
        return -1;
    }

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // assign buffer object to a_Position variable 
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // enable assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3DUV(vertices, uv){
    let n = vertices.length/3 // num vertices

    // create buffer object
    let vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log("Failed to create the buffer object");
        return -1;
    }

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // assign buffer object to a_Position variable 
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // enable assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // create buffer object
    let uvBuffer = gl.createBuffer();
    if(!uvBuffer){
        console.log("Failed to create the buffer object");
        return -1;
    }

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    // write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

    // assign buffer object to a_Position variable 
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    
    // enable assignment to a_Position variable
    gl.enableVertexAttribArray(a_UV);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}