var config = module.exports;

config["jQuery Collapse specs"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "vendor/jquery-1.8.1.js",
    "vendor/json2.js",
    "src/jquery.collapse.js",
    "src/jquery.collapse_storage.js",
    "src/jquery.collapse_cookie_storage.js"
  ],
  tests: [
    "spec/*_spec.js"
  ],
  extensions: [require("buster-html-doc")]
}
