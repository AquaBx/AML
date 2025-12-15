import {Float} from "./float";

class Size {
    constructor(public lines: number, public columns: number) {
    }

    static equals(s1: Size, s2: Size) {
        return s1.lines === s2.lines && s2.columns === s1.columns
    }

    toString() {
        return `{${this.lines}, ${this.columns}}`;
    }
}

export class Matrix {
    constructor(private list: Float[][]) {
        let s = list[0].length;
        for (let i = 1; i < list.length; i++) {
            if (s !== list[i].length) {
                throw "It is not a matrix"
            }
        }
    }

    public static add(m1: Matrix, m2: Matrix) {
        if (!Size.equals(m1.dimensions(), m2.dimensions())) {
            throw "Matrix must be of same dimensions";
        }

        let return_class = new EmptyMatrix(m1.dimensions().lines, m1.dimensions().columns)

        for (let i = 0; i < m1.dimensions().lines; i++) {
            for (let j = 0; j < m1.dimensions().columns; j++) {
                return_class.set(i, j, Float.add(m1.list[i][j], m2.list[i][j]))
            }
        }
        return return_class;
    }

    public static substract(m1: Matrix, m2: Matrix) {
        let m3 = m2.clone()
        m3.operate_by((n:Float) => {
            return n.opposite()
        })
        return Matrix.add(m1, m3);
    }

    public static multiply(m1: Matrix, m2: Matrix) {
        if (m1.dimensions().columns !== m2.dimensions().lines) {
            throw "Matrix must be multiply-able";
        }

        let return_class = new EmptyMatrix(m1.dimensions().lines, m2.dimensions().columns)

        for (let i = 0; i < return_class.dimensions().lines; i++) {
            for (let j = 0; j < return_class.dimensions().columns; j++) {
                let value = new Float(0)

                for (let k = 0; k < m1.dimensions().columns; k++) {
                    value = Float.add(value, Float.multiply(m1.get(i, k), m2.get(k, j)));
                }

                return_class.set(i, j, value)
            }
        }

        return return_class;
    }

    private static descenteGauss(m1: Matrix, inversed: boolean) {
        /*Gauss-Jordan*/
        let dims = m1.dimensions()

        let m = m1.clone()
        let return_matrix = new IdentityMatrix(dims.lines, dims.columns);

        let r = -1

        for (let j = 0; j < dims.columns; j++) {
            let k = 0
            let max = -Infinity

            for (let i = r + 1; i < dims.lines; i++) {
                if (m.get(i, j).toNumber() >= max) {
                    k = i
                    max = m.get(i, j).toNumber()
                }
            }

            let coef = m.get(k, j)
            if (coef.toNumber() !== 0) {
                r++
                m.operate_line_by((n: Float) => {
                    return Float.divide(n, coef)
                }, k)
                return_matrix.operate_line_by((n: Float) => {
                    return Float.divide(n, coef)
                }, k)

                if (k !== r) {
                    m.swap_lines(k, r)
                    return_matrix.swap_lines(k, r)
                }
                for (let i = 0; i < dims.lines; i++) {
                    let coef2 = m.get(i, j)
                    if (i !== r) {
                        for (let o = 0; o < dims.columns; o++) {
                            let c3 = Float.multiply(coef2, return_matrix.get(r, o))
                            let c2 = Float.multiply(coef2, m.get(r, o))
                            return_matrix.set(i, o, Float.substract(return_matrix.get(i, o), c3))
                            m.set(i, o, Float.substract(m.get(i, o), c2))

                        }
                    }
                }
            }
        }

        return inversed ? return_matrix : m;
    }

    public get_matrix(): Float[][] {
        return this.list;
    }

    public dimensions(): Size {
        return new Size(this.list.length, this.list[0].length);
    }

    public inBounds(i, j) {
        let dims = this.dimensions();

        return (i >= 0 && j >= 0 && i < dims.lines && j < dims.columns)
    }

    public get(i: number, j: number): Float {
        if (!this.inBounds(i, j)) {
            throw `Out of bounds ${i} ${j} ${this.dimensions().toString()}`;
        }
        return this.list[i][j];
    }

    public extractLine(i: number) {
        if (!this.inBounds(i, 0)) {
            throw `Out of bounds ${i} ${this.dimensions().toString()}`;
        }

        return [...this.get_matrix()[i]]
    }

    public extractColumns(j: number) {
        if (!this.inBounds(0, j)) {
            throw `Out of bounds ${j} ${this.dimensions().toString()}`;
        }

        let returnV = []
        for (let i = 0; i < this.dimensions().lines; i++) {
            returnV.push(this.list[i][j])
        }
        return returnV;

    }

    public set(i: number, j: number, value: Float) {
        if (!this.inBounds(i, j)) {
            throw `Out of bounds ${i} ${j} ${this.dimensions().toString()}`;
        }
        this.list[i][j] = value
    }

    public operate_by(f: Function) {
        for (let i = 0; i < this.dimensions().lines; i++) {
            for (let j = 0; j < this.dimensions().columns; j++) {
                this.set(i, j, f(this.get(i, j)));
            }
        }
    }

    public operate_line_by(f: Function, i: number) {
        for (let j = 0; j < this.dimensions().columns; j++) {
            this.set(i, j, f(this.get(i, j)));
        }
    }

    public operate_column_by(f: Function, j: number) {
        for (let i = 0; i < this.dimensions().lines; i++) {
            this.set(i, j, f(this.get(i, j)));
        }
    }

    public swap_lines(i1: number, i2: number) {
        let temp = this.list[i1]
        this.list[i1] = this.list[i2]
        this.list[i2] = temp
    }

    public clone() {
        let dims = this.dimensions()
        let return_matrix = new EmptyMatrix(dims.lines, dims.columns)
        for (let i = 0; i < this.dimensions().lines; i++) {
            for (let j = 0; j < this.dimensions().columns; j++) {
                return_matrix.set(i, j, this.get(i, j));
            }
        }
        return return_matrix;
    }

    public inverse() {
        return Matrix.descenteGauss(this, true)
    }

    public simplify() {
        return Matrix.descenteGauss(this, false)
    }
}

export class EmptyMatrix extends Matrix {
    constructor(l: number, c: number) {
        let list: Float[][] = []

        for (let i = 0; i < l; i++) {
            list.push([]);
            for (let j = 0; j < c; j++) {
                list[i].push(new Float(0));
            }
        }

        super(list)
    }
}

export class IdentityMatrix extends Matrix {
    constructor(l: number, c: number) {
        let list: Float[][] = []

        for (let i = 0; i < l; i++) {
            list.push([]);
            for (let j = 0; j < c; j++) {
                list[i].push(i === j ? new Float(1) : new Float(0));
            }
        }

        super(list)
    }
}