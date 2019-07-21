import { Tuple, Tuples } from './tuples';
import Canvas from './canvas';

export class Projectile {
    constructor(readonly position: Tuple, readonly velocity: Tuple) {
    }
}

export class Environment {
    constructor(readonly gravity: Tuple, readonly wind: Tuple) {
    }
}

function tick(environment: Environment, projectile: Projectile) : Projectile {
    let position = Tuples.add(projectile.position, projectile.velocity),
        velocity = Tuples.add(Tuples.add(projectile.velocity, environment.gravity), environment.wind);

    return new Projectile(position, velocity);
}

let projectile = new Projectile(Tuples.point(0, 1, 0), Tuples.multiply(Tuples.normalize(Tuples.vector(1, 1.8, 0)), 11.25)),
    environment = new Environment(Tuples.vector(0, -0.1, 0), Tuples.vector(-0.01, 0, 0)),
    i = 0,
    c = new Canvas(900, 550),
    color = Tuples.color(255, 0, 0);

while (projectile.position[1] > 0) {
    console.log(`position: ${ projectile.position }, ticks: ${ ++i }`);
    c.writePixel(Math.round(projectile.position[0]), Math.round(projectile.position[1]), color);
    projectile = tick(environment, projectile);
}

c.toImage("projectile.png");