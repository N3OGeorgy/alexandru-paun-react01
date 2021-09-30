export const render = (contact) => {
  const addContactContainer = document.createElement('form');
  addContactContainer.classList.add('add-contact');

  addContactContainer.innerHTML = `
  <h4 class="mb-2">
    Add new Cpontact
  </h4>
  <label class="form-label mt-3" for="name">Name</label>
  <input type="text" id="name" name="name" class="form-control form-control-sm" placeholder="name">

  <label class="form-label mt-3" for="surname">Surname</label>
  <input type="text" id="surname" name="surname" class="form-control form-control-sm" placeholder="surname"">

  <label class="form-label mt-3" for="email">Email</label>
  <input type="email" id="email" name="email" class="form-control form-control-sm" placeholder="email"">

  <label class="form-label mt-3" for="phone">Phone</label>
  <input type="tel" id="phone" name="phone" class="form-control form-control-sm" placeholder="phone"">

  <input type="hidden" name="id">

  <div class="mt-2">
    <button type="submit" class="btn btn-primary">Save</button>
    <button type="button" class="cancel-add-contact btn btn-primary">Cancel</button>
  </div>
  `;
  return addContactContainer;
};
