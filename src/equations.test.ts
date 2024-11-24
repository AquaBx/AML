import { expect, test } from 'vitest'
import {Float} from './float'
import { Equation } from './equations';

test('Eq retrieve y', () => {
  let a = new Equation([2,4,-5].map((i) => new Float(i)))
  expect(a.retrieveY(3)).toStrictEqual(new Float(-5 * 3 * 3 + 4 * 3 + 2))
})

test('Eq1', () => {

  let a = new Equation([2].map((i) => new Float(i)))
  let b = new Equation([-3].map((i) => new Float(i)))
  let c = new Equation([-6,0].map((i) => new Float(i)))

  expect(Equation.multiply(a,b).toString()).toStrictEqual("[ -6 0 ]")
})

test('Eq2', () => {
  
  let a = new Equation([2,1].map((i) => new Float(i)))
  let b = new Equation([-3,2].map((i) => new Float(i)))
  let c = new Equation([-6,1,2,0].map((i) => new Float(i)))
  
  expect(Equation.multiply(a,b).toString()).toStrictEqual("[ -6 1 2 0 ]")
  })
  
test('Eq3', () => {

  let a = new Equation([1,2,3,4].map((i) => new Float(i)))
  let b = new Equation([-3,2,-5,0].map((i) => new Float(i)))
  let c = new Equation([-3,-4,-10,-16,-7,-20,0,0].map((i) => new Float(i)))
  
  expect(Equation.multiply(a,b).toString()).toStrictEqual("[ -3 -4 -10 -16 -7 -20 0 0 0 0 0 0 0 0 0 0 ]")
})