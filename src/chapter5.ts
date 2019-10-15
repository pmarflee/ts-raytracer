import Tuple from "./tuple";
import Matrix from "./matrix";
import Color from "./color";
import Canvas from "./canvas";
import Sphere from "./sphere";
import Ray from "./ray";
import fs from "fs";
import Intersection from "./intersection";

let rayOrigin = Tuple.point(0, 0, -5),
    wallZ = 10,
    wallSize = 7,
    canvasPixels = 100,
    pixelSize = wallSize / canvasPixels,
    half = wallSize / 2,
    canvas = new Canvas(canvasPixels, canvasPixels),
    color = Color.fromRGB(255, 0, 0),
    shape = new Sphere();

for (let y = 0; y < canvasPixels; y++) {
    let worldY = half - (pixelSize * y);

    for (let x = 0; x < canvasPixels; x++) {
        let worldX = -half + (pixelSize * x),
            position = Tuple.point(worldX, worldY, wallZ),
            r = new Ray(rayOrigin, position.subtract(rayOrigin).normalize()),
            xs = shape.intersect(r);
            
        if (xs.hit !== null) {
            canvas.writePixel(x, y, color);
        }
    }
}

canvas.toImage("sphere.png");
console.log("Image written to 'sphere.png'");