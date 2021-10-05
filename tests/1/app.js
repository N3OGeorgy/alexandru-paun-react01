myData = [
  {
    id: 1,
    name: 'a',
    details: 'abc',
  },
  {
    id: 2,
    name: 'b',
    details: 'bcd',
  },
  {
    id: 3,
    name: 'c',
    details: 'cde',
  },
];

const cars = document.getElementById('cars');
const fragment = new DocumentFragment();

myData.forEach(function (car) {
  // cars.add(new Option(`${car.name} \\ ${car.details}`, car.id));
  fragment.append(new Option(`${car.name} \\ ${car.details}`, car.id));
  console.log(fragment);
});
console.log(fragment);
// cars.append(fragment);
