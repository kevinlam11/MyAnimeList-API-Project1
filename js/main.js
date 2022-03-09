// var infoBlockEl = document.querySelector('.info-block');

// This the first fetch function
function fetchData() {

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

        // infoBlockEl.insertAdjacentHTML('afterbegin', markup)
    } catch (error) {
        console.log('There was an error! ❌')
    }


}


fetchData();
