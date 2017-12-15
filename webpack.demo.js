const path = require("path");
const config = require("./webpack.config.js");

const demoConfig = Object.assign({}, config);

demoConfig.entry = path.resolve(__dirname, "src/js/demo/index.js");
demoConfig.output.filename = "demo.js";
delete demoConfig.output.library;
delete demoConfig.output.libraryTarget;

module.exports = demoConfig;
