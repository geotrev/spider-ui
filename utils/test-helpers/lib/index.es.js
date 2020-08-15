/*!
  * @license MIT (https://github.com/geotrev/spider-ui/blob/master/LICENSE)
  * @spider-ui/test-helpers v0.1.0 (https://github.com/geotrev/spider-ui/tree/master/packages/utils#readme)
  * Copyright 2020 George Treviranus <hello@geotrev.com>
  */
const delay = (ms = 300) => {
  return Promise.resolve(done => setTimeout(done, ms));
};

const stubElementId = fixture => {
  fixture.setAttribute("element-id", "test-id");
};

let fixture = null;
const mount = htmlString => {
  const body = document.querySelector("body");
  body.innerHTML = htmlString;
  fixture = body.querySelector(":scope > *");
  stubElementId(fixture);
  return fixture;
};
const unmount = () => {
  if (!fixture) return;
  const body = document.querySelector("body");
  body.removeChild(fixture);
  fixture = null;
};

export { delay, mount, unmount };
//# sourceMappingURL=index.es.js.map
