import { expect, test } from 'vitest'
import {pgcd} from './arithmetic'

test('pgcd(3,1)=1', () => {
  expect(pgcd(3,1)).toBe(1)
  expect(pgcd(1,3)).toBe(1)
})

test('pgcd(3,0)=3', () => {
    expect(pgcd(3,0)).toBe(3)
    expect(pgcd(0,3)).toBe(3)
})

test('pgcd(100,19)=1', () => {
    expect(pgcd(100,19)).toBe(1)
})
  
  