(function() {
  // Get DOM elements
  const searchInput = document.getElementById("search");
  const nameSort = document.getElementById("name-sort");
  const hueSort = document.getElementById("hue-sort");
  const nameSortIcon = document.getElementById("name-sort-icon");
  const hueSortIcon = document.getElementById("hue-sort-icon");
  const generateButton = document.getElementById("generate");
  const list_div = document.getElementById("list");

  // Set initial local state variables
  // Sorting
  let sort = "id";
  let desc = false;
  // Filtering/Searching
  let query = "";

  // Append a color to the list div
  function addColor({ name, hue, id }) {
    // Create a new div
    const color_div = document.createElement("div");
    // Set its class attribute
    color_div.className = "list-item";
    // Set the color style
    color_div.style.color = `hsl(${hue}, 100%, 50%)`;
    // Put a link inside the div that links to its color detail page
    // List the name and the hue in the link
    color_div.innerHTML = `
      <a href="./color.html?c=${id}" class="list-item-link" style="color: hsl(${hue}, 100%, 50%)">
        <span>${name}</span>
        <span>${hue}</span>
      </a>
    `;
    // Add the new color item div to the list div
    list_div.appendChild(color_div);
  }

  // Render all colors into the list
  function renderList() {
    // Clear out the list div and reset
    list_div.innerHTML = "";
    // Grab the colors from the Store
    let { colors } = Store;
    // Find out which way we should be sorting by
    const sortComparison =
      sort === "id"
        ? compareId
        : sort === "name"
        ? desc
          ? compareNameDesc
          : compareName
        : desc
        ? compareHueDesc
        : compareHue;
    // Sort by that sorting method
    colors = colors.sort(sortComparison);
    // Filter based on the search query
    if (query.length > 0) {
      // Keep any colors that include the search query in their name
      colors = colors.filter(c => c.name.toUpperCase().includes(query));
    }
    // Render each color by adding it to the list
    colors.forEach(c => addColor(c));
  }

  // Sort colors by id, name, or hue
  const compareId = (a, b) => a.id - b.id;
  const compareHue = (a, b) => a.hue - b.hue;
  const compareHueDesc = (a, b) => b.hue - a.hue;
  const compareName = (a, b) => a.name.localeCompare(b.name);
  const compareNameDesc = (a, b) => b.name.localeCompare(a.name);
  // Handle the name sort toggler
  function sortByName() {
    if (sort === "name") {
      // Toggle the sorting direction to descending
      if (desc === false) {
        desc = true;
        nameSortIcon.className = "desc";
        hueSortIcon.className = "hide";
      } else {
        // Set it to sort by id, ascending
        sort = "id";
        desc = false;
        nameSortIcon.className = "hide";
        hueSortIcon.className = "hide";
      }
    } else {
      // Set it to sort by name, ascending
      sort = "name";
      desc = false;
      nameSortIcon.className = "asc";
      hueSortIcon.className = "hide";
    }
    renderList();
  }
  // Set the handler to the name sort toggler's click event
  nameSort.addEventListener("click", sortByName);
  // Handle the hue sort toggler
  function sortByHue() {
    if (sort === "hue") {
      // Toggle the sorting direction to descending
      if (desc === false) {
        desc = true;
        nameSortIcon.className = "hide";
        hueSortIcon.className = "desc";
      } else {
        // Set it to sort by id, ascending
        sort = "id";
        desc = false;
        nameSortIcon.className = "hide";
        hueSortIcon.className = "hide";
      }
    } else {
      // Set it to sort by hue, ascending
      sort = "hue";
      desc = false;
      nameSortIcon.className = "hide";
      hueSortIcon.className = "asc";
    }
    renderList();
  }
  // Set the handler to the hue sort toggler's click event
  hueSort.addEventListener("click", sortByHue);

  // Search for colors by name
  function search() {
    query = searchInput.value.toUpperCase();
    renderList();
  }
  searchInput.addEventListener("input", search);

  // Generate a random color
  function generate() {
    // Get a new color from the Random Generator
    let newColor = RandomGenerator.generateRandomColor();
    // Add that new color to the Store
    Store.addColor(newColor);
    // Re-render the whole list
    renderList();
  }
  // Set the handler to the generate button's click event
  generateButton.addEventListener("click", generate);

  // Render the list once the window has loaded
  window.addEventListener("load", renderList);
})();
