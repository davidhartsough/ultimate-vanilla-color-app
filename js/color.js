(function() {
  // Set the page details for the given color
  function setColor({ name, hue }) {
    // Set the background to a linear gradient of the hue at varied saturation/lightness
    // Background color is a fall back if the gradient doesn't work in the browser
    document.body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    document.body.style.backgroundImage = `linear-gradient(hsl(${hue}, 100%, 50%), hsl(${hue}, 40%, 40%))`;
    // Display the name of the color
    document.getElementById("color-name").innerText = name;
  }

  // Get the search string from the URL
  const search = window.location.search.substring(1);
  // Get the search params from that string
  const params = new URLSearchParams(search);
  // Get the "c" param, which is the color id
  const cid = params.get("c");
  // Cast it to a number
  const idNumber = Number(cid);
  // Get the colors from the Store
  const { colors } = Store;
  // Check to see if the index number is valid
  if (!Number.isNaN(idNumber) && idNumber < colors.length && idNumber >= 0) {
    // Find the color at the index and set it as the page color
    setColor(colors.find(({ id }) => id === idNumber));
  } else {
    // Otherwise, redirect because something's wrong with the URL
    // Be specific when testing on the file system
    const url = window.location.protocol === "file:" ? "./index.html" : "/";
    window.location.replace(url);
  }
})();
