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

console.warn(`Folosind reduce, afiseaza suma anilor de nastere a persoanelor.`);

result5 = person.friends.reduce((sumYears, { age }) => {
  return sumYears + age;
}, 0);

console.log(result5);

console.warn(
  `Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani. Intre Dragos si Steven... ", doar daca varsta prietenului este impara.`,
);

result6 = person.friends.reduce((message, { name, surname, age }) => {
  if (age % 2 === 0) {
    return message;
  }

  return (message += `Intre ${
    person.name
  } si ${name} ${surname} este o diferenta de ${person.age - age} ani.`);
}, '');

console.log(result6);

console.warn(
  `Folosind obiectul person si reduce, afiseaza in consola un string care contine skillurile persoanei, separate prin virgula`,
);

result7 = person.skills.reduce((message, skill, index, skills) => {
  const punctuation = index === skills.length - 1 ? '.' : ', ';
  return `${message}${skill}${punctuation}`;
}, '');

console.log(result7);

console.warn(`In mod similar, afiseaza skillurile care incep cu c`);

result8 = person.skills.reduce((message, skill, index, skills) => {
  const punctuation = index === skills.length - 1 ? '.' : ', ';
  if (skill.substring(0, 1) != 'c') {
    return message;
  }
  return `${message}${skill}${punctuation}`;
}, '');

console.log(result8);

console.warn(
  `Folosind reduce afiseaza propozitia: "Numele de familie ale prietenilor mei sunt: xxx, xxx , xxx."`,
);

result9 = person.friends.reduce((message, friend, index, friends) => {
  const punctuation = index === friends.length - 1 ? '.' : ', ';
  return `${message}${friend.name}${punctuation}`;
}, 'Numele de familie ale prietenilor mei sunt: ');

console.log(result9);

console.warn(
  `Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends`,
);

result10 = person.friends.reduce((totalAge, friend) => {
  return (totalAge += friend.age);
}, 0);

console.log(result10);

console.warn(`Folosind reduce, afiseaza suma anilor  persoanelor.`);

result11 = person.friends.reduce((totalAge, friend) => {
  return (totalAge += friend.age);
}, person.age);

console.log(result11);

console.warn(
  `Afiseaza diferenta de varsta dintre persoana si prietenii din arrayul friends.`,
);

result12 = person.friends.reduce((totalAge, friend) => {
  return totalAge - friend.age;
}, person.age);

console.log(result12);

console.warn(
  `Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani. Intre Dragos si Steven... ". Repeta pentru tot arrayul friends.`,
);

result13 = person.friends.reduce((message, friend) => {
  return (message += `Intre ${person.name} si ${
    friend.name
  } este o diferenta de ${person.age - friend.age} ani.`);
}, '');

console.log(result13);
