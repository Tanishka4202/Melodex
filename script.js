let clientId = '8b0cb7ee37f14f62b81711190b6bcac6'; // Replace with your Client ID
let clientSecret = '1154a7195d104c32acde9aa6bcc67142'; // Replace with your Client Secret

let currentsong = new Audio();
async function getAccessToken() {
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
    });
    let data = await response.json();
    return data.access_token;
}

async function fetchSongs(query) {
    let token = await getAccessToken();
    let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    let data = await response.json();
    return data.tracks.items;
}

async function displayResults(query, results) {


    
    let songs = await fetchSongs(query);
    songs.forEach(song => {
        results.innerHTML = results.innerHTML + `<div class="card">
                    <div class="content">
                        <img src="${song.album.images[0].url}" alt="">
                        <h4>${song.name}</h4>
                        <p>${song.artists[0].name}</p>
                    </div>
                </div>`;
    });
}
async function displayAlbumResults(query, results) {
    results.innerHTML = '';
    let token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=5`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    Albums = data.albums.items;
    Albums.forEach(album => {
        results.innerHTML = results.innerHTML + `<div class="card">
                    <div class="content">
                        <img src="${album.images[0].url}" alt="">
                        <h4>${album.name}</h4>
                        <p>${album.artists[0].name}</p>
                    </div>
                </div>`
    });
}
async function displayPlaylistsResults(query, results ) {
    results.innerHTML = '';
    let token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=50`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    playlists = data.playlists.items;

    playlists.forEach(playlist => {
        results.innerHTML = results.innerHTML + `<div class="card">
                    <div class="content">
                        <img src="${playlist.images[0].url}" alt="">
                        <h4>${playlist.name}</h4>
                    </div>
                </div>`;
    })
}
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

async function displaytrendingResults() {
    let query = "trending";
    let results = document.getElementById('trending');

    results.innerHTML = '';
    let token = await getAccessToken();
    let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    let data = await response.json();
    let songs = data.tracks.items;
    songs.forEach((song, index) => {
        let trackDuration = formatDuration(song.duration_ms);
        results.innerHTML = results.innerHTML + `<div class="card2">
                    <div class="hash">#${index + 1}</div>
                    <div class="songdata">
                        <img class="profile" src="${song.album.images[0].url}" alt="">
                        <span>
                            <h4>${song.name}</h4>
                            <p>${song.artists[0].name}</>
                        </span>
                    </div>
                    <div class="albumname">${song.album.name}</div>
                    <div class="time">
                        <img class="addfav" src="assets/svg/addfav.svg" alt="">
                        ${trackDuration}
                    </div>
                </div>`

    });
}

async function displayArtists() {
    let query = "most Popular artist";
    let results = document.getElementById('popularartists');
    results.innerHTML = '';
    let Artists = await fetchSongs(query);
    Artists.forEach(Artist => {
        results.innerHTML = results.innerHTML + `
                <div class="card card3">
                    <div class="content">
                        <img src="${Artist.album.images[1].url}" alt="">
                        <p>${Artist.artists[0].name}</p>
                    </div>
                </div>`
    });
}

let query1 = "Weekly Top Songs";
let results1 = document.getElementById('weeklyTopSongs');
displayResults(query1, results1);

let query2 = "New Song";
let results2 = document.getElementById('newRelease');
displayResults(query2, results2);

let query3 = "Top albums"
let results3 = document.getElementById('topalbums')
displayAlbumResults(query3, results3);

let query4 = "Playlists";
let results4 = document.getElementById('moodplaylist');
displayPlaylistsResults(query4,results4);

displaytrendingResults();
displayArtists();

let open = document.querySelector(".hamburger")
open.addEventListener("click", ()=>{
    document.querySelector("#right").style.left = "0";
    document.getElementsByClassName("hamburger").opacity= "0";
})

let close = document.querySelector(".cross")
close.addEventListener("click", ()=>{
    document.querySelector("#right").style.left = "-100%";
})












