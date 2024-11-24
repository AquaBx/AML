import { pgcd } from "./arithmetic"

export class Float {

    private numerateur:number
    private denominateur:number

    constructor (n : number, d : number = 1) {
        if (d==0) {
            throw new Error("Division by 0")
        }

        this.simplify(n * Math.sign(d),d * Math.sign(d))
    }

    private simplify(n:number,d:number) {
        let div = pgcd(n,d)
        this.numerateur = n/div
        this.denominateur = d/div
    }

    toString() {
        if (this.denominateur === 1){
            return `${this.numerateur}`
        }
        return `${this.numerateur}/${this.denominateur}`
    }

    toNumber() {
        return this.numerateur/this.denominateur
    }

    static multiply(f1:Float, f2:Float){
        return new Float(f2.numerateur*f1.numerateur,f2.denominateur*f1.denominateur)
    }

    static add(f1:Float, f2:Float){
        return new Float(f2.numerateur*f1.denominateur + f1.numerateur*f2.denominateur,f2.denominateur*f1.denominateur)
    }

    static substract(f1:Float, f2:Float){
        return this.add( f1, f2.opposite() )
    }

    static divide(f1:Float, f2:Float){
        return this.multiply(f1,f2.inverse())
    }

    inverse(){
        return new Float(this.denominateur,this.numerateur)
    }

    opposite(){
        return new Float(-this.numerateur,this.denominateur)
    }

}