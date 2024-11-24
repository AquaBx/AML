import { expect, test } from 'vitest'
import {Complex} from './complex'
import { Float } from './float'

test('Complex(1,1) is not real and imaginary', () => {
  let c = new Complex(new Float(1),new Float(1))
  expect(c.isReal()).toBe(false)
  expect(c.isImaginary()).toBe(false)
})

test('Complex(1,0) is real', () => {
  let c = new Complex(new Float(1),new Float(0))
  expect(c.isReal()).toBe(true)
  expect(c.isImaginary()).toBe(false)
})

test('Complex(0,1) is imaginary', () => {
  let c = new Complex(new Float(0),new Float(1))
  expect(c.isReal()).toBe(false)
  expect(c.isImaginary()).toBe(true)
})

test('Conjugue', () => {
  let a = new Complex(new Float(1),new Float(1))
  let â = new Complex(new Float(1),new Float(-1))
  expect(a.conjugue).toStrictEqual(â)
})

test('toString', () => {
  let â0 = new Complex(new Float(1),new Float(-1))
  let â1 = new Complex(new Float(1),new Float(1))
  let â2 = new Complex(new Float(-1))
  let â3 = new Complex(new Float(0),new Float(-1))
  expect(â0.toString()).toBe("1-1i")
  expect(â1.toString()).toBe("1+1i")
  expect(â2.toString()).toBe("-1")
  expect(â3.toString()).toBe("-1i")
})

test('add', () => {
  let a = new Complex(new Float(1),new Float(1))
  let â = new Complex(new Float(1),new Float(-1))
  let r = new Complex(new Float(2),new Float(0))
  expect(Complex.add(a,â)).toStrictEqual(r)
})

test('multiply', () => {
  let a = new Complex(new Float(1),new Float(1))
  let â = new Complex(new Float(1),new Float(-1))
  let r = new Complex(new Float(2),new Float(0))
  expect(Complex.multiply(a,â)).toStrictEqual(r)
})