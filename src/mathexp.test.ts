import {test} from 'vitest'
import {AMLMaths} from './mathexp'
import Pi = AMLMaths.Pi;

test('', () => {
    let n0 = new AMLMaths.Integer(2)
    let n1 = new AMLMaths.Integer(3)
    let n2 = AMLMaths.Pi.getInstance()

    let n3 = AMLMaths.multiply(n1, n1)
    let n4 = AMLMaths.multiply(n2, n3)

    let n5 = AMLMaths.divide(n4, n0)

    let n6 = new AMLMaths.Cos(n5)

    console.log(n6.toString(), n6.evaluate())
})

test('', () => {
    let n0 = new AMLMaths.Integer(-6)
    let n1 = new AMLMaths.Integer(4)

    let n5 = AMLMaths.divide(n0, n1)

    console.log(n5.toString(), n5.evaluate())
})

test('', () => {
    let n0 = new AMLMaths.Integer(-6)
    let n1 = new AMLMaths.Integer(4)
    let n5 = AMLMaths.multiply(n0,n1)

    console.log(n5.toString(), n5.evaluate())
})

test('', () => {
    let n0 = new AMLMaths.Integer(-6)
    let n1 = Pi.getInstance()
    let n2 = new AMLMaths.Integer(4)
    let n3 = AMLMaths.multiply(n0,n1)
    let n4 = AMLMaths.multiply(n3,n2)

    console.log(n4.toString(), n4.evaluate())
})

test('', () => {
    let n0 = new AMLMaths.Integer(-6)
    let n1 = new AMLMaths.Integer(4)
    let pi = AMLMaths.Pi.getInstance()

    let n2 = AMLMaths.subtract(n0, pi)
    let n3 = AMLMaths.add(n1, pi)
    let n4 = AMLMaths.divide(n3, pi)
    let n5 = AMLMaths.multiply(n2,n3)

    console.log(n5.toString(), n5.evaluate())
})