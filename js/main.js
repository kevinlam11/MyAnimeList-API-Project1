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


function fetchBothDataSets() {
    let bothSets = false;
    let userInfo = {};

    fetch('https://api.jikan.moe/v4/users/Raging-Man')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            userInfo.username = data.username;
            userInfo.url = data.url;
            userInfo.mal_id = data.mal_id;
            userInfo.location = data.location;
            userInfo.lastOnline = data.lastOnline;
            userInfo.joined = data.joined;
            userInfo.images = data.images.jpg.image_url;
            userInfo.birthday = data.birthday;
        })


    if (bothSets === true) {
        fetchMangaDexData()
    }
}

fetchBothDataSets();