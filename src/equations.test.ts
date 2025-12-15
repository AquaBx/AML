import { expect, test } from 'vitest'
import { Float } from './float'
import { Equation } from './equations';
import { Matrix } from './matrix';

test('Eq retrieve y', () => {
  let a = new Equation(new Matrix([[2, 4, -5].map((i) => new Float(i))]))
  expect(a.evaluate(new Matrix([[new Float(3)]]))).toStrictEqual(new Float(-5 * 3 * 3 + 4 * 3 + 2))
})

test('Eq1', () => {

  let a = new Equation(new Matrix([[2].map((i) => new Float(i))]))
  let b = new Equation(new Matrix([[-3].map((i) => new Float(i))]))
  let c = new Equation(new Matrix([[-6, 0].map((i) => new Float(i))]))

  expect(Equation.multiply(a, b).toString()).toStrictEqual("[ -6 0 ]")
})

test('Eq2', () => {

  let a = new Equation(new Matrix([[2, 1].map((i) => new Float(i))]))
  let b = new Equation(new Matrix([[-3, 2].map((i) => new Float(i))]))
  let c = new Equation(new Matrix([[-6, 1, 2, 0].map((i) => new Float(i))]))

  expect(Equation.multiply(a, b).toString()).toStrictEqual("[ -6 1 2 0 ]")
})

test('Eq3', () => {

  let a = new Equation(new Matrix([[1, 2, 3, 4].map((i) => new Float(i))]))
  let b = new Equation(new Matrix([[-3, 2, -5, 0].map((i) => new Float(i))]))
  let c = new Equation(new Matrix([[-3, -4, -10, -16, -7, -20, 0, 0].map((i) => new Float(i))]))
  
  expect(Equation.multiply(a, b).toString()).toStrictEqual("[ -3 -4 -10 -16 -7 -20 0 0 0 0 0 0 0 0 0 0 ]")
})