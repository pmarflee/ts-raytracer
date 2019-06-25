import { Tuple, Tuples } from './tuples';

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

let projectile = new Projectile(Tuples.point(0, 1, 0), Tuples.normalize(Tuples.vector(1, 1, 0))),
    environment = new Environment(Tuples.vector(0, -0.1, 0), Tuples.vector(-0.01, 0, 0)),
    i = 0;

while (projectile.position[1] > 0) {
    console.log(`position: ${ projectile.position }, ticks: ${ ++i }`);
    projectile = tick(environment, projectile);
}