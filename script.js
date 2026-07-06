// Fake Steam data (replace with real API later)
const fakeGames = [
    {
        appid: 570,
        name: "Dota 2",
        header: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg"
    },
    {
        appid: 730,
        name: "Counter-Strike: Global Offensive",
        header: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg"
    },
    {
        appid: 440,
        name: "Team Fortress 2",
        header: "https://cdn.cloudflare.steamstatic.com/steam/apps/440/header.jpg"
    }
];

const gameSelect = document.getElementById("gameSelect");
const styleSelect = document.getElementById("styleSelect");
const generateBtn = document.getElementById("generateBtn");
const card = document.getElementById("card");

// Populate dropdown
fakeGames.forEach(game => {
    const option = document.createElement("option");
    option.value = game.appid;
    option.textContent = game.name;
    gameSelect.appendChild(option);
});

// Generate card
generateBtn.addEventListener("click", () => {
    const selectedAppID = gameSelect.value;
    const selectedStyle = styleSelect.value;

    const game = fakeGames.find(g => g.appid == selectedAppID);

    card.className = selectedStyle;

    card.innerHTML = `
        <img src="${game.header}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p>AppID: ${game.appid}</p>
        <p>Style: ${selectedStyle}</p>
    `;
});
