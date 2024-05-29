//SELECT FROM DOM
const medForm = document.querySelector(".med-form");
const medName = document.querySelector(".product-name");
const medManufacturer = document.querySelector(".manufacturer");
const medExpirationDate = document.querySelector(".expiration");
const medStock = document.querySelector(".quantity");
const medUl = document.querySelector(".inventory-list");
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

const meds = JSON.parse(localStorage.getItem('meds')) || [];



// Form Submission Event Listener
medForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm(medName, medManufacturer, medExpirationDate, medStock)) {
      const newMed = new Medicine(
          medName.value,
          medManufacturer.value,
          medExpirationDate.value,
          medStock.value
      );
      Medicine.addMed(newMed);
      UI.renderMeds(meds);
      medForm.reset();
  }
  
});

//DECLARE UI-CLASS
class UI {
  static renderMeds(meds) {
      medInventoryContainer.style.display = "block";
      medUl.textContent = "";
      meds.forEach((med) => {
          const liRow = document.createElement("tr");

          const renderedName = document.createElement("td");
          const renderedManufacturer = document.createElement("td");
          const renderedExpiration = document.createElement("td");
          const renderedQuantity = document.createElement("td");
          const renderedId = document.createElement("td");
          const deleteButtonContainer = document.createElement("td");
          const deleteButton = document.createElement("button");

          liRow.classList.add("medicine-row");
          deleteButtonContainer.classList.add("delete-button-container");
          deleteButton.classList.add("delete-button");
          renderedId.classList.add("rendered-id");

          renderedName.textContent = med.name;
          renderedManufacturer.textContent = med.manufacturer;
          renderedExpiration.textContent = med.expiration;
          renderedQuantity.textContent = med.quantity;
          renderedId.textContent = med.id;

          renderedManufacturer.classList.add("manufacturer");
          renderedExpiration.classList.add("expiration");
          renderedId.classList.add("id");

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


document.addEventListener('DOMContentLoaded', () => {
  UI.renderMeds(meds);
});
