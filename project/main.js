import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

//We can use this to load textures or sounds
export function preload() {

}

//Called once when program loads
export function setup() {
    camera(300, -200, 700);
}

//Called every frame
export function draw(t, dt) {
    background(30, 30, 30); //Clear the background to dark grey
    orbitControl(); //Enable mouse movement in the scene
    ambientLight(80, 80, 80);  //Add some ambient light to the scene

    directionalLight(255, 255, 255, 1, 1, -1); //Add a white directional light

    drawGrid(); //Draw the grid
    drawAxes(); //Draw the axes

    stroke(0);  //Make the stroke black
    strokeWeight(0); //Make it thin
    translate(0, -10, 0)

    function wheel() {
        push()
        rotateZ(90)
        fill(10, 10, 10)
        cylinder(10, 10)
        translate(0, -1, 0)
        fill(100, 100, 100)
        rotateX(90)
        translate(0, 0, 4)
        torus(8, 1)
        rotateX(90)
        cylinder(2.5, 2)
        rotateX(90)
        translate(0, 0, 0)
        function spokes() {
            cylinder(0.5, 14.5)
            rotateZ(72)
        }
        for (let x = 0; x < 5; x++) {
            spokes();
        }
        pop()
    }
    function allWheels() {
        push()
        translate(35.5, 0, 46.9)
        wheel()
        pop()
        push()
        translate(35.5, 0, -46.9)
        wheel()
        pop()
        push()
        rotateY(180)
        translate(35.5, 0, 46.9)
        wheel()
        translate(0, 0, -97.8)
        wheel()
        pop()
    }
    function carWindshield() {
        push()
        fill(200, 10, 15)
        translate(0, 5, 0)
        box(79, 5, 130)
        fill(15, 15, 50)
        translate(0, -25, 15)
        rotateX(-25)
        box(60, 20, 40)
        rotateX(25)
        translate(0, 0, -40)
        rotateX(15)
        box(60, 20, 60)
        pop()
    }
    function carFront() {
        push()
        fill(50, 50, 50)
        translate(0, 0, 70)
        box(45, 15, 5)
        fill(200, 10, 15)
        translate(0, -6, -20)
        rotateX(-10)
        box(60.1, 20, 40)
        rotateX(8)
        translate(29.5, 3, -50)
        box(20, 20, 130)
        translate(-59, 0, 0)
        box(20, 20, 130)
        pop()
    }
    function carRear() {
        push()
        fill(200, 10, 15)
        translate(0, -18, -65)
        rotateX(10)
        box(60.1, 10, 30)
        rotateX(-10)
        fill(50, 50, 50)
        rotateX(10)
        translate(-15, -10, -10)
        box(3, 10, 5)
        translate(30, 0, 0)//spoiler
        box(3, 10, 5)
        translate(-15, 0, -5)
        rotateX(-10)
        translate(0, -7, 0)
        rotateX(-10)
        box(60, 2, 15)
        pop()


    }
    function rearDetail() {
        push()
        fill(200, 10, 15)
        translate(0, -34, -10)
        rotateX(5)
        box(60.1, 5, 20)
        rotateX(-5)
        translate(0, 3, -19)//underbody aero
        rotateX(12)
        box(60.1, 5, 20)
        rotateX(-12)
        translate(0, 6, -20)
        rotateX(18)
        box(60.1, 5, 25)
        pop()
        push()
        fill(200, 10, 15)
        translate(-30, -5, -70)
        rotateY(-30)
        box(10, 25, 20)
        pop()
        push()
        fill(200, 10, 15)
        translate(30, -5, -70)
        rotateY(30)
        box(10, 25, 20)
        pop()
        push()
        fill(200, 10, 15)
        translate(0, -10, -71)
        box(59, 15, 20)
        translate(0,12, 2)
        rotateX(-30)
        fill(50, 50, 50)
        box(40, 2, 20)
        pop()


    }
    function frontDetail(){
        push()
        translate(0,6.5,75)
        fill(25,25,25)
        box(50,2,20)
        translate(27,0,1)
        rotateY(45)
        box(15,2,10)
        pop()
        push()
        translate(-27,6.5,76)
        fill(25,25,25)
        rotateY(-45)
        box(15,2,10)
        pop()
        push()
        translate(0,6.5,69)
        fill(25,25,25)
        box(72,2,10)
        pop()
        push()
        translate(30,-2.5,68)
        rotateY(30)
        box(20,20,5)
        pop()
        push()
        

    }

    allWheels()
    carWindshield()
    carFront()
    carRear()
    rearDetail()
    frontDetail()
    //Draw daWhip
}