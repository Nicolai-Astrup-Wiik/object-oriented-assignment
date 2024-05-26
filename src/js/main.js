//DECLARE CONSTANTS
const meds = [];

//SELECT FROM DOM
const medForm = document.querySelector(".med-form");
const medName = document.querySelector(".product-name");
const medManufacturer = document.querySelector(".manufacturer");
const medExpirationDate = document.querySelector(".expiration");
const medStock = document.querySelector(".quantity");
const submitButton = document.querySelector(".submit-button");

//DECLARING MED CLASS
class Medicine {
  constructor(name, manufacturer, expiration, quantity) {
    this.name = name;
    this.manufacturer = manufacturer;
    this.expiration = expiration;
    this.quantity = quantity;
    this.ID = Date.now();
  }

  static addMed(med) {
    meds.push(med);
  }
}
