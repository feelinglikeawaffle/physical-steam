// -------------------------------
// CONFIG
// -------------------------------
const API_KEY = "YOUR_STEAM_WEB_API_KEY"; 
const RELAY_URL = "https://your-relay-page.com"; // You will create this next

const steamLoginBtn = document.getElementById("steamLoginBtn");
const userInfo = document.getElementById("userInfo");
const gameSelect = document.getElementById("gameSelect");
const styleSelect = document.getElementById("styleSelect");
const generateBtn = document.getElementById("generateBtn");
const card = document.getElementById("card");

let steamID = null;

// -------------------------------
// 1. Steam Login (OpenID)
// -------------------------------
steamLoginBtn.addEventListener("click", () => {
    const openidURL =
        "https://steamcommunity.com/openid/login" +
        "?openid.ns=http://specs.openid.net/auth/2.0" +
        "&openid.mode=checkid_setup" +
        "&openid.return_to=" + encodeURIComponent(RELAY_URL) +
        "&openid.realm=" + encodeURIComponent(RELAY_URL) +
        "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
        "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select";

    window.location.href = openidURL;
});

// -------------------------------
// 2. Detect SteamID from relay redirect
// -------------------------------
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("steamid")) {
    steamID = urlParams.get("steamid");
    userInfo.innerHTML = `<p>Logged in as SteamID: ${steamID}</p>`;
    loadSteamLibrary();
}

// -------------------------------
// 3. Load Steam Library (real API)
// -------------------------------
async function loadSteamLibrary() {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamID}&include_appinfo=1&include_played_free_games=1&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    const games = data.response.games;

    gameSelect.innerHTML = "";

    games.forEach(game => {
        const option = document.createElement("option");
        option.value = game.appid;
        option.textContent = game.name;
        gameSelect.appendChild(option);
    });
}

// -------------------------------
// 4. Generate Card
// -------------------------------
generateBtn.addEventListener("click", () => {
    const appid = gameSelect.value;
    const style = styleSelect.value;

    const headerURL = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;

    card.className = style;

    card.innerHTML = `
        <img src="${headerURL}">
        <h3>${gameSelect.options[gameSelect.selectedIndex].text}</h3>
        <p>AppID: ${appid}</p>
        <p>Style: ${style}</p>
    `;
});
