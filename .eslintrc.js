// .eslintrc.js
module.exports = {
  root: true, // Optional:  Prevents ESLint from searching for configurations in parent directories
  env: {
    browser: true, // Optional:  If you're in a browser environment
    node: true // Optional:  If you're in a Node.js environment
  },
  extends: [], // Important:  No extended configurations
  rules: {} // Important:  Empty rules object
}
