const token = "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";
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    try {
        image.src = "/loading.webp";
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ inputs: inputText.value.trim() }), // Trim extra whitespace
            }
        );

        // Check if the response is OK; otherwise, log response details
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from API:", errorData);
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error("Error generating image:", error);
        alert("Failed to generate image. Please check the console for more details.");
        return null;
    }
}

button.addEventListener("click", async function () {
    const response = await query();
    if (response) {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    }
});

