// This the first fetch function
function fetchMALData() {

    try {
        const res = fetch('https://api.jikan.moe/v4/users/Raging-Man')
        const data = res.json();
        console.log(data)
        var markup = `
      <div>
          <h1>${data.data.username}</h1>
          <div>
              <p>url: ${data.data.url}</p>
              <p>mal_id: ${data.data.mal_id}</p>
              <p>location: ${data.data.location}</p>
              <p>last_online: ${data.data.last_online}</p>
              <p>joined: ${data.data.joined}</p>
              <img src='${data.data.images.jpg.image_url}' alt="image" srcset="">
          </div>
      </div>`;

    } catch (error) {
        console.log('There was an error! ❌')
    }
}

function fetchMangaDexData() {
    fetch('https://api.mangadex.org/user/Jan0195')
        .then(res => res.json())
        .then(data => console.log(data))

}


async function fetchBothDataSets() {
    let bothSets = false;
    let userInfo = {};


    try {
        const res = await fetch('https://api.jikan.moe/v4/users/RogueCompany1');
        const data = await res.json()
        userInfo.username = data.data.username;
        userInfo.url = data.data.url;
        userInfo.mal_id = data.data.mal_id;
        userInfo.location = data.data.location;
        userInfo.lastOnline = data.data.lastOnline;
        userInfo.joined = data.data.joined;
        userInfo.images = data.data.images.jpg.image_url;
        userInfo.birthday = data.data.birthday;
        console.log(data)


        let statsMarkup = `
            <ul>
                  <li>MAL_id: ${userInfo.mal_id}</li>
                  <li>URL: ${userInfo.url}</li> 
                  <li>Location: ${userInfo.location}</li>
                  <li>last Online: ${userInfo.lastOnline}</li>
                  <li>Joined: ${userInfo.joined}</li>
                 <li>Birthday: ${userInfo.birthday}</li>
            </ul>`

        // Grab elements after the data is fetch
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

    if (bothSets === true) {
        fetchMangaDexData()
    }
}

fetchBothDataSets();


