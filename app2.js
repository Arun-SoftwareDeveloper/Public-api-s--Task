document.addEventListener("DOMContentLoaded", () => {
  const dogImagesContainer = document.querySelector(".dog-images");
  const generateImagesBtn = document.getElementById("generateImagesBtn");

  async function fetchDogImages() {
    const apiUrl = "https://dog.ceo/api/breeds/image/random/2";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async function displayDogImages() {
    const dogImages = await fetchDogImages();
    if (dogImages.length !== 2) {
      console.error("Received an unexpected number of dog images.");
      return;
    }

    const dogImageElements = document.querySelectorAll(".dog-image");
    dogImageElements.forEach((imageElement, index) => {
      imageElement.src = dogImages[index];
    });
  }

  generateImagesBtn.addEventListener("click", () => {
    displayDogImages();
  });

  // Initial display
  displayDogImages();
});
