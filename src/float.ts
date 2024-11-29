import {pgcd} from "./arithmetic"

export class Float {

    private numerateur: number
    private denominateur: number

    constructor(n: number, d: number = 1) {
        if (d == 0) {
            throw new Error("Division by 0")
        }

        this.simplify(n * Math.sign(d), d * Math.sign(d))
    }

    static pow(x: Float, n: number) {
        if (n === 1) {
            return x
        }

        let x2 = Float.multiply(x, x)

        if (n % 2 === 0) {
            return Float.pow(x2, n / 2)
        }

        return Float.multiply(x, Float.pow(x2, (n - 1) / 2))
    }

    static multiply(f1: Float, f2: Float) {
        return new Float(f2.numerateur * f1.numerateur, f2.denominateur * f1.denominateur)
    }

    static add(f1: Float, f2: Float) {
        return new Float(f2.numerateur * f1.denominateur + f1.numerateur * f2.denominateur, f2.denominateur * f1.denominateur)
    }

    static substract(f1: Float, f2: Float) {
        return this.add(f1, f2.opposite())
    }

    static divide(f1: Float, f2: Float) {
        return this.multiply(f1, f2.inverse())
    }

    toString() {
        if (this.denominateur === 1) {
            return `${this.numerateur}`
        }
        return `${this.numerateur}/${this.denominateur}`
    }

    toNumber() {
        return this.numerateur / this.denominateur
    }

    inverse() {
        return new Float(this.denominateur, this.numerateur)
    }

    opposite() {
        return new Float(-this.numerateur, this.denominateur)
    }

    private simplify(n: number, d: number) {
        let div = pgcd(n, d)
        this.numerateur = n / div
        this.denominateur = d / div
    }

}

export let PI = new Float(3141592653589793, 10e14)
export let E = new Float(2718281828459045, 10e14)