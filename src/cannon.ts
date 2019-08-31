import Tuple from "./tuple";
import Color from "./color";
import Canvas from "./canvas";

export class Projectile {
    constructor(readonly position: Tuple, readonly velocity: Tuple) {
    }
}

export class Environment {
    constructor(readonly gravity: Tuple, readonly wind: Tuple) {
    }
}

function tick(environment: Environment, projectile: Projectile) : Projectile {
    let position = projectile.position.add(projectile.velocity),
        velocity = projectile.velocity.add(environment.gravity).add(environment.wind);

    return new Projectile(position, velocity);
}

let projectile = new Projectile(Tuple.point(0, 1, 0), Tuple.vector(1, 1.8, 0).normalize().multiply(11.25)),
    environment = new Environment(Tuple.vector(0, -0.1, 0), Tuple.vector(-0.01, 0, 0)),
    i = 0,
    c = new Canvas(900, 550),
    color = Color.fromRGB(255, 0, 0);

while (projectile.position.y > 0) {
    console.log(`position: ${ projectile.position }, ticks: ${ ++i }`);
    c.writePixel(Math.round(projectile.position.x), Math.round(projectile.position.y), color);
    projectile = tick(environment, projectile);
}

c.toImage("projectile.png");