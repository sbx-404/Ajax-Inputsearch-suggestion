const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((Response) => Response.json())
  .then((data) => cities.push(...data));

function findMatches(word, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(word, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatching() {
    const MatchArray = findMatches(this.value, cities);
    console.log(cities)
    const displayHTML = MatchArray.map((place) => {
    let newchar = new RegExp(this.value, "gi");
    const cityName = place.city.replace(newchar,`<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(newchar,`<span class="hl">${this.value}</span>`);

    return `
    <li>
    <span>${cityName}, ${stateName}</span>
    <span>${place.population}</span>
    </li>
    `;
  }).join("");
  suggestionsField.innerHTML = displayHTML;
}

const searchField = document.querySelector(".search");
const suggestionsField = document.querySelector(".suggestions");

searchField.addEventListener("change", displayMatching);
searchField.addEventListener("keyup", displayMatching);





