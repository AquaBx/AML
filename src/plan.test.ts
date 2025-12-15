import { expect, test } from "vitest"
import { HyperPlan, Point } from "./plan"
import { Matrix } from "./matrix"
import { Float } from "./float"

test('Simplify', () => {
    let P1 = new Point([1,0,0])
    let P2 = new Point([0,1,0])
    let P3 = new Point([0,0,1])

    let plan = new HyperPlan(
        [P1,P2,P3]
    )

    let eq = plan.getParametricEquation()

    let a = eq.evaluate(new Matrix([[new Float(1)],[new Float(0)],[new Float(0)]]))
    let b = eq.evaluate(new Matrix([[new Float(0)],[new Float(1)],[new Float(0)]]))
    let c = eq.evaluate(new Matrix([[new Float(0)],[new Float(0)],[new Float(1)]]))

    expect(a.toString()).toStrictEqual(c.toString())
})