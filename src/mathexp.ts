import {Float} from "./float";
import {pgcd} from "./arithmetic";

export namespace AMLMaths {

    abstract class Number {
        abstract evaluate(): number

        abstract toString(): string
    }

    /* Operations */

    export function divide(n1: Number, n2: Number) {
        if (n1 instanceof Division) {
            let last = n1.numbers.pop()
            n1.numbers.push( multiply(last,n2) )
            return n1
        }
        else if (n1 instanceof Integer && n2 instanceof Integer) {
            if (n1.n % n2.n === 0) return new Integer(n1.n / n2.n)
            let pgcd12 = pgcd(n1.n,n2.n)

            return new Division([ new Integer(n1.n / pgcd12), new Integer(n2.n / pgcd12) ])
        }
        return new Division([n1,n2])
    }

    export function multiply(n1: Number, n2: Number) {
        if (n1 instanceof Division) {
            let first = n1.numbers[0]
            let n3 = multiply(first,n2)
            n1.numbers.push(n3)
            return n1
        }
        else if (n2 instanceof Multiplication) {
            n2.numbers.push(n1)
            return n2
        }
        else if (n1 instanceof Multiplication) {
            n1.numbers.push(n2)
            return n1
        }
        else if (n1 instanceof Addition) {
            return new Addition( n1.numbers.map(e => multiply(n2,e)) )
        }
        else if (n1 instanceof Subtraction) {
            return new Subtraction( n1.numbers.map(e => multiply(n2,e)) )
        }
        else if (n1 instanceof Integer && n2 instanceof Integer) {
            return new Integer(n1.n * n2.n)
        }

        return new Multiplication([n1,n2])
    }

    export function add(n1: Number, n2: Number) {
        if (n1 instanceof Addition) {
            n1.numbers.push(n2)
            return n1
        }
        else if (n2 instanceof Addition) {
            n2.numbers.push(n1)
            return n2
        }
        else if (n1 instanceof Integer && n2 instanceof Integer) {
            return new Integer(n1.n + n2.n)
        }

        return new Addition([n1,n2])
    }

    export function subtract(n1: Number, n2: Number) {
        if (n1 instanceof Subtraction) {
            n1.numbers.push(n2)
            return n1
        }
        /*else if (n2 instanceof Addition) {
            n2.numbers.push(n1)
            return n2
        }*/
        else if (n1 instanceof Integer && n2 instanceof Integer) {
            return new Integer(n1.n - n2.n)
        }
        return new Subtraction([n1,n2])
    }

    export function pow(n1: Number, n2: Number) {
        if (n1 instanceof Power) {
            let last = n1.numbers.pop()
            n1.numbers.push( multiply(last,n2) )
            return n1
        }
        else if (n1 instanceof Integer && n2 instanceof Integer) {
            return new Integer(n1.n ** n2.n)
        }
        return new Power([n1,n2])
    }

    /* NumberType */

    abstract class Expression extends Number {

        constructor(
            public numbers: Number[]
        ) {
            super()
        }

        protected bunch(op:(acc:number,b:number)=>number){
            return this.numbers.slice(1).reduce((acc:number, curr:Number) => op(acc,curr.evaluate()),this.numbers[0].evaluate())
        }

        protected toStringCustom(op:string): string {
            return "(" + this.numbers.join(op) + ")"
        }

    }

    class Division extends Expression {
        evaluate() {
            let l = (a:number,b:number)=> {
                return a / b
            }
            return this.bunch(l)
        }
        toString(): string {
            return this.toStringCustom("/");
        }
    }

    class Multiplication extends Expression {
        evaluate() {
            let l = (a:number,b:number)=> {
                return a * b
            }
            return this.bunch(l)
        }
        toString(): string {
            return this.toStringCustom("*");
        }
    }

    class Addition extends Expression {
        evaluate() {
            let l = (a:number,b:number)=> {
                return a + b
            }
            return this.bunch(l)
        }
        toString(): string {
            return this.toStringCustom("+");
        }
    }

    class Subtraction extends Expression {
        evaluate() {
            let l = (a:number,b:number)=> {
                return a - b
            }
            return this.bunch(l)
        }
        toString(): string {
            return this.toStringCustom("-");
        }
    }

    class Power extends Expression {
        evaluate() {
            let l = (a:number,b:number)=> {
                return a ** b
            }
            return this.bunch(l)
        }
        toString(): string {
            return this.toStringCustom("^");
        }
    }

    export class Integer extends Number {
        constructor(public n: number) {
            super()
            this.n = Math.round(n)
        }

        evaluate() {
            return this.n
        }

        toString(): string {
            return this.n.toString()
        }
    }

    export class Pi extends Number {
        private static singleton?: Pi

        public static getInstance() {
            if (!Pi.singleton) {
                Pi.singleton = new Pi()
            }

            return Pi.singleton
        }

        evaluate(): number {
            return Math.PI
        }

        toString(): string {
            return "π"
        }
    }

    export class E extends Number {
        private static singleton?: E

        public static getInstance() {
            if (!E.singleton) {
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

    abstract class TrigonometricFormula extends Number {
        constructor(protected theta: Number) {
            super()
        }

        abstract evaluate(): number

        abstract toString(): string
    }

    export class Sin extends TrigonometricFormula {
        evaluate() {
            return Math.sin(this.theta.evaluate())
        }

        toString(): string {
            return `sin(${this.theta.toString()})`
        }
    }

    export class Cos extends TrigonometricFormula {
        evaluate() {
            return Math.cos(this.theta.evaluate())
        }

        toString(): string {
            return `cos(${this.theta.toString()})`
        }
    }

    export class Tan extends TrigonometricFormula {
        evaluate() {
            return Math.tan(this.theta.evaluate())
        }

        toString(): string {
            return `tan(${this.theta.toString()})`
        }
    }

    export class ASin extends TrigonometricFormula {
        evaluate() {
            return Math.asin(this.theta.evaluate())
        }

        toString(): string {
            return `asin(${this.theta.toString()})`
        }
    }

    export class ACos extends TrigonometricFormula {
        evaluate() {
            return Math.acos(this.theta.evaluate())
        }

        toString(): string {
            return `acos(${this.theta.toString()})`
        }
    }

    export class ATan extends TrigonometricFormula {
        evaluate() {
            return Math.atan(this.theta.evaluate())
        }

        toString(): string {
            return `atan(${this.theta.toString()})`
        }
    }

    // class Variable implements Number {
    //     constructor (public id : string){super()}
    // }

}