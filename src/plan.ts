import {Equation} from "./equations"
import {Float} from "./float"
import {EmptyMatrix, IdentityMatrix, Matrix} from "./matrix"

class Dimensional {
    constructor(private dim: number) {
    }

    get dimension() {
        return this.dim
    }
}

export class Point extends Dimensional {
    constructor(private c: number[]) {
        super(c.length)
    }

    static substract(p1: Point, p2: Point) {
        if (p1.dimension !== p2.dimension) {
            throw new Error("Points dimension need to be the same")
        }

        let a: number[] = []
        for (let i = 0; i < p1.dimension; i++) {
            a.push(p1.get(i) - p2.get(i))
        }
        return new Point(a)
    }

    get(i: number) {
        return this.c[i]
    }
}

export class Vector extends Dimensional {
    constructor(private p1, private p2) {
        if (p1.dimension !== p2.dimension) {
            throw new Error("Points dimension need to be the same")
        }
        super(p1.dimension)
    }

    get vector() {
        let a: number[] = []
        for (let i = 0; i < this.p1.dimension; i++) {
            a.push(this.p2.get(i) - this.p1.get(i))
        }
        return a
    }

    public static scalar(v1: Vector, v2: Vector) {
        if (v1.dimension !== v2.dimension) {
            throw new Error("Vectors dimension need to be the same")
        }

        let v11 = v1.vector
        let v22 = v2.vector

        let a: number = 0

        for (let i = 0; i < v1.dimension; i++) {
            a += v11[i] * v22[i]
        }
        return a
    }
}

export class HyperPlan extends Dimensional {
    constructor(private points: Point[]) {
        for (let p of points) {
            if (p.dimension !== points.length) {
                throw new Error("Point dimension needs to match the hyperplan dimension")
            }
        }
        super(points.length)
    }

    public getParametricEquation(): Equation {
        let dim = this.dimension + 1
        let m = new EmptyMatrix(dim, dim)
        let identity = new IdentityMatrix(dim, dim)
        let i, j

        for (i = 0; i < dim - 2; i++) {
            let v = new Vector(this.points[dim - 2], this.points[i])

            for (j = 0; j < dim - 1; j++) {
                m.set(i, j, new Float(v.vector[j]))
            }
            m.set(i, j, new Float(1))
        }
        m.set(i, j - 1, new Float(1))
        m.set(i, j, new Float(1))


        let m2 = m.simplify()

        let f = Matrix.substract(m2, identity)

        let t = f.extractColumns(dim - 1)

        let teq = []
        for (let i = 0; i < dim - 1; i++) {
            teq.push([new Float(t[i]), new Float(t[dim - 1] / 3)])
        }

        let eq = new Matrix(teq)

        return new Equation(eq)
    }

    public projected(p: Point) {

    }
}