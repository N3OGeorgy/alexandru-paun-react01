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
  `1.Folosind metoda map pe arrayul skills, returneaza si afiseaza in consola un array in care fiecare consoana este scrisa cu litera mare (vocalele nu)`,
);

const arr = person.skills.map((skill) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const letterArray = skill.split('');
  const muttatedLetterArray = [];
  letterArray.forEach((letter) => {
    if (vowels.includes(letter)) {
      muttatedLetterArray.push(letter);
    } else {
      muttatedLetterArray.push(letter.toLocaleUpperCase());
    }
  });

  return muttatedLetterArray.join('');
});

console.log(arr);

console.warn(`2. Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia
“Ma numesc {name} {surname} si am {age} ani.”`);

const arr2 = person.friends.map(({ name, surname, age }) => {
  return `Ma numesc ${name} ${surname} si am ${age} ani.`;
});

console.log(arr2);

console.warn(`Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia
“Diferenta de varsa dintre {friendName} si {personName} este {diff}”`);

const arr3 = person.friends.map((friend) => {
  const { name, age } = friend;
  return `Diferenta de varsta dintre ${name} si ${person.name} este ${Math.abs(
    person.age - age,
  )} ani.`;
});

console.log(arr3);

console.warn(
  `Returneaza si afiseaza un array in care fiecare pozitie contine diferenta dintre varsta persoanei si lungimea cuvantului de pe arrayul skill`,
);

const arr4 = person.skills.map((skill) => {
  return Math.abs(skill.length - person.age);
});

console.log(arr4);

console.warn(
  `Folosind metoda map pe arrayul skills, returneaza un array care contine cuvintele cu prima si ultima litera mari. `,
);

const arr5 = person.skills.map((skill) => {
  let newSkill = skill
    .replace(/^./, skill[0].toUpperCase())
    .replace(/.$/, skill[skill.length - 1].toUpperCase());
  return newSkill;
});

console.log(arr5);

console.warn(
  `Folosind metoda map pe arrayul skills, returneaza un array care contine cuvintele inversate (exemplu: lmth)`,
);

const arr6 = person.skills.map((skill) => {
  return skill.split('').reverse().join('');
});

console.log(arr6);

console.warn(
  `Folosind metoda map pe arrayul friends, returneaza un array care sa contina propozitiile
  “{friendName} are {age} ani.”`,
);

const arr7 = person.friends.map((friend) => {
  return `${friend.name} ${friend.surname} are ${friend.age} ani.`;
});

console.log(arr7);

console.warn(
  `Folosind metoda map pe arrayul friends, returneaza un array care contine numele inversat al prietenilor pe fiecare pozitie (exemplu: Stevenson Steven)`,
);

const arr8 = person.friends.map((friend) => {
  friend.name = friend.name.split('').reverse().join('');
  friend.surname = friend.surname.split('').reverse().join('');
  return friend;
});

console.log(arr8);

console.warn(
  `Folosind metoda map pe arrayul friends, returneaza un array care contine pe fiecare pozitie diferenta dintre lungimea totala al numelui complet (fara spatii) si varsta prietenului de pe iteratie`,
);

const arr9 = person.friends.map((friend) => {
  return friend.name.length + friend.surname.length - friend.age;
});

console.log(arr9);

console.warn(
  `Folosind metoda map pe arrayul skills returneaza un array care contine diferenta dintre lungimea fiecarui skill si varsta prietenului`,
);

const arr10 = person.skills.map((skill) => {
  return person.friends.map((friend) => {
    return skill.length - friend.age;
  });
});

console.log(arr10);
