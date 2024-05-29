
function validateForm(medName, medManufacturer, medExpirationDate, medStock) {
	const name = medName.value.trim();
	const manufacturer = medManufacturer.value.trim();
	const expiration = medExpirationDate.value;
	const quantity = medStock.value.trim();
	const errorElements = document.querySelectorAll(".error-element")
	console.log(errorElements);

	[...errorElements].forEach((errorElement)=>{
		errorElement.textContent=""
	})

	let isValid = true

	if (!name){
		const nameErrorElement = document.getElementById("name-error");
		nameErrorElement.textContent ="Please enter name"
		isValid = false
	
	}
	if (!manufacturer){
		const manufacturerErrorElement = document.getElementById("manufacturer-error");
		manufacturerErrorElement.textContent ="Please enter manufacturer"
		isValid = false
	
	}
	if (!expiration){
		const expirationErrorElement = document.getElementById("expiration-date-error");
		expirationErrorElement.textContent ="Please enter expiration date"
		isValid = false
	
	}
	if (!quantity){
		const quantityErrorElement = document.getElementById("quantity-error");
		quantityErrorElement.textContent ="Quantity cannot be 0"
		isValid = false
	
	}

	return isValid

}
