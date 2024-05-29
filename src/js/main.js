//DECLARE CONSTANTS
const meds = JSON.parse(localStorage.getItem('meds')) || [];

//SELECT FROM DOM
const medForm = document.querySelector(".med-form");
const medName = document.querySelector(".product-name");
const medManufacturer = document.querySelector(".manufacturer");
const medExpirationDate = document.querySelector(".expiration");
const medStock = document.querySelector(".quantity");
const submitButton = document.querySelector(".submit-button");

const medTbody = document.querySelector(".inventory-list");
const medInventoryContainer = document.querySelector(".display-inventory-container");

// Base Class for Item
class Item {
  constructor(name, manufacturer, expiration, quantity) {
    this.name = name;
    this.manufacturer = manufacturer;
    this.expiration = expiration;
    this.quantity = quantity;
  }
}

// Medicine Class extending Item
class Medicine extends Item {
  constructor(name, manufacturer, expiration, quantity) {
    super(name, manufacturer, expiration, quantity);
    this.id = Date.now();
  }

  static addMed(med) {
    meds.push(med);
    Medicine.saveToLocalStorage();
  }

  static deleteMed(id) {
    const index = meds.findIndex((med) => med.id === id);
    if (index !== -1) {
      meds.splice(index, 1);
      Medicine.saveToLocalStorage();
    }
  }

  static saveToLocalStorage() {
    localStorage.setItem('meds', JSON.stringify(meds));
  }
}

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
    medTbody.textContent = "";
    meds.forEach((med) => {
      const trRow = document.createElement("tr");

      const renderedName = document.createElement("td");
      const renderedManufacturer = document.createElement("td");
      const renderedExpiration = document.createElement("td");
      const renderedQuantity = document.createElement("td");
      const renderedId = document.createElement("td");
      const deleteButtonContainer = document.createElement("td");
      const deleteButton = document.createElement("button");

      renderedName.textContent = med.name;
      renderedManufacturer.textContent = med.manufacturer;
      renderedExpiration.textContent = med.expiration;
      renderedQuantity.textContent = med.quantity;
      renderedId.textContent = med.id;

      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");

      trRow.append(
        renderedName,
        renderedManufacturer,
        renderedExpiration,
        renderedQuantity,
        renderedId,
        deleteButtonContainer
      );
      deleteButtonContainer.append(deleteButton);
      medTbody.append(trRow);

      deleteButton.addEventListener("click", () => {
        Medicine.deleteMed(med.id);
        UI.renderMeds(meds);
      });
    });
  }
}

// Load medicines from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  UI.renderMeds(meds);
});
