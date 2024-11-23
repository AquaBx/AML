export class Complex {
    constructor ( public real:number=0, public imaginary:number = 0){}

    get conjugue() { 
        return new Complex(this.real,-this.imaginary)
    }

    multiply(c : Complex) {
        let r = this.real * c.real - this.imaginary * c.imaginary
        let i = this.real * c.imaginary + this.imaginary * c.real
        return new Complex( r, i )
    }

    add(c : Complex) {
        let r = this.real + c.real
        let i = c.imaginary + this.imaginary
        return new Complex( r, i )
    }

    isReal(){
        return this.imaginary === 0
    }

    isImaginary(){
        return this.real === 0
    }

    toString() {
        if (this.isReal()){
            return `${this.real}`
        }
        else if (this.isImaginary()){
            return `${this.imaginary}i`
        }

        return `${this.real}${this.imaginary < 0 ? '' : '+'}${this.imaginary}i`
    }

}