// This the first fetch function
async function fetchMalProfileData(username) {
    var userInfo = {};
    var userUrl = `https://api.jikan.moe/v4/users/${username}`

    try {
        const res = await fetch(userUrl);
        const data = await res.json()

        userInfo.username = data.data.username;
        userInfo.url = data.data.url;
        userInfo.mal_id = data.data.mal_id;
        userInfo.location = data.data.location;
        userInfo.last_Online = data.data.last_online;
        userInfo.joined = data.data.joined;
        userInfo.images = data.data.images.jpg.image_url;
        userInfo.birthday = data.data.birthday;
        // console.log(data)
        // console.log(userInfo)

        var statsMarkup = `
            <ul class="lead">
                  <li>MAL Id: ${userInfo.mal_id}</li>
                  <li>URL: ${userInfo.url}</li> 
                  <li>Last Online: ${userInfo.last_Online}</li>
                  <li>Location: ${userInfo.location}</li>
                  <li>Joined: ${userInfo.joined}</li>
                 <li>Birthday: ${userInfo.birthday}</li>
            </ul>`

        // Grab elements after the data is fetched
        var imgEl = document.getElementsByTagName('img')
        var headingStatEl = document.querySelector('.display-4')
        var statBoxEl = document.querySelector('.stat-box');

        // Renders the information to the page
        imgEl[0].src = userInfo.images;
        headingStatEl.innerHTML = '';
        statBoxEl.innerHTML = '';
        headingStatEl.insertAdjacentHTML('afterbegin', `<h1 class="display-4">${userInfo.username}</h1>`)
        statBoxEl.insertAdjacentHTML('afterbegin', statsMarkup);

    } catch (error) {
        console.log(error)
    }

}

function fetchMangaDexData() {
    fetch('https://api.mangadex.org/user/Jan0195')
        .then(res => res.json())
        .then(data => console.log(data))

}


async function getUserStatsAndRender(username) {
    var statsUrl = `https://api.jikan.moe/v4/users/${username}/statistics`

    try {
        const res = await fetch(statsUrl);
        const data = await res.json();

        console.log(data);

        //Build the markups
        var animeMarkup = `<h4>Anime:</h4>
                      <p>Days Watched: ${data.data.anime.days_watched}</p>
                      <p>Mean Score: ${data.data.anime.mean_score}</p>
                      <p>Watching: ${data.data.anime.watching}</p>
                      <p>Completed: ${data.data.anime.completed}</p>
                       <p>On_hold: ${data.data.anime.on_hold}</p>`

        var mangaMarkup = `<h4>Manga</h4>
                      <p>Days Watched: ${data.data.manga.days_read}</p>
                      <p>Mean Score: ${data.data.manga.mean_score}</p>
                      <p>Watching: ${data.data.manga.reading}</p>
                      <p>Completed: ${data.data.manga.completed}</p>
                       <p>On_hold: ${data.data.manga.on_hold}</p>`


        // Grab the elements
        var animeCardEl = document.querySelector('#anime-read-card')
        var mangaCardEl = document.querySelector('#manga-read-card')
        animeCardEl.innerHTML = '';
        mangaCardEl.innerHTML = '';

        animeCardEl.insertAdjacentHTML('afterbegin', animeMarkup)
        mangaCardEl.insertAdjacentHTML('afterbegin', mangaMarkup)


    } catch (error) {
        console.log(error);

    }
}

async function getUserFavorites(username) {
    var favoritesEl = document.querySelector('#personal-favorite-card');
    var favoritesUrl = `https://api.jikan.moe/v4/users/${username}/favorites`


    try {
        const res = await fetch(favoritesUrl);
        const data = await res.json();

        var markup = `<h4 class="card-text">My Favorites:</h4>
                      <p class="card-text">Anime: ${data.data.anime}</p>
                      <p class="card-text">Manga: ${data.data.manga}</p>
                      <p class="card-text">Characters: ${data.data.characters}</p>
                       <p class="card-text">People: ${data.data.people}</p>`;


        favoritesEl.innerHTML = '';
        favoritesEl.insertAdjacentHTML('afterbegin', markup)
        // console.log(data, 'favorites!');
    } catch (error) {
        console.log(error);
    }
}

async function getTopAnimeAndManga() {
    try {
        const resOne = await fetch(`https://api.jikan.moe/v4/top/anime`);
        const topAnime = await resOne.json()
        console.log(topAnime)

        const resTwo = await fetch(`https://api.jikan.moe/v4/top/manga`);
        const topManga = await resTwo.json()
        console.log(topManga)

    } catch (error) {
        console.log(error);

    }
}

async function fetchDataSets(username) {
    var bothSets = false;

    await fetchMalProfileData(username);
    await getUserStatsAndRender(username);
    await getUserFavorites(username);
    await getTopAnimeAndManga();

    if (bothSets === true) {
        await fetchMangaDexData()
    }
}


// ['hashchange', 'load'].forEach(e=> window.addEventListener(e, ))


// Run on load
window.addEventListener('load', async () => {
    var hash = window.location.hash.slice(1)
    console.log(hash)
    await fetchDataSets(hash)
})

// Run on the buttons that use localstorage