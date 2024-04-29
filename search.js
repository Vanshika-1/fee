  const key = "Ml_oUoQoibUIGOXB6j4yIam2pSBsUDBLvLz87i3IcEI";

    const form = document.querySelector("form");
    const input = document.querySelector("input[type='search']");
    const searchResults = document.querySelector(".results");
    const voiceBtn = document.getElementById('voiceBtn');
    const showMoreBtn = document.getElementById('showMoreBtn');

    let pageNumber = 1;

    async function searchImages(query) {
        const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${query}&client_id=${key}`

        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        if (pageNumber === 1) {
            searchResults.innerHTML = "";
        }
        results.map((result)=>{
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("image-item");
            imageWrapper.classList.add("text-center");

            const image = document.createElement("img");
            image.setAttribute("src",`${result.urls.small}`);
            image.style.width = "250px"
            image.style.height = "250px"
            imageWrapper.appendChild(image);
            searchResults.appendChild(imageWrapper);
        })
        pageNumber++;
    }

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        pageNumber = 1;
        searchImages(input.value);
    })

    // Voice Search
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            searchImages(transcript);
        };

        voiceBtn.addEventListener('click', function() {
            recognition.start();
        });
    } else {
        voiceBtn.style.display = 'none';
    }

    // Show More button functionality
    showMoreBtn.addEventListener('click', () => {
        searchImages(input.value);
    });

