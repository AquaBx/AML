import { expect, test } from 'vitest'
import { fft, fftInverse, CpxTab } from './fft';
import { Float } from './float';


test('fft(1,2,3,4)', () => {
    let t5 = new CpxTab(4);
    t5.load([1,2,3,4].map((i) => new Float(i)));

    let f = fft(t5);
    let iff = fftInverse(f);

    expect(f.toString()).toBe("[ 10 -2-2i -2 -2+2i ]")
    expect(iff.toString()).toBe("[ 1 2 3 4 ]")
})