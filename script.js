const accessKey = "xxk3hk32Jd7-fXDzuDU9wSRrrURBn5FC5UIPCk-Z6hw";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
let page = 1;
let loading = false; 

document.addEventListener('DOMContentLoaded', function () {
    formEl.addEventListener('submit', function (event) {
        event.preventDefault();
        page = 1; 
        searchImages();
    });

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const bodyHeight = document.body.clientHeight;

       
        if (scrollTop + windowHeight >= bodyHeight && !loading) {
            searchImages();
        }
    });
});

async function searchImages() {
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        loading = true; 
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        if (page === 1) {
            searchResults.innerHTML = ""; 
        }

        const results = data.results;
        results.forEach((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const description = document.createElement('p');
            description.textContent = result.alt_description;

            const downloadButton = document.createElement('a');
            downloadButton.href = result.links.download;
            downloadButton.target = "_blank";
            downloadButton.textContent = "Download";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(description);
            imageWrapper.appendChild(downloadButton);
            searchResults.appendChild(imageWrapper);
        });

        page++;
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading = false; 
    }
}

async function fetchImages() {
    const response = await fetch(`https://api.unsplash.com/photos/random?count=6&client_id=${accessKey}`);
    const data = await response.json();
    return data;
}


async function displayImages() {
    const imageContainer = document.querySelector('.imageContainer');
    const images = await fetchImages();

    images.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('image-item');

        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description;

        const description = document.createElement('p');
        description.textContent = image.alt_description;

        const downloadButton = document.createElement('a');
        downloadButton.href = image.links.download;
        downloadButton.textContent = 'Download';

        imageElement.appendChild(img);
        imageElement.appendChild(description);
        imageElement.appendChild(downloadButton);

        imageContainer.appendChild(imageElement);
    });
}


window.addEventListener('DOMContentLoaded', displayImages);
