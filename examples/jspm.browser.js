SystemJS.config({
  baseURL: "./",
  paths: {
    "github:*": "jspm_packages/github/*",
    "local:*": "jspm_packages/local/*",
    "npm:*": "jspm_packages/npm/*",
    "react-focus-onkeydown-demo/": "src/"
  }
});
