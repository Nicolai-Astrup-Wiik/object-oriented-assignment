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

//DECLARING MED CLASS
class Medicine {
  constructor(name, manufacturer, expiration, quantity) {
    this.name = name;
    this.manufacturer = manufacturer;
    this.expiration = expiration;
    this.quantity = quantity;
    this.id = Date.now();
  }

  static addMed(med) {
    meds.push(med);
  }
}

medForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newMed;
  newMed = new Medicine(
    medName.value,
    medManufacturer.value,
    medExpirationDate.value,
    medStock.value
  );
  Medicine.addMed(newMed);
  console.log(newMed);
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
      //renderedId.textContent = med.id;
      deleteButton.textContent = "Delete";

      liRow.dataset.id = med.id;

      medUl.append(liRow);
      liRow.append(
        renderedName,
        renderedManufacturer,
        renderedExpiration,
        renderedQuantity,
        deleteButtonContainer
      );
      deleteButtonContainer.append(deleteButton);
    });
  }
}
