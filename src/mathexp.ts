export namespace AMLMaths {
    
    interface Number {
        evaluate() : number
        toString() : string
    }
    
    /* Operators */
    
    interface Operator {
        evaluate(n1:Number,n2:Number) : number
        toString() : string
        //getInstance() : Operator
    }
    
    class DivisionOperator implements Operator {
        private static singleton?:DivisionOperator
        
        public static getInstance(){
            if (!DivisionOperator.singleton){
                DivisionOperator.singleton = new DivisionOperator()
            }

            return DivisionOperator.singleton
        }

        evaluate(n1:Number,n2:Number) : number { return n1.evaluate() / n2.evaluate()}
        toString() : string { return "/"}
    }

    class MultiplyOperator {
        private static singleton?:MultiplyOperator
        
        public static getInstance(){
            if (!MultiplyOperator.singleton){
                MultiplyOperator.singleton = new MultiplyOperator()
            }

            return MultiplyOperator.singleton
        }

        evaluate(n1:Number,n2:Number) : number { return n1.evaluate() * n2.evaluate()}
        toString() : string { return "×"}
    }

    class SubstractOperator {
        private static singleton?:SubstractOperator
        
        public static getInstance(){
            if (!SubstractOperator.singleton){
                SubstractOperator.singleton = new SubstractOperator()
            }

            return SubstractOperator.singleton
        }

        evaluate(n1:Number,n2:Number) : number { return n1.evaluate() - n2.evaluate()}
        toString() : string { return "-"}
    }

    class AddOperator {
        private static singleton?:AddOperator
        
        public static getInstance(){
            if (!AddOperator.singleton){
                AddOperator.singleton = new AddOperator()
            }

            return AddOperator.singleton
        }

        evaluate(n1:Number,n2:Number) : number { return n1.evaluate() + n2.evaluate()}
        toString() : string { return "+"}
    }

    class PowOperator {
        private static singleton?:PowOperator
        
        public static getInstance(){
            if (!PowOperator.singleton){
                PowOperator.singleton = new PowOperator()
            }

            return PowOperator.singleton
        }

        evaluate(n1:Number,n2:Number) : number { return n1.evaluate() ** n2.evaluate()}
        toString() : string { return "^"}
    }

    /* Operations */

    export function divide(n1:Number,n2:Number){
        return new Expression(n1,DivisionOperator.getInstance(),n2)
    }

    export function multiply(n1:Number,n2:Number){
        return new Expression(n1,MultiplyOperator.getInstance(),n2)
    }

    export function add(n1:Number,n2:Number){
        return new Expression(n1,AddOperator.getInstance(),n2)
    }

    export function substract(n1:Number,n2:Number){
        return new Expression(n1,SubstractOperator.getInstance(),n2)
    }

    export function pow(n1:Number,n2:Number){
        return new Expression(n1,PowOperator.getInstance(),n2)
    }

    /* NumberType */

    class Expression implements Number {

        constructor (
            private ng:Number,
            private op:Operator,
            private nd:Number
        ) {}

        evaluate() {
            return this.op.evaluate(this.ng,this.nd)
        }
        toString() : string {
            return `(${this.ng.toString()} ${this.op.toString()} ${this.nd.toString()})`
        }

    }

    export class Integer implements Number {
        constructor (public n : number){
            this.n = Math.round(n)
        }
        evaluate() {
            return this.n
        }
        toString(): string {
            return this.n.toString()
        }
    }

    export class Pi implements Number {
        private static singleton?:Pi
        
        public static getInstance(){
            if (!Pi.singleton){
                Pi.singleton = new Pi()
            }

            return Pi.singleton
        }

        evaluate() : number {
            return Math.PI
        }

        toString() : string {
            return "π"
        }
    }

    export class E implements Number {
        private static singleton?:E
        
        public static getInstance(){
            if (!E.singleton){
                E.singleton = new E()
            }

            return E.singleton
        }

        evaluate() {
            return Math.E
        }
        toString(): string {
            return "e"
        }
    }

    /* TrigoNumberTypes */
    //⁰¹²³⁴⁵⁶⁷⁸⁹ⁱ⁺⁻"

    abstract class TrigonometricFormula implements Number {
        constructor(protected theta : Number) {}
        abstract evaluate(): number
        abstract toString(): string
    }

    export class Sin extends TrigonometricFormula {
        evaluate() {
            return Math.sin( this.theta.evaluate() )
        }
        toString() : string {
            return `sin(${this.theta.toString()})`
        }
    }

    export class Cos extends TrigonometricFormula {
        evaluate() {
            return Math.cos( this.theta.evaluate() )
        }
        toString() : string {
            return `cos(${this.theta.toString()})`
        }
    }

    export class Tan extends TrigonometricFormula {
        evaluate() {
            return Math.tan( this.theta.evaluate() )
        }
        toString() : string {
            return `tan(${this.theta.toString()})`
        }
    }

    export class ASin extends TrigonometricFormula {
        evaluate() {
            return Math.asin( this.theta.evaluate() )
        }
        toString() : string {
            return `asin(${this.theta.toString()})`
        }
    }

    export class ACos extends TrigonometricFormula {
        evaluate() {
            return Math.acos( this.theta.evaluate() )
        }
        toString() : string {
            return `acos(${this.theta.toString()})`
        }
    }

    export class ATan extends TrigonometricFormula {
        evaluate() {
            return Math.atan( this.theta.evaluate() )
        }
        toString() : string {
            return `atan(${this.theta.toString()})`
        }
    }

    // class Variable implements Number {
    //     constructor (public id : string){super()}
    // }

}