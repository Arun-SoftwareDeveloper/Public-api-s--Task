document.addEventListener("DOMContentLoaded", () => {
  const foxImagesContainer = document.querySelector(".fox-images");
  const generateFoxBtn = document.getElementById("generateFoxBtn");

  const foxApiUrl = "https://randomfox.ca/floof/";

  async function fetchFoxImage() {
    try {
      const response = await fetch(foxApiUrl);
      const data = await response.json();
      return data.image;
    } catch (error) {
      console.error("Error fetching fox image:", error);
      return "";
    }
  }

  async function displayFoxImage() {
    const foxImage = await fetchFoxImage();

    if (!foxImage) {
      console.error("Received an unexpected fox image data.");
      return;
    }

    const foxImageElement = document.querySelector(".fox-image");
    foxImageElement.src = foxImage;
    foxImageElement.style.transform = "scale(1)";
    foxImageElement.style.opacity = 1;
  }

  generateFoxBtn.addEventListener("click", () => {
    displayFoxImage();
  });

  // Initial display
  displayFoxImage();
});
