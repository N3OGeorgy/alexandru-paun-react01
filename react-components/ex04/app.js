const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  skills: {
    html: true,
    css: false,
    javaScript: true,
  },
  friends: {
    larry: {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    steven: {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    carol: {
      name: 'Carol',
      age: 29,
      surname: 'Carolson',
    },
  },
};

console.warn(
  `Folosind Object.entries() pe proprietatea skills, afiseaza abilitatile persoanei daca acestea sunt true. Folosind propozitii de forma: “person.name cunoaste: html.” “person.name cunoaste: javaScript.”`,
);

Object.entries(person.skills).forEach(([skill, isKnown]) => {
  if (isKnown === true) {
    console.log(`${person.name} cunoaste ${skill}`);
  }
});

console.warn(
  `Prin aceeasi metoda, afiseaza o lista inversata cu numele complet inversat al prietenilor.`,
);

Object.entries(person.friends)
  .reverse()
  .forEach(([, friend]) => {
    const { name, surname } = friend;
    console.log(`${surname} ${name}`);
  });

console.warn(
  `Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.entries()`,
);

const message1 = Object.entries(person.friends).reduce(
  (message, [fiendsData, { name }], index, friends) => {
    const length = friends.length;
    const punctuation =
      index === length - 1 ? '.' : index === length - 2 ? ' si ' : ', ';

    return `${message}${name}${punctuation}`;
  },
  'Prietenii mei sunt ',
);

console.log(message1);
