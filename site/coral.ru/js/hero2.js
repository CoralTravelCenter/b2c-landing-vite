import {hostReactAppReady} from "../../common/js/usefuls.js";
import {groupBy} from "lodash";

(async () => {
  await hostReactAppReady()
  const objArr = [
    {type: 'fruit', name: 'apple'},
    {type: 'fruit', name: 'banana'},
    {type: 'vegetable', name: 'carrot'},
    {type: 'fruit', name: 'orange'},
    {type: 'vegetable', name: 'potato'}
  ]

  const grouped = groupBy(objArr, 'type');

  console.log(grouped);
})()
