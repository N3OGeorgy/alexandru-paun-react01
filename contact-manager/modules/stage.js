import { contacts } from './data.js';
import { render as renderEditForm } from './edit-contact.js';
import { render as renderMessage } from './message.js';
import { addMessage, clearMessages } from './notification-bar.js';
import { addContact, deleteContact, editContact, getContact } from './query.js';

const stage = document.querySelector('.stage');

stage.addEventListener('click', (event) => {
  const button = event.target;
  // console.log(event.target);
  // console.log(event.currentTarget);
  console.log(contacts);
  if (
    button.nodeName === 'BUTTON' &&
    button.classList.contains('delete-contact')
  ) {
    const contactId = button.dataset.contactId;
    console.log(`Delete contact ${contactId}`);
    deleteContact(contactId);

    const contactsContainer = button.closest('.contact');
    contactsContainer.remove();

    const messageContainer = renderMessage('Contact removed.', 'success');
    addMessage(messageContainer);
  }
});

stage.addEventListener('click', (event) => {
  const button = event.target;

  if (
    button.nodeName === 'BUTTON' &&
    button.classList.contains('edit-contact')
  ) {
    const contactId = button.dataset.contactId;
    const contact = getContact(contactId);

    if (!contact) {
      return;
    }

    clearStage();
    stage.append(renderEditForm(contact));
  }
});

// cancel button
stage.addEventListener('click', (event) => {
  const button = event.target;

  if (
    button.nodeName === 'BUTTON' &&
    (button.classList.contains('cancel-edit-contact') ||
      button.classList.contains('cancel-add-contact'))
  ) {
    clearStage();
    clearMessages();
  }
});

// save edit contact
stage.addEventListener('submit', (event) => {
  const form = event.target;

  if (form.nodeName === 'FORM' && form.classList.contains('edit-contact')) {
    event.preventDefault();

    const formData = new FormData(form);
    const contact = {};
    const entries = formData.entries();
    let currentEntry = entries.next();

    while (currentEntry.done === false) {
      const [inputName, inputValue] = currentEntry.value;
      contact[inputName] = inputValue;

      currentEntry = entries.next();
    }

    editContact(contact.id, contact);

    clearStage();
    addMessage(
      renderMessage(`Contact ${contact.name} has been saved.`, 'success'),
    );

    setTimeout(() => {
      clearMessages();
    }, 5000);
  }
});

// execute add contact
stage.addEventListener('submit', (event) => {
  const form = event.target;

  if (form.nodeName === 'FORM' && form.classList.contains('add-contact')) {
    event.preventDefault();

    const formData = new FormData(form);
    const contact = {};
    const entries = formData.entries();
    let currentEntry = entries.next();

    while (currentEntry.done === false) {
      const [a, b] = currentEntry.value;
      contact[a] = b;
      currentEntry = entries.next();
    }

    contact.id = contacts.length + 1;

    addContact(contact);

    const successMessage = renderMessage('yay!', 'success');
    addMessage(successMessage);
    clearStage();
  }
});

export const clearStage = () => {
  stage.innerHTML = '';
};
export default stage;
