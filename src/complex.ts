import { Float } from "./float"

export class Complex {

    constructor ( public real:Float=new Float(0,1), public imaginary:Float = new Float(0,1)){}

    get conjugue() { 
        return new Complex(this.real,this.imaginary.opposite())
    }

    static multiply(c1 : Complex, c2 : Complex) {
        let r = Float.substract(Float.multiply(c1.real,c2.real),Float.multiply(c1.imaginary,c2.imaginary))
        let i = Float.add(Float.multiply(c1.real,c2.imaginary),Float.multiply(c1.imaginary,c2.real))
        return new Complex( r, i )
    }

    static add(c1 : Complex,c2 :Complex) {
        let r = Float.add(c1.real,c2.real)
        let i = Float.add(c1.imaginary,c2.imaginary)
        return new Complex( r, i )
    }

    static substract(c1 : Complex,c2 :Complex) {
        let r = Float.substract(c1.real,c2.real)
        let i = Float.substract(c1.imaginary,c2.imaginary)
        return new Complex( r, i )
    }

    isReal(){
        return this.imaginary.toNumber() === 0
    }

    isImaginary(){
        return this.real.toNumber() === 0
    }

    toString() {

        let a = parseFloat(this.real.toNumber().toFixed(4))
        let b = parseFloat(this.imaginary.toNumber().toFixed(4))
        let sb = b < 0 ? '-' : '+'

        if (b==0){
            return `${a}`
        }
        else if (a==0){
            return `${b}i`
        }

        return `${a}${sb}${Math.abs(b)}i`
    }

}