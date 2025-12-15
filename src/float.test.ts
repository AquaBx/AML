import { expect, test } from 'vitest'
import { E, Float, PI } from './float'

test('6/2 = 3', () => {
    expect((new Float(6, 2)).toNumber()).toBe(3)
})

test('1/0 = Error', () => {
    expect(() => (new Float(1, 0))).toThrowError("Division by 0")
})

test('2/1^10 = 1024/1', () => {
    expect(Float.pow(new Float(2, 1),10).toNumber()).toBe(1024)
})

test('3/-2 = -3/2', () => {
    let f1 = new Float(3, -2)
    let f2 = new Float(-3, 2)

    expect(f1).toStrictEqual(f2)
    expect(f1.toNumber()).toBe(-1.5)
})

test('0/2 = 0', () => {
    let f1 = new Float(0, 1)
    let f2 = new Float(0, 2)

    expect(f1).toStrictEqual(f2)
    expect(f1.toNumber()).toBe(0)
})

test('-1/1 = -1', () => {
    expect((new Float(-1, 1)).toNumber()).toBe(-1)
})

test('1/0 = Error', () => {
    expect(() => new Float(1, 0)).toThrowError()
})

test('0/1 . inverse = Error', () => {
    expect(() => (new Float(0, 1)).inverse()).toThrowError("Division by 0")
})

test('2/7 * 3/5  = 6/35', () => {
    let f1 = new Float(2, 7)
    let f2 = new Float(3, 5)
    let r = new Float(6, 35)
    expect(Float.multiply(f1, f2)).toStrictEqual(r)
})

test('2/7 + 3/5  = 31/35', () => {
    let f1 = new Float(2, 7)
    let f2 = new Float(3, 5)
    let r = new Float(31, 35)
    expect(Float.add(f1, f2)).toStrictEqual(r)
})

test('toString', () => {
    let f1 = new Float(-2, 7)
    let f2 = new Float(1)
    expect(f1.toString()).toBe("-2/7")
    expect(f2.toString()).toBe("1")
})

test('Constants', () => {
    expect(Math.PI).toBe(PI.toNumber())
    expect(Math.E).toBe(E.toNumber())
})