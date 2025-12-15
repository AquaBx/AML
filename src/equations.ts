import { CpxTab, fft, ifft } from "./fft"
import { Float } from "./float"
import { Matrix } from "./matrix"

export class Equation {
    constructor(protected coefficients: Matrix) {
    }

    evaluate(l: Matrix) {
        let dims = this.coefficients.dimensions()
        if (l.dimensions().lines !== dims.lines && l.dimensions().columns !== 1) {
            throw new Error("Not enough parameter to evaluate")
        }

        let somme = new Float(0)
        for (let i = 0; i < dims.lines; i++) {
            let temp = new Float(1)
            for (let j = 0; j < dims.columns; j++) {
                let a = Float.multiply(this.coefficients.get(i, j), temp)
                somme = Float.add(somme, a)
                temp = Float.multiply(temp, l.get(i, 0))

            }
        }

        return somme
    }

    // retrieveXFromP2(y:number){
    //     let a = this.coefficients[2]
    //     let b = this.coefficients[1]
    //     let c = this.coefficients[0]
    //     let delta = b**2 - 4 * a * c

    //     let x1,x2

    //     if (delta >= 0){
    //         x1 = new Complex( (b - Math.sqrt(delta)) / (2 * a) )
    //         x2 = new Complex( (b + Math.sqrt(delta)) / (2 * a) )
    //     }
    //     else {
    //         x1 = new Complex(b / (2 * a), - Math.sqrt(delta) / (2 * a) )
    //         x2 = new Complex(b / (2 * a),   Math.sqrt(delta) / (2 * a) )
    //     }

    //     return [x1,x2]
    // } 

    public static multiply(x1: Equation, x2: Equation) {
        let n = Math.ceil((x1.coefficients.dimensions().columns * x2.coefficients.dimensions().columns) / 2) * 2;

        let a = new CpxTab(n)
        let e = new CpxTab(n)

        a.load(x1.coefficients.extractLine(0))
        e.load(x2.coefficients.extractLine(0))

        let â = fft(a);
        let ê = fft(e);

        let ô = CpxTab.multiply(â, ê);

        return ifft(ô);
    }

    // retrieveXFromP1(y:number){
    //     return (y - this.coefficients[0]) / this.coefficients[1]
    // } 
}