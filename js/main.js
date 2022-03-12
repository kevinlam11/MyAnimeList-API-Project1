// Elements
var mainFormEl = document.querySelector('#main-form');
var mainInputEl = document.querySelector('#main-input')


async function searchForUser(e) {
    // e.preventDefault()
    var value = mainInputEl.value;


    var response = await fetch(`https://api.jikan.moe/v4/users/${value}`)
        .catch(err => {
            if (err) {
                return err;
            }
        });

    console.log(response)
    if (response.status === 200) {
        // Save local storage

        window.location.href = 'http://localhost:63342/MyAnimeList-API-Project1/startPage.html' + "#" + value;
    }


}

mainFormEl.addEventListener('submit', searchForUser)




