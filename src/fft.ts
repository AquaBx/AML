import { Complex } from "./complex";

export class CpxTab {

    private tab : Complex[] = []

    constructor (n:number){
        for (let i=0; i<n;i++){
            this.tab.push(new Complex(0))
        }
    }

    load (x:number[]){
        for (let i = 0 ; i < x.length ; i++){
            this.tab[i] = new Complex(x[i])
        }
    }

    get(i:number) {
        return this.tab[i]
    }

    set(i:number,c:Complex) {
        this.tab[i] = c
    }

    taille() {
        return this.tab.length
    }

    conjugue() {
        let newTab = new CpxTab(this.taille())
        for (let i = 0 ; i < this.taille() ; i++){
            newTab[i] = this.tab[i].conjugue
        }
        return newTab
    }

    multiply(c : CpxTab) {
        let newTab = new CpxTab(this.taille())
        for (let i = 0 ; i < this.taille() ; i++){
            newTab[i] = this.tab[i].multiply( c.get(i) )
        }
        return newTab
    }
}

export function combine(c1 : CpxTab , c2 : CpxTab ) : CpxTab {

    if (c1.taille() != c2.taille()){
        throw new Error(`combine: c1 et c2 ne sont pas de même taille, taille c1=${c1.taille()} taille c2=${c2.taille()}`)
    }

    let m = c1.taille();
    let n = m*2;

    let retour = new CpxTab(m*2);

    for (let k = 0; k < m; k++){

        let Wnr = Math.cos( 2 * Math.PI / n * k );
        let Wni = Math.sin( 2 * Math.PI / n * k );

        let a1 = Wnr * c2.get(k).real - Wni * c2.get(k).imaginary;
        let a2 = Wnr * c2.get(k).imaginary + Wni * c2.get(k).real;

        let nk1r = c1.get(k).real + a1
        let nk1i = c1.get(k).imaginary + a2

        let nk2r = c1.get(k).real - a1
        let nk2i = c1.get(k).imaginary - a2

        retour.set(k, new Complex(nk1r,nk1i))
        retour.set(k+n/2, new Complex(nk2r,nk2i))
    }

    return retour;
}

function  fftRecursive(x:CpxTab) : CpxTab {
    if (x.taille() % 2 !== 0){
        throw new Error(`FFT: la taille de x doit être une puissance de 2`)
    }

    let n = x.taille();

    if (n==1){return x;}

    let Apair = new CpxTab(n/2);
    let Aimpair = new CpxTab(n/2);

    // partie pair
    for ( let i = 0; i < n ; i+=2 ){
        Apair.set(Math.floor(i/2), x.get(i))
    }
    // partie impair
    for ( let i = 1; i < n ; i+=2 ){
        Apair.set(Math.floor(i/2), x.get(i))
    }

    let yPair = fftRecursive(Apair);
    let yImpair = fftRecursive(Aimpair);

    return combine(yPair,yImpair);
}

export function  fft(x : number[]) : CpxTab {
    let x2 = new CpxTab(Math.ceil(x.length/2)*2)
    x2.load(x)
    return fftRecursive(x2);
}
        
function  fftInverseRecursive(y:CpxTab) : CpxTab {
    let taille = new CpxTab(y.taille());

    for (let i=0; i<y.taille() ; i++){
        taille.set(i, new Complex(1/y.taille()))
    }

    return taille.multiply(fftRecursive(y.conjugue()).conjugue());
}

export function fftInverse(x : CpxTab) : CpxTab {
    return fftInverseRecursive(x);
}

