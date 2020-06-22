

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('.location');
const messageTwo = document.querySelector('.forecast');
weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = '';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                messageOne.innerHTML = data.error;
            } else {
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecast;
            }
        })
    }
    )
})
