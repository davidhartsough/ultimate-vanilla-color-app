(function() {
  // Get DOM elements
  const form = document.getElementById("form");
  const nameInput = document.getElementById("name");
  const hueInput = document.getElementById("hue");

  // Handle the form submission event
  function handleSubmit(event) {
    // Prevent the form from actually submitting
    event.preventDefault();
    // Get the input values
    const name = nameInput.value;
    const hue = hueInput.valueAsNumber;
    // Create the new color object
    const color = { name, hue };
    // Add the new color to the Store
    Store.addColor(color);
    // Navigate back to the list
    const url = window.location.protocol === "file:" ? "./index.html" : "/";
    window.location.href = url;
  }
  // Assign the handler to the submit event
  form.addEventListener("submit", handleSubmit);
})();
