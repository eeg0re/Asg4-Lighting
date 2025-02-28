//import {Vector3} from './lib/cuon-matrix.js';

let ctx;
let center;
let pxlScale = 20;

function clearCanvas(canvas){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(vector, color){
    if(!ctx){
        return false;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // scale the vector's coordinates to fit the canvas
    let x = center + vector.elements[0] * pxlScale;
    let y = center - vector.elements[1] * pxlScale;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function handleDrawEvent(canvas){
    clearCanvas(canvas);
    let v1x = document.getElementById("v1x").value;
    let v1y = document.getElementById("v1y").value;
    let v1 = new Vector3([v1x, v1y, 0]);

    let v2x = document.getElementById("v2x").value;
    let v2y = document.getElementById("v2y").value;
    let v2 = new Vector3([v2x, v2y, 0]);
    
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
}

function angleBetween(v1, v2){
    let theta;
    let dotProd = Vector3.dot(v1, v2);
    let mags = v1.magnitude() * v2.magnitude();
    theta = Math.acos(dotProd / mags);
    return theta;
}

function areaTriangle(v1, v2){
    let area;
    let crossProd = Vector3.cross(v1, v2);
    area = 0.5 * crossProd.magnitude();
    return area;
}

function handleDrawOperationEvent(canvas){
    clearCanvas(canvas);
    let v1x = document.getElementById("v1x").value;
    let v1y = document.getElementById("v1y").value;
    let v1 = new Vector3([v1x, v1y, 0]);

    let v2x = document.getElementById("v2x").value;
    let v2y = document.getElementById("v2y").value;
    let v2 = new Vector3([v2x, v2y, 0]);

    let operation = document.getElementById("Operation").value;
    let scalar = document.getElementById("scalar").value;
    let v3 = new Vector3();
    let v4 = new Vector3();

    switch(operation){
        case 'Add':
            // draw v1 before adding or subtracting bc after the operation, 
            // the vector will be drawn at the new location
            drawVector(v1, 'red');
            v3 = v1.add(v2);
            drawVector(v2, 'blue');
            drawVector(v3, 'green');
            break;
        case 'Subtract':
            drawVector(v1, 'red');
            v3 = v1.sub(v2);
            drawVector(v2, 'blue');
            drawVector(v3, 'green');    
            break;
        case 'Multiply':
            v3 = v1.mul(scalar);
            v4 = v2.mul(scalar);
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;
        case 'Divide':
            v3 = v1.div(scalar);
            v4 = v2.div(scalar);
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;
        case 'Magnitude':
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            console.log("Magnitude v1: " + v1.magnitude());
            console.log("Magnitude v2: " + v2.magnitude());
            break;
        case 'Normalize':
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            v3 = v1.normalize();
            v4 = v2.normalize();
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;
        case 'Angle Between':
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            console.log("Angle between v1 and v2: " + angleBetween(v1, v2));
            break;
        case 'Area':
            drawVector(v1, 'red');
            drawVector(v2, 'blue');
            console.log("Area of triangle: " + areaTriangle(v1, v2));
            break;
        default:
            console.log('Invalid operation');
            return false;
    }
}

function main(){
    let canvas = document.getElementById("example");

    if(!canvas){
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    center = canvas.width / 2;  // get the center of the canvas for our calculations

    ctx = canvas.getContext('2d'); 
    clearCanvas(canvas);
    
    let drawBttn = document.getElementById("drawBttn");
    drawBttn.addEventListener('click', function(){
        handleDrawEvent(canvas);
    });

    let opDrawBttn = document.getElementById("opDraw");
    opDrawBttn.addEventListener('click', function(){
        handleDrawOperationEvent(canvas);
    });
}
