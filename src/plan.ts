class Dimensional {
    constructor( private dim :number ) {}
    get dimension() { return this.dim }
}

export class Point extends Dimensional{
    constructor ( private c : number[] ){
        super(c.length)        
    }

    get(i:number){
        return this.c[i]
    }

    substract(p:Point){
        if (p.dimension !== this.dimension){
            throw new Error("Points dimension need to be the same")
        }

        let a:number[] = []
        for (let i = 0; i < this.dimension; i++){
            a.push(this.get(i)-p.get(i))
        }
        return new Point(a) 
    }
}

export class Vector extends Dimensional{
    constructor ( private p1, private p2 ){
        if (p1.dimension !== p2.dimension){
            throw new Error("Points dimension need to be the same")
        }
        super(p1.dimension)
    }

    get vector() {
        let a:number[] = []
        for (let i = 0; i < this.p1.dimension; i++){
            a.push(this.p2.get(i)-this.p1.get(i))
        }
        return a
    }

    public scalar(v:Vector){
        if (v.dimension !== this.dimension){
            throw new Error("Vectors dimension need to be the same")
        }

        let v1 = this.vector
        let v2 = v.vector
    
        let a:number = 0
        for (let i = 0; i < this.dimension; i++){
            a += v1[i]*v2[i]
        }
        return a        
    }
}

export class HyperPlan extends Dimensional {
    constructor ( private points: Point[] ){
        for (let p of points){
            if (p.dimension !== points.length){
                throw new Error("Point dimension needs to match the hyperplan dimension")
            }
        }
        super(points.length)
    }

    public projected(p : Point){

    }
}