document.addEventListener("DOMContentLoaded", () => {
  const catFactsContainer = document.querySelector(".cat-facts");
  const generateFactBtn = document.getElementById("generateFactBtn");

  const apiUrl = "https://cat-fact.herokuapp.com/facts";
  let factsData = [];

  function fetchFacts() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        factsData = data.map((fact) => fact.text);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async function displayFact() {
    if (factsData.length === 0) {
      await fetchFacts();
    }

    const factElement = document.createElement("div");
    factElement.classList.add("fact");
    factElement.innerHTML = factsData.shift();
    catFactsContainer.appendChild(factElement);

    factElement.style.animation = "fadeInUp 0.5s ease-in-out";

    setTimeout(() => {
      factElement.style.animation = "fadeOutDown 0.5s ease-in-out";

      factElement.addEventListener("animationend", () => {
        catFactsContainer.removeChild(factElement);
        displayFact(); // Display the next fact after the current one is removed
      });
    }, 1000); // Change 5000 to the desired display duration in milliseconds (e.g., 5 seconds)
  }

  generateFactBtn.addEventListener("click", () => {
    displayFact();
  });

  // Initial fetch and display
  fetchFacts().then(() => {
    displayFact();
  });
});
