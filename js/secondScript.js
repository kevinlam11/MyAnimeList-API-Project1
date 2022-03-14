class UserProfile {
    username;
    userInfo = {};

    constructor(username) {
        this.username = username
    }

    async getAboutAndRender() {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/users/${this.username}/about`);
            const data = await res.json();

            var aboutEl = document.querySelector('#about-card');
            var markup = `<h4>About</h4>
                          <p class="card-text">${data.data.about}</p>`

            aboutEl.innerHTML = '';
            aboutEl.insertAdjacentHTML('afterbegin', markup);


        } catch (error) {
            console.log(error)
        }
    };

    async fetchMalProfileData() {
        var userUrl = `https://api.jikan.moe/v4/users/${this.username}`;

        try {
            const res = await fetch(userUrl);
            const data = await res.json()

            this.userInfo.username = this.username; // Remember this
            this.userInfo.url = data.data.url;
            this.userInfo.mal_id = data.data.mal_id;
            this.userInfo.location = data.data.location;
            this.userInfo.last_Online = data.data.last_online;
            this.userInfo.joined = data.data.joined;
            this.userInfo.images = data.data.images.jpg.image_url;
            this.userInfo.birthday = data.data.birthday;

        } catch (error) {
            console.log(error);
        }
    }

    async getUserStatsAndRender() {
        var statsUrl = `https://api.jikan.moe/v4/users/${this.username}/statistics`

        try {
            const res = await fetch(statsUrl);
            const data = await res.json();

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

    async getUserFavorites() {
        var favoritesEl = document.querySelector('#personal-favorite-card');
        var favoritesUrl = `https://api.jikan.moe/v4/users/${this.username}/favorites`

        try {
            const res = await fetch(favoritesUrl);
            const data = await res.json();
            let animes, mangas, characters, people;
            animes = '';
            mangas = '';
            characters = '';
            people = '';

            data.data.anime.forEach(a => {
                animes += `, ${a.title}`;
            })

            data.data.manga.forEach(a => {
                mangas += `, ${a.title}`;
            })

            data.data.characters.forEach(a => {
                mangas += `, ${a.name}`;
            })

            data.data.people.forEach(a => {
                mangas += `, ${a.name}`;
            })

            // var markup = `<h4 class="card-text" ></h4>`

            var markup = `<h4 class="card-text">My Favorites:</h4>
                      <p class="card-text">Anime: ${animes}</p>
                      <p class="card-text">Manga: ${mangas}</p>
                      <p class="card-text">Characters: ${characters}</p>
                      <p class="card-text">People: ${people}</p>`;

            favoritesEl.innerHTML = '';
            favoritesEl.insertAdjacentHTML('afterbegin', markup)
        } catch (error) {
            console.log(error);
        }
    }

    renderInfo() {
        var statsMarkup = `
            <ul class="lead">
                  <li>MAL Id: ${this.userInfo.mal_id}</li>
                  <li>URL: ${this.userInfo.url}</li> 
                  <li>Last Online: ${this.userInfo.last_Online}</li>
                  <li>Location: ${this.userInfo.location}</li>
                  <li>Joined: ${this.userInfo.joined}</li>
                 <li>Birthday: ${this.userInfo.birthday}</li>
            </ul>`

        // Grab elements after the data is fetched
        var imgEl = document.getElementsByTagName('img')
        var headingStatEl = document.querySelector('.display-4')
        var statBoxEl = document.querySelector('.stat-box');

        // Renders the information to the page
        imgEl[0].src = this.userInfo.images;
        headingStatEl.innerHTML = '';
        statBoxEl.innerHTML = '';
        headingStatEl.insertAdjacentHTML('afterbegin', `<h1 class="display-4">${this.username}</h1>`)
        statBoxEl.insertAdjacentHTML('afterbegin', statsMarkup);
    }
}

class TopRank {
    topAnime = [];
    topManga = [];

    async fetchMangaDexUserData() {
        fetch('https://api.mangadex.org/user/Jan0195')
            .then(res => res.json())
            .then(data => console.log(data))
    }

    async getTopAnimeAndManga() {
        try {
            const resOne = await fetch(`https://api.jikan.moe/v4/top/anime`);
            const topAnime = await resOne.json()
            this.topAnime = topAnime.data.slice(0, 9)

            const resTwo = await fetch(`https://api.jikan.moe/v4/top/manga`);
            const topManga = await resTwo.json()
            this.topManga = topManga.data.slice(0, 9)

        } catch (error) {
            console.log(error);

        }
    }

    renderInfo() {
        var animes, mangas;
        animes = '';
        mangas = '';

        var topAnimeCardEl = document.querySelector('#top-anime-card');
        var topMangaCardEl = document.querySelector('#top-manga-card');

        this.topAnime.forEach((a) => {
            animes += `, ${a.title}`;
        })
        this.topManga.forEach((a) => {
            mangas += `, ${a.title}`;
        })

        var animeMarkup = `<h4 class="card-text">Top Global Anime</h4>
                           <p class="card-text">${animes}</p>`;

        var mangaMarkup = `<h4 class="card-text">Top Global Manga</h4>
                           <p class="card-text">${mangas}</p>`;

        topAnimeCardEl.innerHTML = '';
        topMangaCardEl.innerHTML = '';
        topAnimeCardEl.insertAdjacentHTML('afterbegin', animeMarkup);
        topMangaCardEl.insertAdjacentHTML('afterbegin', mangaMarkup);

    }
}


async function getGif() {
    var APIKey = 'AHFzERqQJcZaB2CPuAGSQNaNPGYjvy45'
    var gifCardEl = document.querySelector('#gif-card');

    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=Hamtaro`)
        const data = await res.json()
        var randInt = Math.floor(Math.random() * 10);
        var markup = `<div class="div-box">
                        <h4>Random Gif</h4>
                        <img src="${data.data[randInt].images.original.url}" alt="An anime gif"> 
                      </div>`

        gifCardEl.innerHTML = '';
        gifCardEl.insertAdjacentHTML('afterbegin', markup)

    } catch (error) {
        console.log('There was an error!')
    }
};

async function fetchDataSets(username) {
    var user = new UserProfile(username);
    var topAnimeManga = new TopRank()

    await user.fetchMalProfileData()
    await user.getUserStatsAndRender()
    await user.getUserFavorites()
    await user.getAboutAndRender()
    user.renderInfo()

    await topAnimeManga.getTopAnimeAndManga()
    topAnimeManga.renderInfo()

    await getGif();
}


// ['hashchange', 'load'].forEach(e=> window.addEventListener(e, ))


// Run on load
window.addEventListener('load', async () => {
    var hash = window.location.hash.slice(1)
    await fetchDataSets(hash)
})

// Run on the buttons that use localstorage