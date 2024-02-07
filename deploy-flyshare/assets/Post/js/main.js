"use strict";
$(document).ready(function () {
  const url =
    "https://raw.githubusercontent.com/ashhadulislam/JSON-Airports-India/master/airports.json";
 
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const citiesWithCodes = data.airports.map((airport) => ({
        cityName: airport.city_name,
        IATACode: airport.IATA_code,
      }));
 
      populateCitiesList(citiesWithCodes, "cityInputFrom", "citiesListFrom");
      populateCitiesList(citiesWithCodes, "cityInputTo", "citiesListTo");
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
 
  function populateCitiesList(citiesWithCodes, inputId, dataListId) {
    const datalist = document.createElement("datalist");
    datalist.id = dataListId;
 
    citiesWithCodes.forEach((city) => {
      const option = document.createElement("option");
      option.value = `${city.cityName} (${city.IATACode})`;
      datalist.appendChild(option);
    });
 
    const existingDatalist = document.getElementById(dataListId);
    if (existingDatalist) {
      existingDatalist.parentNode.removeChild(existingDatalist);
    }
 
    document.body.appendChild(datalist);
 
    const cityInput = document.getElementById(inputId);
    cityInput.setAttribute("list", dataListId);
 
    cityInput.addEventListener("input", function () {
      const inputText = this.value.toLowerCase();
      const matchingCities = citiesWithCodes.filter(
        (city) =>
          city.cityName.toLowerCase().includes(inputText) ||
          city.IATACode.toLowerCase().includes(inputText)
      );
 
      showCities(matchingCities, dataListId);
    });
 
    function showCities(matchingCities, dataListId) {
      const datalist = document.createElement("datalist");
      datalist.id = dataListId;
 
      matchingCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = `${city.cityName} (${city.IATACode})`;
        datalist.appendChild(option);
      });
 
      const existingDatalist = document.getElementById(dataListId);
      if (existingDatalist) {
        existingDatalist.parentNode.removeChild(existingDatalist);
      }
 
      document.body.appendChild(datalist);
      cityInput.setAttribute("list", dataListId);
    }
  }
 
  $("form").submit(async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
 
    // Check if all fields are filled
    if (await validateForm()) {
 
 
      // If validation is successful, submit the form using AJAX
      $.ajax({
        url: $(this).attr("action"),
        type: $(this).attr("method"),
        data: $(this).serialize(),
        success: function (response) {
          // Handle the success response as needed
         
          showSuccessMessage();
        },
        error: function (error) {
          // Handle the error response as needed
          alert("Error submitting form. Please try again.");
        },
      });
    }
  });
 
  // Function to validate the form
  async function validateForm() {
    const form = $("form")[0];
    const formElements = form.elements;
 
    const cityInputFrom = document.getElementById("cityInputFrom");
    const cityInputTo = document.getElementById("cityInputTo");
 
    // Check if both source and destination are the same
    if (cityInputFrom.value.toLowerCase() === cityInputTo.value.toLowerCase()) {
      alert("Source and destination cannot be the same.");
      return false;
    }
 
   
    for (let i = 0; i < formElements.length - 1; i++) {
        if (formElements[i].type !== "checkbox" && formElements[i].value === "") {
            // Display an alert or customize the behavior for unfilled fields
            alert("Please fill in all fields.");
            return false;
        }
 
        // Additional check for FlightNumber and PNRNumber
        if (
            (formElements[i].name === "FlightNumber" || formElements[i].name === "PNRNumber") &&
            !isValidPattern(formElements[i].value)
        ) {
            alert(`${formElements[i].name} should not be more than 7 characters with letters, numbers, and hyphens.`);
            return false;
        }
    }
 
    // Check if the checkbox is checked
    if (!formElements["checkbox"].checked) {
        alert("Please agree to the terms and conditions.");
        return false;
    }
   
 
    return true;
 
}
 
// Function to check the validity of FlightNumber and PNRNumber
function isValidPattern(value) {
    const pattern = /^[A-Za-z0-9-]{1,7}$/;
    return pattern.test(value);
}
 
  // Function to show success message
  function showSuccessMessage() {
    // Assuming you have a div with id "successMessage" in your HTML
    $("#successMessage").html("Post added successfully!");
  }
 
 
// Function to show success message
function showSuccessMessage() {
  Swal.fire({
    title: "Post Added Successfully!",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  }).then((result) => {
    // Redirect to the specified URL after the Swal modal is closed
    if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = `/app1/get-post`;
    }
  });
}
});
 
const today = new Date().toISOString().split('T')[0];
document.getElementById('datePicker').min = today;