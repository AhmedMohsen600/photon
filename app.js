const apiKey = "563492ad6f917000010000015ed6bc0d6e8e4caeb684e5b5635fab97";
const gallery = document.querySelector(".gallery");
const inputSearch = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const buttonMore = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
// listeners.
inputSearch.addEventListener("input", updateinput);
function updateinput(e) {
  searchValue = e.target.value;
}

buttonMore.addEventListener("click", moreButton);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchFeature(searchValue);
  inputSearch.value = "";
  gallery.innerHTML = "";
});

async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
  const data = await fetchingData(fetchLink);
  generatePics(data);
}

async function searchFeature(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchingData(fetchLink);
  generatePics(data);
}

// fetching function
async function fetchingData(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  });
  return dataFetch.json();
}

// generating pics depending on data from API
function generatePics(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
      <div class="gallery-info"> 
      <p>${photo.photographer}</p>
      <a href=${photo.src.original}>Download</a>
      </div>
      <img src=${photo.src.large}></img>
      `;
    gallery.appendChild(galleryImg);
  });
}

async function moreButton() {
  page++;
  if (searchValue) {
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchingData(fetchLink);
  generatePics(data);
}
curatedPhotos();
