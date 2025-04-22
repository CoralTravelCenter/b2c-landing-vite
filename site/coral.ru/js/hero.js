import {hostReactAppReady} from "../../common/js/usefuls.js";

hostReactAppReady().then(() => {
  const a = document.querySelector('h1')
  a.textContent = 'Hello World';
  console.log(a)
})
