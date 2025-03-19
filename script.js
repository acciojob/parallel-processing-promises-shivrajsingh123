document.addEventListener("DOMContentLoaded", function () {
    const outputDiv = document.getElementById("output");
    const errorDiv = document.getElementById("error");
    const loadingDiv = document.getElementById("loading");

    const imageUrls = [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg"
    ];

    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image: ${url}`);
        });
    }

    function downloadImages() {
        loadingDiv.style.display = "block";
        errorDiv.innerHTML = "";
        outputDiv.innerHTML = "";

        const promises = imageUrls.map(url => downloadImage(url));

        Promise.all(promises)
            .then(images => {
                loadingDiv.style.display = "none";
                images.forEach(img => outputDiv.appendChild(img));
            })
            .catch(error => {
                loadingDiv.style.display = "none";
                errorDiv.innerHTML = `<p>${error}</p>`;
            });
    }

    downloadImages();
});
