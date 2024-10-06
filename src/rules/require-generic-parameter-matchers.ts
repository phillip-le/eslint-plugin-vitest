import { TSESTree } from "@typescript-eslint/utils";
import { createEslintRule } from "../utils";

export const RULE_NAME = "require-generic-parameter-matchers";
type MESSAGE_IDS = "useGenericParameters";

const matchers = ["toEqual", "toStrictEqual", "toHaveBeenCalledWith", "toBeCalledWith"];

type Options = [];

export default createEslintRule<Options, MESSAGE_IDS>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "Need to use generics with this matcher",
      requiresTypeChecking: true,
      recommended: false,
    },
    fixable: "code",
    messages: {
      useGenericParameters: "Use a generic to ensure type safety.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        // Check if this is an `expect` call by checking the object of a MemberExpression
        const isExpectCall = node.callee.type === 'MemberExpression' && isExpect(node.callee.object);

        if (!isExpectCall) {
          return
        }

        const { callee } = node

        if (callee.type !== 'MemberExpression') {
          return
        }

        const { property } = callee

        if (property.type !== 'Identifier') {
          return
        }

        if (!matchers.includes(property.name)) {
          return
        }

        if (!node.typeArguments) {
          context.report({
            node,
            messageId: 'useGenericParameters',
          });
        }
      },
    }
  },
});

/**
 * Helper function to determine if a node is an `expect()` call.
 */
function isExpect(node: TSESTree.Expression) {
  return node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'expect';
}