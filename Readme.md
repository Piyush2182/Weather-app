# Weather-app 🌤️

A modern, fast, and responsive Single Page Application (SPA) built to fetch and display real-time weather data.

**[Live Demo](YOUR_HOSTING_LINK_HERE)**

## The Engineering

This project was built from scratch without any frontend frameworks to demonstrate a solid understanding of core web technologies, asynchronous JavaScript, and DOM manipulation.

### Key Features

- **Asynchronous Data Fetching:** Utilizes modern `fetch` API and `async/await` to communicate with the OpenWeather13 API via RapidAPI.
- **Concurrent Requests:** Uses `Promise.all()` to fetch default city data simultaneously, significantly reducing initial load times.
- **Client-Side Caching:** Implements `localStorage` to cache API responses for 60 minutes. This prevents unnecessary network requests and protects against strict API rate limits.
- **Dynamic DOM Manipulation:** Entirely JavaScript-driven UI rendering, updating the view without page reloads.

## Tech Stack

- **HTML5** (Semantic structuring)
- **CSS3** (Custom variables, Flexbox, Responsive UI)
- **Vanilla JavaScript** (ES6+, DOM targeting, Fetch API)

## How to Run Locally

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Piyush2182/Weather-app.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd Weather-app
   \`\`\`
3. Open `index.html` in your browser. No build steps or local servers are strictly required, though using a Live Server extension in VS Code is recommended.

## A Note on API Keys

_Note for recruiters/reviewers:_ The RapidAPI key for the OpenWeather endpoint is currently included in the frontend code. This is intentional for this specific static-site deployment to demonstrate functionality without spinning up a dedicated backend proxy.
