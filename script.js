// Target correct elements based on updated HTML structure
const contactBtn = document.getElementById("contact-btn");
const aboutBtn = document.getElementById("about-btn");
const homeBtn = document.getElementById("home-btn");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const container = document.querySelector(".container");

const citiesArray = ["Mumbai", "Pune", "Delhi", "Bangalore", "Kolkata"];
const CACHE_KEY = "weatherCache";

const apiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a083f9488amsh1caa3bc882d7ceep1ec31ajsndcbab3fbcd21",
    "x-rapidapi-host": "open-weather13.p.rapidapi.com",
  },
};

// Helper function to build HTML
function createCardHTML(cityData, isBig = false) {
  if (!cityData || !cityData.main) return "";

  const tempC = Math.round(((cityData.main.temp - 32) * 5) / 9);
  const feelsLikeC = Math.round(((cityData.main.feels_like - 32) * 5) / 9);
  const windSpeed = cityData.wind.speed;
  const weatherMain = cityData.weather[0].main;
  const iconCode = cityData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const cardClass = isBig ? "weather-card big-card" : "weather-card";

  return `
    <div class="${cardClass}">
      <h2>${cityData.name}</h2>
      <img src="${iconUrl}" alt="${weatherMain} icon" style="width: 100px; height: 100px;">
      <p class="${isBig ? "huge-temp" : ""}"><strong>${tempC}°C</strong></p>
      <p>Feels like: ${feelsLikeC}°C</p>
      <p>Weather: ${weatherMain}</p>
      <p>Wind: ${windSpeed} mph</p>
    </div>
  `;
}

// Load default cities
async function loadDefaultCities() {
  container.innerHTML = "<h3>Loading default cities...</h3>";

  const cachedDataString = localStorage.getItem(CACHE_KEY);
  let weatherData = null;

  if (cachedDataString) {
    const cachedData = JSON.parse(cachedDataString);
    if (Date.now() - cachedData.timestamp < 60 * 60 * 1000) {
      weatherData = cachedData.data;
    }
  }

  if (!weatherData) {
    try {
      const fetchPromises = citiesArray.map((city) =>
        fetch(
          `https://open-weather13.p.rapidapi.com/city?city=${city}&lang=EN`,
          apiOptions,
        ).then((res) => res.json()),
      );
      weatherData = await Promise.all(fetchPromises);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: weatherData }),
      );
    } catch (error) {
      console.error("Failed to fetch default cities:", error);
      container.innerHTML = "<h3>Error loading data.</h3>";
      return;
    }
  }

  container.innerHTML = "";
  weatherData.forEach((cityData) => {
    container.innerHTML += createCardHTML(cityData, false);
  });
}

// Search functionality
searchBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const cityValue = cityInput.value.trim();
  if (!cityValue) return;

  container.innerHTML = "<h3>Searching...</h3>";

  try {
    const response = await fetch(
      `https://open-weather13.p.rapidapi.com/city?city=${cityValue}&lang=EN`,
      apiOptions,
    );
    const cityData = await response.json();
    console.log("Search Result:", cityData);

    container.innerHTML = "";

    if (!cityData.main) {
      container.innerHTML = `<h3>City not found.</h3>`;
      return;
    }

    container.innerHTML = createCardHTML(cityData, true);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
});

// Navigation Event Listeners
homeBtn.addEventListener("click", () => {
  cityInput.value = "";
  loadDefaultCities();
});

aboutBtn.addEventListener("click", () => {
  container.innerHTML = `
    <div class="about-section">
      <h2>Behind the Code</h2>
      <p>Hi, I'm Piyush. I am a self-taught developer currently pursuing my B.Sc in Computer Science. I built this weather application entirely from scratch to solidify my understanding of frontend architecture and asynchronous data fetching.</p>
      
      <h3>The Tech Stack</h3>
      <p>No heavy frameworks, no shortcuts. Just core web technologies:</p>
      <div>
        <span class="tech-tag">HTML5</span>
        <span class="tech-tag">CSS3</span>
        <span class="tech-tag">Vanilla JavaScript</span>
      </div>

      <h3>The Data</h3>
      <p>The real-time weather data is powered by the <strong>OpenWeather13 API</strong>, consumed via <strong>RapidAPI</strong>. I utilized modern JavaScript <code>fetch</code> and <code>async/await</code> protocols to handle the network requests, alongside <code>Promise.all</code> and <code>localStorage</code> to optimize performance and manage API rate limits.</p>

      <h3>The Goal</h3>
      <p>I am relentlessly focused on leveling up my coding skills. My ultimate goal is to architect scalable software, build a prosperous career, and eventually travel the world—coding from peaceful, beautiful countries.</p>
    </div>
  `;
});

contactBtn.addEventListener("click", () => {
  container.innerHTML = `
    <div class="contact-section">
      <h2>Let's Connect</h2>
      <p>I am actively looking for opportunities to build scalable software and grow as a developer. Feel free to reach out.</p>
      
      <div class="social-links">
        <a href="https://github.com/Piyush2182" target="_blank" class="social-btn github-btn">
          GitHub
        </a>
        <a href="https://linkedin.com/in/piyush-thakur-2586b1380" target="_blank" class="social-btn linkedin-btn">
          LinkedIn
        </a>
        <button id="copy-email-btn" class="social-btn email-btn">
          Copy Email Address
        </button>
      </div>
    </div>
  `;

  // Copy to Clipboard logic
  const copyBtn = document.getElementById("copy-email-btn");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText("piyushh0723@gmail.com")
      .then(() => {
        copyBtn.textContent = "Copied to Clipboard!";
        copyBtn.style.backgroundColor = "#34A853";

        setTimeout(() => {
          copyBtn.textContent = "Copy Email Address";
          copyBtn.style.backgroundColor = "#ea4335";
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  });
});

// Run on initial page load
window.addEventListener("DOMContentLoaded", loadDefaultCities);
