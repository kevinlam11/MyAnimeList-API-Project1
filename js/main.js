// Elements
var mainFormEl = document.querySelector('#main-form');
var mainInputEl = document.querySelector('#main-input')


function showNotFoundMessage() {
    var notFoundEl = document.querySelector('#notFound-message');
    notFoundEl.removeAttribute('hidden')
    setTimeout(() => {
        notFoundEl.setAttribute('hidden', '')
    }, 4000)
}


async function searchForUser(e) {
    e.preventDefault()
    var value = mainInputEl.value;

    if (typeof value !== 'string') {
        console.log('Must enter a string!')
    }


    // Confirms that the user exists
    fetch(`https://api.jikan.moe/v4/users/${value}`)
        .then((res) => {
            if (res.status === 200) {
                window.location.href = window.location.href.replace('/index.html', '/startPage.html' + "#" + value)
                console.log(window.location.href)
                // window.location.href = 'http://localhost:63342/MyAnimeList-API-Project1/startPage.html' + "#" + value;
            } else {
                console.log('User not found!')
                showNotFoundMessage();
            }
        })
}

mainFormEl.addEventListener('submit', searchForUser)




