import js from "@eslint/js";
import globals from "globals";

export default [
    // Global ignores (must be first)
    {
        ignores: [
            "node_modules/",
            "augment/",
            ".husky/",
            "*.min.js",
            "*.config.js",
            "dist/",
            "build/",
            "coverage/",
            ".git/"
        ]
    },

    // Base configuration for all JS files
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2025,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025
            }
        },
        rules: {
            // ES2025 & Modern JavaScript Best Practices
            ...js.configs.recommended.rules,

            // Code Quality
            "no-console": "warn", // Keep as default
            "no-debugger": "error",
            "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "no-var": "error",
            "prefer-const": "error",
            "prefer-arrow-callback": "error",
            "arrow-spacing": "error",

            // ES2025 Set Methods Support
            "no-restricted-syntax": [
                "error",
                {
                    "selector": "CallExpression[callee.type='MemberExpression'][callee.property.name='forEach'][callee.object.type='CallExpression'][callee.object.callee.property.name='filter']",
                    "message": "Consider using Set methods like intersection() or difference() for better performance"
                }
            ],

            // Promise Best Practices (ES2025 Promise.try support)
            "prefer-promise-reject-errors": "error",
            "no-async-promise-executor": "error",
            "require-atomic-updates": "error",

            // Modern Syntax Enforcement
            "object-shorthand": "error",
            "prefer-destructuring": ["error", {
                "array": true,
                "object": true
            }],
            "prefer-template": "error",
            "template-curly-spacing": "error",

            // Class Best Practices
            "class-methods-use-this": "warn",
            "no-useless-constructor": "error",
            "prefer-class-properties": "off", // Allow both syntaxes

            // Import/Export
            "import/prefer-default-export": "off",
            "import/no-default-export": "off",

            // Regex Best Practices (ES2025 /v flag support)
            "prefer-regex-literals": "error",
            "no-invalid-regexp": "error",

            // Performance
            "no-loop-func": "error",
            "no-inner-declarations": "error",

            // Code Style (Modern)
            "indent": ["error", 2],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "comma-dangle": ["error", "never"],
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "space-before-function-paren": ["error", "never"],
            "keyword-spacing": "error",
            "space-infix-ops": "error",

            // Modern Error Handling
            "no-throw-literal": "error"
        }
    },

    // Educational/Demo code - Allow console
    {
        files: [
            "**/task*.js",
            "**/index.js",
        ],
        rules: {
            "no-console": "off",
            "no-unused-vars": "warn", // Downgrade to warning for demo code
            "class-methods-use-this": "off" // Allow utility methods in classes
        }
    },

    // Node.js specific files
    {
        files: ["**/*.{mjs,cjs}"],
        languageOptions: {
            globals: {
                ...globals.node
            }
        },
        rules: {
            "no-console": "off"
        }
    },

    // Test files
    {
        files: ["**/*.test.js", "**/*.spec.js", "**/test/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.mocha
            }
        },
        rules: {
            "no-unused-expressions": "warn"
        }
    },

    // Configuration files
    {
        files: ["*.config.js", "*.config.mjs"],
        languageOptions: {
            globals: {
                ...globals.node
            }
        },
        rules: {
            "no-console": "off"
        }
    }
];