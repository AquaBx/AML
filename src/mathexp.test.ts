import { expect, test } from 'vitest'
import { AMLMaths } from './mathexp'

test('', () => {
    let n0 = new AMLMaths.Integer(2)
    let n1 = new AMLMaths.Integer(3)
    let n2 = AMLMaths.Pi.getInstance()

    let n3 = AMLMaths.multiply(n1,n2)

    let n4 = AMLMaths.divide(n3,n0)

    let n5 = new AMLMaths.Cos(n4)

    console.log(n5.toString(),n5.evaluate())
})
