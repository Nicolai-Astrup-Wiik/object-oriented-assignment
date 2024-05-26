//DECLARE CONSTANTS
const meds = [];

//SELECT FROM DOM
const medForm = document.querySelector(".med-form");
const medName = document.querySelector(".product-name");
const medManufacturer = document.querySelector(".manufacturer");
const medExpirationDate = document.querySelector(".expiration");
const medStock = document.querySelector(".quantity");
const submitButton = document.querySelector(".submit-button");

const medUl = document.querySelector(".inventory-list");
const medInventoryContainer = document.querySelector(
  ".display-inventory-container"
);

// INITIALIZE RANDOM ITEN TO DEMONSTRATE INHERITANCE
class Item {
  constructor(name, manufacturer, expiration, quantity) {
    this.name = name;
    this.manufacturer = manufacturer;
    this.expiration = expiration;
    this.quantity = quantity;
  }
}

//INITIALIZE MEDICINE
class Medicine extends Item {
  constructor(name, manufacturer, expiration, quantity) {
    super(name, manufacturer, expiration, quantity);
    this.id = Date.now();
  }
  //push med to array of meds
  static addMed(med) {
    meds.push(med);
  }
  //delete static function
  static deleteMed(id) {
    const index = meds.findIndex((med) => med.id === id);
    if (index !== -1) {
      meds.splice(index, 1);
    }
  }
}

//ADD EVENT LISTENER TO FORM
medForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newMed = new Medicine(
    medName.value,
    medManufacturer.value,
    medExpirationDate.value,
    medStock.value
  );
  Medicine.addMed(newMed);
  UI.renderMeds(meds);
  medForm.reset();
});

//DECLARE UI-CLASS
class UI {
  static renderMeds(meds) {
    medInventoryContainer.style.display = "block";
    medUl.textContent = "";
    meds.forEach((med) => {
      const liRow = document.createElement("li");

      const renderedName = document.createElement("span");
      const renderedManufacturer = document.createElement("span");
      const renderedExpiration = document.createElement("span");
      const renderedQuantity = document.createElement("span");
      const renderedId = document.createElement("span");
      const deleteButtonContainer = document.createElement("span");
      const deleteButton = document.createElement("button");

      liRow.classList.add("medicine-row");
      deleteButton.classList.add("delete-button");

      renderedName.textContent = med.name;
      renderedManufacturer.textContent = med.manufacturer;
      renderedExpiration.textContent = med.expiration;
      renderedQuantity.textContent = med.quantity;
      renderedId.textContent = med.id;
      deleteButton.textContent = "Delete";

      liRow.dataset.id = med.id;

      liRow.append(
        renderedName,
        renderedManufacturer,
        renderedExpiration,
        renderedQuantity,
        renderedId,
        deleteButtonContainer
      );
      deleteButtonContainer.append(deleteButton);
      medUl.append(liRow);

      deleteButton.addEventListener("click", () => {
        Medicine.deleteMed(med.id);
        UI.renderMeds(meds);
      });
    });
  }
}
