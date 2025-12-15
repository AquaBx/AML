import {expect, test} from 'vitest'
import {IdentityMatrix, Matrix} from './matrix'
import {Float} from './float'

let AVals = [[new Float(1), new Float(2)], [new Float(0), new Float(1)]]
let A = new Matrix(AVals)
let Ap = A.inverse()

test('Identity', () => {
    let res = new Matrix([
        [1, 0, 0].map(n => new Float(n)),
        [0, 1, 0].map(n => new Float(n)),
    ])

    expect((new IdentityMatrix(2, 3)).get_matrix()).toStrictEqual(res.get_matrix())
})

test('Getter', () => {
    expect(A.dimensions().toString()).toBe("{2, 2}")
    expect(A.get_matrix()).toStrictEqual(AVals)
})

test('Inverse', () => {
    let res = new Matrix([
        [1, -2].map(n => new Float(n)),
        [0, 1].map(n => new Float(n)),
    ])

    expect(Ap.dimensions().toString()).toBe("{2, 2}")
    expect(Ap.get_matrix()).toStrictEqual(res.get_matrix())
})

test('Multiplication', () => {
    expect(Matrix.multiply(A, Ap).get_matrix()).toStrictEqual((new IdentityMatrix(2, 2)).get_matrix())
})

test('Sum', () => {
    let res = new Matrix([
        [2, 0].map(n => new Float(n)),
        [0, 2].map(n => new Float(n)),
    ])

    expect(Matrix.add(A, Ap).get_matrix()).toStrictEqual(res.get_matrix())
})

test('OutOfBounds', () => {
    expect(A.inBounds(0, 0)).toBe(true)
    expect(A.inBounds(1, 1)).toBe(true)
    expect(A.inBounds(1, 2)).toBe(false)
    expect(A.inBounds(1, -1)).toBe(false)
})

test('Simplify', () => {
    let test = new Matrix([[new Float(1), new Float(4), new Float(6)], [new Float(1), new Float(3), new Float(2)], [new Float(0), new Float(0), new Float(0)]])

    let res = new Matrix([
        [1, 0, -10].map(n => new Float(n)),
        [0, 1, 4].map(n => new Float(n)),
        [0, 0, 0].map(n => new Float(n))
    ])

    expect(test.simplify().get_matrix()).toStrictEqual(res.get_matrix())
})