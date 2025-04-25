import {hostReactAppReady} from "../../common/js/usefuls.js";

(async () => {
  await hostReactAppReady();

  const a = document.querySelector('h1')
  a.textContent = 'Hello World';
  console.log(a)
})()
