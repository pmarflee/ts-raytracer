import Tuple from "./tuple";
import Matrix from "./matrix";
import Color from "./color";
import Canvas from "./canvas";
import fs from "fs";

let canvas = new Canvas(900, 900),
    color = Color.fromRGB(255, 255, 255),
    twelve = Tuple.point(0, 0, 1),
    radius = canvas.width * (3 / 8),
    centre = { x: canvas.width / 2, y: canvas.height / 2};

for (let i = 1; i <= 12; i++) {
    let rotation = Matrix.rotation_y(i * (Math.PI / 6)),
        point = rotation.multiply(twelve),
        x = Math.round((point.x * radius) + centre.x),
        y = Math.round((point.z * radius) + centre.y);
    canvas.writePixel(x, y, color);
}

canvas.toImage("clock.png");
console.log("Image written to 'clock.png'");

fs.writeFileSync("clock.ppm", canvas.toPPM());
console.log("PPM written to clock.ppm");