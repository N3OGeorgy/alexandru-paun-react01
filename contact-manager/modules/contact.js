const buttonGroup = [
  {
    name: 'edit',
    displayName: 'Edit',
    buttonClass: 'btn-primary',
  },
  {
    name: 'delete',
    displayName: 'Delete',
    buttonClass: 'btn-danger',
  },
];

export const render = (contact) => {
  const contactsContainer = document.createElement('article');
  contactsContainer.classList.add('contact', 'border', 'p-3');
  const heading = document.createElement('h1');

  heading.innerText = `${contact.name} ${contact.surname}`;
  const information = document.createElement('ul');
  const phone = document.createElement('li');
  const email = document.createElement('li');
  phone.textContent = contact.phone;
  email.textContent = contact.email;

  information.append(phone);
  information.append(email);

  const fragment = new DocumentFragment();

  buttonGroup.forEach(({ name, displayName, buttonClass }) => {
    const button = document.createElement('button');
    button.classList.add('btn', buttonClass, `${name}-contact`);
    button.type = 'button';
    button.title = displayName;
    button.innerText = displayName;
    button.dataset.contactId = contact.id;

    fragment.append(button);
  });

  contactsContainer.append(heading);
  contactsContainer.append(information);
  contactsContainer.append(fragment);

  return contactsContainer;
};
