var config = module.exports;

config["jQuery Collapse specs"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "vendor/jquery-1.7.2.js",
    "src/*.js"
  ],
  tests: [
    "spec/*_spec.js"
  ],
  extensions: [require("buster-html-doc")]
}
