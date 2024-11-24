import { expect, test } from 'vitest'
import { fft, ifft, CpxTab } from './fft';
import { Float } from './float';

let t5 = new CpxTab(4);
let t5f = [1,2,3,4].map((i) => new Float(i))
t5.load(t5f);
let f = fft(t5);
let iff = ifft(f);

test('CpxTab', () => {
    expect(t5.toString()).toBe("[ 1 2 3 4 ]")
})

test('CpxTab', () => {
    let c = new CpxTab(4)
    expect(c.toString()).toBe("[ 0 0 0 0 ]")
    expect(c.taille()).toBe(4)

    c.load(t5f)

    expect(c.taille()).toBe(4)
    expect(c.toString()).toBe("[ 1 2 3 4 ]")
})

test('CpxTab plus grand', () => {
    let c = new CpxTab(5)
    expect(c.toString()).toBe("[ 0 0 0 0 0 ]")
    expect(c.taille()).toBe(5)

    c.load(t5f)
    
    expect(c.taille()).toBe(5)
    expect(c.toString()).toBe("[ 1 2 3 4 0 ]")
})

test('CpxTab', () => {
    expect(CpxTab.multiply(t5,t5).toString()).toBe("[ 1 4 9 16 ]")
})

test('CpxTab plus petit', () => {
    let c = new CpxTab(2)
    expect(c.toString()).toBe("[ 0 0 ]")
    expect(c.taille()).toBe(2)
    
    expect(()=>c.load(t5f)).toThrowError("le tableau à charger doit être plus petit ou égal à la taille du tableau Complex")
})

test('fft', () => {
    expect(f.toString()).toBe("[ 10 -2-2i -2 -2+2i ]")
})

test('ifft', () => {
    expect(iff.toString()).toBe("[ 1 2 3 4 ]")
})

test('FFT tableau de taille 2**n', () => {
    let c = new CpxTab(3)
    
    expect(()=>fft(c)).toThrowError("FFT: la taille de x doit être une puissance de 2")
})