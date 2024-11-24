import { expect, test } from 'vitest'
import {Float} from './float'
import { CpxTab } from './fft';
import { Equation } from './equations';

test('Eq1', () => {

  let a = new Equation([2].map((i) => new Float(i)))
  let b = new Equation([-3].map((i) => new Float(i)))
  let c = new Equation([-6,0].map((i) => new Float(i)))

  expect(Equation.multiply(a,b).toString()).toStrictEqual("[ -6 0 ]")
})



/* Exo 4: multiplication polynomiale, vérification*/
/* A(X) = 2 et B(X)=-3 */
/*

double[] A1 = {2};
double[] B1 = {-3};

CpxTab p1 = multiplication_polynome_viaFFT(A1,B1);
System.out.println(p1);
*/


/* A(X) = 2+X et B(X)= -3+2X */
//A FAIRE

/*
    double[] A2 = {2,1};
    double[] B2 = {-3,2};

    CpxTab p2 = multiplication_polynome_viaFFT(A2,B2);
    System.out.println(p2);
*/

    /* A(X) = 1 + 2X + 3X^2 + 4X^3 et B(X) = -3 + 2X - 5 X^2*/
/*

double[] t6 = {-3,2,-5,0};
*/