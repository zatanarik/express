module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "extends": [
        "airbnb-base",
        "airbnb-typescript/base",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module",
        "project": [
            "tsconfig.json",
        ]
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "no-console": 1,
        "no-unused-vars": 0,
        "no-empty":1,
        "import/extensions": 0,
        "func-names": 0,
        "quotes": ["error", "single"],
        "comma-dangle": ["error", "always-multiline"],
        "no-shadow": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "vars": "local",
                "args": "none",
                "ignoreRestSiblings": true
            }
        ],
        "@typescript-eslint/no-shadow": 0,
        "import-name": 0,
        "no-await-in-loop": 0,
        "no-mixed-operators": 0,
        "no-restricted-syntax": ["off", "ForOfStatement"],
        "import/prefer-default-export": 0,
        "import/no-unresolved": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "operator-linebreak": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "no-param-reassign": ["error", { "props": false }],
        "class-methods-use-this": 0,
        "max-len": ["error", { "code": 170 }],
        "import/no-cycle": 0,
        "no-bitwise": "off",
        "max-classes-per-file": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "import/named": 0,
        "@typescript-eslint/no-throw-literal": 0,
        "curly": 1,
        "no-useless-escape": 0
    },
    "globals": {
        "describe": "writable",
        "test": "writable",
        "expect": "writable",
        "beforeEach": "writable",
        "beforeAll": "writable"
    }
}
