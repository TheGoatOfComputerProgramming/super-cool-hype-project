import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";
import { drawCar } from "./car.js";
//We can use this to load textures or sounds
export function preload() {
    img = loadImage('watkinsGlenV2.png');
}
let img
let tNow

let onLine

//Constants that never change
let gravity = vector(0, 9.8, 0);
let mass = 200
let friction = 0.9999

//Car state
let position = vector(-2380, 0, 2490);
let carAngle = -90;

let velocity = vector(0, 0, 0);

//Based on user input
let steeringAngle = 0

//Camera stuff
let camDistance = 300;
let camHeight = 100;

let isRacing = false;


function setup() {
    angleMode(RADIANS);
    createCanvas(400, 400, WEBGL);
}

//Called every frame
export function draw(t, dt) {

    background(30, 30, 30);
    background(220);


    push()
    texture(img);
    noStroke();
    rotateX(180)
    // translate(640,0,700)
    rotateY(90)
    box(10635, 0, 18900);
    pop()
    orbitControl(); //Enable mouse movement in the scene
    ambientLight(80, 80, 80);  //Add some ambient light to the scene

    directionalLight(255, 255, 255, 100, 100, -100); //Add a white directional light





    let forward = vector(sin(carAngle), 0, cos(carAngle));

    let bar = (3000 - Math.hypot(Math.abs(velocity.x),Math.abs(velocity.z)))
    let foo = steeringAngle / 30 * bar;
    //steering
    if (keyIsDown(LEFT_ARROW)) {
        steeringAngle += bar / 5 * dt

    }

    if (keyIsDown(RIGHT_ARROW)) {
        steeringAngle -= bar / 5 * dt
    }
    if (!(keyIsDown(LEFT_ARROW)) && !(keyIsDown(RIGHT_ARROW)))
        steeringAngle *= 0.9

    steeringAngle = Math.max(-30, Math.min(30, steeringAngle))

    if (keyIsDown(UP_ARROW)) {
        velocity = velocity.plus(forward.times(15));
    }
    if (keyIsDown(DOWN_ARROW)) {
        velocity = velocity.minus(forward.times(3));
    }
    if (!(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW))) {

    }
    let velocityAngle = atan2(velocity.x, velocity.z)
    let driftAngle = velocityAngle - carAngle; //Math.atan2(Math.sin(velocityAngle - carAngle), Math.cos(velocityAngle - carAngle));
    let isDrifting = Math.abs(driftAngle) > 3;//(5 * Math.PI / 180)
    if (isDrifting) {
        const speed = Math.hypot(velocity.x, velocity.z);

        let diff = carAngle - velocityAngle;


        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        velocityAngle += diff * 0.50;
        velocity.x = Math.sin((velocityAngle) / 180 * Math.PI) * speed;
        velocity.z = Math.cos((velocityAngle) / 180 * Math.PI) * speed;
    }
    
    if (position.x < -2900 && position.x > -3100 && position.z < 2625 && position.z > 2275) {


        // Math.abs(position.x - 2490) < 200

        if (isRacing && onLine) {
            if ((t - tNow) > 10) {
                console.log(t - tNow)
            }
        }

        tNow = t

        isRacing = true;


        onLine = true;


    }


    // console.log (isRacing)

    //velocity.z *= 0.95
    //velocity.x *= 0.95
    //forces idek
    velocity = velocity.times(.99);



    position = position.plus(velocity.times(dt));

    carAngle = carAngle + steeringAngle / 30


    let camX = position.x - sin(carAngle) * camDistance;
    let camZ = position.z - cos(carAngle) * camDistance;
    let camY = position.y - camHeight;

    camera(camX, camY, camZ, position.x, position.y, position.z, 0, 1, 0);

    translate(position.x, position.y, position.z);
    rotateY(carAngle);
    drawCar(steeringAngle);

}

