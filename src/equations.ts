import { Complex } from "./complex"

class FFT {
    static fft() {

    }

    static fftReversed(){

    }

    static private 
}

export class Equation {
    constructor ( protected coefficients:number[] ){}

    retrieveY(x:number) {
        let sum = 0
        for (let i = 0; i < this.coefficients.length; i++){
            sum += this.coefficients[i] * x**i
        }
        return sum
    }

    retrieveXFromP2(y:number){
        let a = this.coefficients[2]
        let b = this.coefficients[1]
        let c = this.coefficients[0]
        let delta = b**2 - 4 * a * c
        
        let x1,x2

        if (delta >= 0){
            x1 = new Complex( (b - Math.sqrt(delta)) / (2 * a) )
            x2 = new Complex( (b + Math.sqrt(delta)) / (2 * a) )
        }
        else {
            x1 = new Complex(b / (2 * a), - Math.sqrt(delta) / (2 * a) )
            x2 = new Complex(b / (2 * a),   Math.sqrt(delta) / (2 * a) )
        }
        
        return [x1,x2]
    } 

    retrieveXFromP1(y:number){
        return (y - this.coefficients[0]) / this.coefficients[1]
    } 
}

export class LinearEquation extends Equation {

    constructor (x1:number,x2:number,y1:number,y2:number){
        let a = (y2-y1)/(x2-x1)
        let b = y1 - a * x1
        super([b,a])
    }

    get a() {
        return this.coefficients[1]
    }

    get b() {
        return this.coefficients[0]
    }

    retrieveX(y:number){
        return this.retrieveXFromP1(y)
    }

    projection(x:number,y:number){
        let nx
        let ny

        return [nx,ny]
    }
}
