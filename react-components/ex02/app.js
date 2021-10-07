const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn(
  `Folosind obiectul person si reduce, afiseaza in consola un string care contine skillurile de pe pozitiile pare ale arrayului, separate prin virgula`,
);

const result1 = person.skills.reduce((message, skill, index) => {
  if (index % 2 !== 0) {
    return message;
  }
  return `${message}${index === 0 ? '' : ','}${skill}`;
}, '');

console.log(result1);

console.warn(`In mod similar, afiseaza skillurile care NU incep cu j.
`);

const result2 = person.skills.reduce((message, skill, index) => {
  if (skill.startsWith('j')) {
    return message;
  }

  return `${message}${index === 0 ? '' : ','}${skill}`;
}, '');

console.log(result2);

console.warn(
  `Folosind reduce afiseaza propozitia: "Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."`,
);

result3 = person.friends.reduce(
  (message, { name, surname }, index, friends) => {
    const punctuation = index === friends.length - 1 ? '.' : ', ';
    return `${message}${name} ${surname}${punctuation}`;
  },
  'Prietenii mei se numesc ',
);

console.log(result3);

console.warn(
  `Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends, doar daca varsta este mai mare sau egala cu 30 de ani.`,
);

result4 = person.friends.reduce((sumYears, { age }) => {
  return age >= 30 ? sumYears + age : sumYears;
}, 0);

console.log(result4);

console.warn('doar skilluri care incep cu j');
const filteredSkills = person.skills.reduce((filteredSkills, skill) => {
  if (skill.startsWith('j')) {
    return filteredSkills;
  }
  filteredSkills.push(skill);
  return filteredSkills;
}, []);

console.log(filteredSkills);

filteredSkills2 = person.skills.filter((skill) => {
  return !skill.startsWith('j');
});
console.log(filteredSkills2);
