export function pgcd(p:number,q:number){
    while (q !== 0) {
        let t = q
        q = p%q
        p = t
    }
    return p
}