import rule, { RULE_NAME } from "../src/rules/require-generic-parameter-matchers";
import { ruleTester } from "./ruleTester";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    "expect(foo).toEqual<number>(1)",
    "expect(foo).toStrictEqual<number>(1)",
    "expect(3).toBe(4)",
    "expect(mockFunction).toHaveBeenCalledWith<[number]>(4)",
    "expect(mockFunction).toBeCalledWith<[number]>(4)"
  ],
  invalid: [
    {
      code: "expect(foo).toEqual(1)",
      errors: [{ messageId: "useGenericParameters" }],
    },
    {
      code: "expect(foo).toStrictEqual(1)",
      errors: [{ messageId: "useGenericParameters" }],
    },
    {
      code: "expect(mockFunction).toHaveBeenCalledWith(4)",
      errors: [{ messageId: "useGenericParameters" }],
    },
    {
      code: "expect(mockFunction).toBeCalledWith(4)",
      errors: [{ messageId: "useGenericParameters" }],
    }
  ],
});