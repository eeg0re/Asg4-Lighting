class Camera {
    constructor(width, height){
        this.eye = new Vector3([0.0, 0.0, 3.0]);
        this.at = new Vector3([0.0, 0.0, -100.0]);
        this.up = new Vector3([0.0, 1.0, 0.0]);
        this.fov = 60.0;
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();

        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], this.at.elements[0], this.at.elements[1], this.at.elements[2], this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        this.projectionMatrix.setPerspective(this.fov, width/height, 0.1, 1000);
    }

    forward(){
        let d = new Vector3();
        d.set(this.at);
        d.sub(this.eye);
        d.normalize();
        this.eye = this.eye.add(d);
        this.at = this.at.add(d);
    }

    back(){
        let d = new Vector3();
        d.set(this.at);
        d.sub(this.eye);
        d.normalize();
        this.eye = this.eye.sub(d);
        this.at = this.at.sub(d);
    }

    left(){
        let d = new Vector3();
        d.set(this.at);
        d.sub(this.eye);
        d = Vector3.cross(d, this.up);
        d.normalize();
        this.eye = this.eye.sub(d);
        this.at = this.at.sub(d);
    }

    right(){
        let d = new Vector3();
        d.set(this.at);
        d.sub(this.eye);
        d = Vector3.cross(d, this.up);
        d.normalize();
        this.eye = this.eye.add(d);
        this.at = this.at.add(d);
    }

    rotateRight(degrees = 5){
        let d = new Vector3();
        d.set(this.at);
        d.sub(this.eye);
        d.elements[1] = 0;

        let r = d.magnitude();
        d.normalize();
        
        let theta = Math.atan2(d.elements[2], d.elements[0]); // let theta = atan2(d.z, d.x);
        let radians = degrees * (Math.PI / 180);
        theta = theta + radians;

        let newx = r * Math.cos(theta); 
        let newz = r * Math.sin(theta); 
        d.elements[0] = newx;
        d.elements[2] = newz;

        this.at.set(this.eye); 
        this.at.add(d);
    }

    rotateLeft(degrees = 5){
        let d = new Vector3();
        d.set(this.at);
        d.sub(this.eye);
        d.elements[1] = 0;

        let r = d.magnitude();
        d.normalize();
        
        let theta = Math.atan2(d.elements[2], d.elements[0]); // let theta = atan2(d.z, d.x);
        let radians = -degrees * (Math.PI / 180);
        theta = theta + radians;

        let newx = r * Math.cos(theta); 
        let newz = r * Math.sin(theta); 
        d.elements[0] = newx;
        d.elements[2] = newz;

        this.at.set(this.eye); 
        this.at.add(d);
    }
}