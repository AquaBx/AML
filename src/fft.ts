import {Complex} from "./complex";
import {Float, PI} from "./float";

export class CpxTab {

    private tab: Complex[]

    constructor(n: number) {
        this.tab = (new Array<Complex>(n)).fill(new Complex(new Float(0)))
    }

    static multiply(c1: CpxTab, c2: CpxTab) {
        let newTab = new CpxTab(c1.taille())
        for (let i = 0; i < c1.taille(); i++) {
            newTab.set(i, Complex.multiply(c1.get(i), c2.get(i)))
        }
        return newTab
    }

    load(x: Float[]) {
        if (x.length > this.tab.length) {
            throw new Error("le tableau à charger doit être plus petit ou égal à la taille du tableau Complex")
        }

        for (let i = 0; i < x.length; i++) {
            this.tab[i] = new Complex(x[i])
        }
    }

    toString() {
        return `[ ${this.tab.join(" ")} ]`
    }

    get(i: number) {
        return this.tab[i]
    }

    set(i: number, c: Complex) {
        this.tab[i] = c
    }

    taille() {
        return this.tab.length
    }

    conjugue() {
        let newTab = new CpxTab(this.taille())
        for (let i = 0; i < this.taille(); i++) {
            newTab.set(i, this.get(i).conjugue)
        }
        return newTab
    }
}

export function fftCombine(c1: CpxTab, c2: CpxTab): CpxTab {

    if (c1.taille() != c2.taille()) {
        throw new Error(`combine: c1 et c2 ne sont pas de même taille, taille c1=${c1.taille()} taille c2=${c2.taille()}`)
    }

    let m = c1.taille();
    let n = m * 2;

    let retour = new CpxTab(m * 2);

    for (let k = 0; k < m; k++) {

        let v = Float.multiply(new Float(2 * k, n), PI)
        let Wnr = Math.cos(v.toNumber())
        let Wni = Math.sin(v.toNumber())

        let Wn = new Complex(new Float(Wnr), new Float(Wni))

        let a2 = Complex.multiply(Wn, c2.get(k))

        retour.set(k, Complex.add(c1.get(k), a2))
        retour.set(k + m, Complex.substract(c1.get(k), a2))
    }
    return retour;
}

export function fft(x: CpxTab): CpxTab {
    let n = x.taille();

    if (n == 1) {
        return x;
    } else if (n % 2 !== 0) {
        throw new Error(`FFT: la taille de x doit être une puissance de 2`)
    }

    let Apair = new CpxTab(n / 2);
    let Aimpair = new CpxTab(n / 2);

    // partie pair
    for (let i = 0; i < n; i += 2) {
        Apair.set(i / 2, x.get(i))
    }
    // partie impair
    for (let i = 1; i < n; i += 2) {
        Aimpair.set((i - 1) / 2, x.get(i))
    }

    let yPair = fft(Apair);
    let yImpair = fft(Aimpair);

    return fftCombine(yPair, yImpair);
}

export function ifft(y: CpxTab): CpxTab {

    let t = y.taille()
    let taille = new CpxTab(t);

    for (let i = 0; i < t; i++) {
        taille.set(i, new Complex(new Float(1, t)))
    }

    let step1 = y.conjugue()
    let step2 = fft(step1)
    let step3 = step2.conjugue()

    return CpxTab.multiply(taille, step3);
}	

