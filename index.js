async function fetchData() {
  const URL = "https://api.tvmaze.com/shows/22036/episodes";
  try {
    const res = await fetch(URL);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


async function gettingName() {
  const movieData = await fetchData();
  for (let data of movieData) {
    const card = document.createElement("div");
    card.classList.add("cards");
    const title = document.createElement("p");
    title.innerHTML = `${data.name} S0${data.season}E0${data.number}`;
    title.classList.add("cardTitle");
    const link = document.createElement("a");
    link.href = data.url;
    const img = document.createElement("img");
    img.src = data.image.medium;
    link.appendChild(img);
    const movieSeasonNumber = document.createElement("p");
    movieSeasonNumber.classList.add("sesonAndEpisode")

    movieSeasonNumber.innerHTML = `S0${data.season} - E0${data.number}`;
    const details = document.createElement("p");
    const summary = document.createElement("summary");
    details.appendChild(summary);
    const section1=document.createElement("section")
   
    summary.innerHTML = "Summary";
    details.innerHTML = data.summary;
    const select = document.querySelector(".select");
    const option = document.createElement("option");
    option.innerHTML = `${data.name} S0${data.season}E0${data.number}`;
    
    select.appendChild(option);
    const nav = document.querySelector("nav");
    nav.appendChild(select);
    section1.append(details)
    card.append( link,title, section1, movieSeasonNumber);
    const content = document.querySelector(".content");
    content.appendChild(card);
  }
}
gettingName();

const search = document.querySelector(".search-input");
search.addEventListener("keyup", () => {
  const input = document.querySelector(".search-input").value.toLowerCase();
  const cards = document.querySelectorAll(".cards");

  cards.forEach((card) => {
    let title = card.querySelector(".cardTitle");
    if (title.innerHTML.toLowerCase().indexOf(input) > -1) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});

const select = document.querySelector(".select");
const cards = document.querySelectorAll(".cards");

select.addEventListener("change", (e) => {
  const cards = document.querySelectorAll(".cards");
  let optionValue = e.target.value;

  cards.forEach((card) => {
    let title = card.querySelector(".cardTitle");
    if (optionValue === title.innerHTML || optionValue === "All Episodes") {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});
