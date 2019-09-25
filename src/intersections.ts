import Intersection from "./intersection";

export default class Intersections {

    private readonly _values: Intersection[];

    constructor(...args: Intersection[]) {
        args.sort((a, b) => {
            if (a.t > b.t) return 1
            else if (a.t < b.t) return -1
            else return 0;
        });
        this._values = args;
    }

    get values(): readonly Intersection[] {
        return this._values;
    }

    get hit(): Intersection | null {
        var result = this._values.find(({t}) => t > 0),
            intersection = result as Intersection;
        return intersection !== undefined ? intersection : null;
    }
}