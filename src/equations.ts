import { Complex } from "./complex"
import { fft, fftInverse, CpxTab } from "./fft"
import { Float } from "./float"

export class Equation {
    constructor ( protected coefficients:Float[] ){}

    retrieveY(x:number) {
        let sum = new Float(0)
        for (let i = 0; i < this.coefficients.length; i++){
            let xi = new Float(x**i)
            sum = Float.add(sum, Float.multiply(this.coefficients[i],xi))
        }
        return sum
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

    public static multiply(x1:Equation,x2:Equation){
		let n = Math.ceil( Math.max( x1.coefficients.length, x2.coefficients.length ) / 2 ) * 2 ;

		let a = new CpxTab(n)
		let e = new CpxTab(n)

        for (let i=0;i<n;i++){
            let a1 = i < x1.coefficients.length ? x1.coefficients[i] : new Float(0)
            let e1 = i < x2.coefficients.length ? x2.coefficients[i] : new Float(0)

            a.set(i,new Complex( a1 ))
            e.set(i,new Complex( e1 ))
        }

		let â = fft(a);
		let ê = fft(e);

		let ô = CpxTab.multiply(â,ê);

		return fftInverse(ô);
    }

    // retrieveXFromP1(y:number){
    //     return (y - this.coefficients[0]) / this.coefficients[1]
    // } 
}