const Store = (function() {
  // Define the default
  const defaultColors = [
    { name: "red", hue: 0, id: 0 },
    { name: "blue", hue: 240, id: 1 },
    { name: "purple", hue: 270, id: 2 }
  ];
  // Set the default if this is a first time visit
  if (!localStorage.getItem("colors")) {
    localStorage.setItem("colors", JSON.stringify(defaultColors));
  }
  // Retrieve the colors
  const colors = JSON.parse(localStorage.getItem("colors"));
  // Add a new color
  function addColor(color) {
    // Include the id as the index
    colors.push({ ...color, id: colors.length });
    // Update localStorage
    localStorage.setItem("colors", JSON.stringify(colors));
  }
  // Export the array and the addColor function
  return {
    colors,
    addColor
  };
})();
