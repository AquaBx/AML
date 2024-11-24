import { expect, test } from 'vitest'
import { Matrix, IdentityMatrix, PolynomeMatrix } from './matrix'

let AVals = [[1,2],[0,1]]
let A = new Matrix(AVals)
let Ap = A.inverse()

test('Identity', () => {
    expect((new IdentityMatrix(2,3)).get_matrix()).toStrictEqual([[1,0,0],[0,1,0]])
})

test('Polynome', () => {
    expect((new PolynomeMatrix([2,3],3)).get_matrix()).toStrictEqual([[8,4,2,1],[27,9,3,1]])
})

test('Getter', () => {
    expect(A.dimensions().toString()).toBe("{2, 2}")
    expect(A.get_matrix()).toStrictEqual(AVals)
})

test('Inverse', () => {
    expect(Ap.dimensions().toString()).toBe("{2, 2}")
    expect(Ap.get_matrix()).toStrictEqual([[1,-2],[0,1]])
})

test('Multiplication', () => {
    expect(Matrix.multiply(A,Ap).get_matrix()).toStrictEqual((new IdentityMatrix(2,2)).get_matrix())
})

test('Sum', () => {
    expect(Matrix.add(A,Ap).get_matrix()).toStrictEqual([[2,0],[0,2]])
})