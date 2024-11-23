
class Size{
    constructor(public lines:number, public columns:number) {}
    toString() {
        return `{${this.lines}, ${this.columns}}`;
    }
}

export class Matrix{
    constructor(private list: number[][]) {
        let s = list[0].length;
        for (let i = 1; i < list.length; i++) {
            if (s!==list[i].length) {
                throw "It is not a matrix"
            }
        }
    }

    public get_matrix():number[][]{
        return this.list;
    }

    public dimensions(): Size {
        return new Size(this.list.length,this.list[0].length);
    }

    public get(i:number,j:number): number {
        let dims = this.dimensions();
        if (!(i >= 0 && j >= 0 && i < dims.lines && j < dims.columns)) {
            throw `Out of bounds ${i} ${j} ${dims.toString()}`;
        }
        return this.list[i][j];
    }

    public set(i:number,j:number, value:number) {
        let dims = this.dimensions();
        if (!(i >= 0 && j >= 0 && i < dims.lines && j < dims.columns)) {
            throw `Out of bounds ${i} ${j} ${dims.toString()}`;
        }
        this.list[i][j] = value
    }

    public add(m:Matrix){
        if (this.dimensions() !== m.dimensions()) {
            throw "Matrix must be of same dimensions";
        }

        let return_class = new EmptyMatrix(this.dimensions().lines,this.dimensions().columns)

        for (let i = 0; i < this.dimensions().lines; i++) {
            for (let j = 0; j < this.dimensions().columns; j++) {
                return_class.set(i,j, this.list[i][j] + m.list[i][j] )
            }
        }
        return return_class;
    }


    public multiply(m:Matrix){
        if (this.dimensions().columns !== m.dimensions().lines) {
            throw "Matrix must be multiply-able";
        }

        let return_class = new EmptyMatrix(this.dimensions().lines,m.dimensions().columns)

        for (let i = 0; i < return_class.dimensions().lines; i++) {
            for (let j = 0; j < return_class.dimensions().columns; j++) {
                let value = 0

                for (let k = 0; k < this.dimensions().columns; k++) {
                    value += this.get(i,k) * m.get(k,j);
                }

                return_class.set(i,j, value)
            }
        }

        return return_class;
    }

    public operate_by(f:Function){
        for (let i = 0; i < this.dimensions().lines; i++) {
            for (let j = 0; j < this.dimensions().columns; j++) {
                this.set(i,j, f(this.get(i,j)));
            }
        }
    }

    public operate_line_by(f:Function,i:number){
        for (let j = 0; j < this.dimensions().columns; j++) {
            this.set(i,j, f(this.get(i,j)));
        }
    }

    public operate_column_by(f:Function,j:number){
        for (let i = 0; i < this.dimensions().lines; i++) {
            this.set(i,j, f(this.get(i,j)));
        }
    }

    public swap_lines(i1:number,i2:number){
        let temp = this.list[i1]
        this.list[i1] = this.list[i2]
        this.list[i2] = temp
    }

    public clone() {
        let dims = this.dimensions()
        let return_matrix = new EmptyMatrix(dims.lines,dims.columns)
        for (let i = 0; i < this.dimensions().lines; i++) {
            for (let j = 0; j < this.dimensions().columns; j++) {
                return_matrix.set(i,j, this.get(i,j));
            }
        }
        return return_matrix;
    }

    public inverse() {
        /*Gauss-Jordan*/
        let dims = this.dimensions()

        let m = this.clone()
        let return_matrix = new IdentityMatrix(dims.lines,dims.columns);

        let r= -1

        for (let j = 0; j < dims.columns; j++) {
            let k = 0
            let max = -Infinity

            for (let i = r+1; i < dims.lines; i++) {
                if (m.get(i,j) >= max) {
                    k = i
                    max = m.get(i,j)
                }
            }

            let coef = m.get(k,j)
            if (coef !== 0) {
                r++
                m.operate_line_by((n:number)=>{return n/coef},k)
                return_matrix.operate_line_by((n:number)=>{return n/coef},k)

                if (k!==r){
                    m.swap_lines(k,r)
                    return_matrix.swap_lines(k,r)
                }
                for (let i = 0; i < dims.lines; i++) {
                    let coef2 = m.get(i,j)
                    if (i!==r){
                        for (let o=0;o<dims.columns; o++) {
                            return_matrix.set(i,o,return_matrix.get(i,o)-coef2*return_matrix.get(r,o))

                            m.set(i,o,m.get(i,o)-coef2*m.get(r,o))
                        }
                    }
                }
            }
        }

        return return_matrix;
    }
}

export class EmptyMatrix extends Matrix{
    constructor(l : number, c : number) {
        let list:number[][]=[]

        for (let i = 0; i < l; i++) {
            list.push([]);
            for (let j = 0; j < c; j++) {
                list[i].push(0);
            }
        }

        super(list)
    }
}

export class IdentityMatrix extends Matrix{
    constructor(l : number, c : number) {
        let list:number[][]=[]

        for (let i = 0; i < l; i++) {
            list.push([]);
            for (let j = 0; j < c; j++) {
                list[i].push(i===j ? 1 : 0);
            }
        }

        super(list)
    }
}

export class PolygoneMatrix extends Matrix{
    constructor(l : number[], c : number) {
        let list:number[][]=[]

        for (let i = 0; i < l.length; i++) {
            list.push([]);
            for (let j = c; j >= 0; j--) {
                list[i].push(l[i]**j);
            }
        }
        super(list)
    }
}
