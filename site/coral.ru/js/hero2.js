import _ from "lodash";

const objArr = [
  {type: 'fruit', name: 'apple'},
  {type: 'fruit', name: 'banana'},
  {type: 'vegetable', name: 'carrot'},
  {type: 'fruit', name: 'orange'},
  {type: 'vegetable', name: 'potato'}
]

const grouped = _.groupBy(objArr, 'type');

console.log(grouped);
