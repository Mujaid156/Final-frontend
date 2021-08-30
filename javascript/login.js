fetch("https://sleepy-crag-84730.herokuapp.com/")
.then((res) => res.json())
.then((data) => {
    console.log(data);
});

function  login() {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    console.log(email, password);

    fetch("https://sleepy-crag-84730.herokuapp.com/user-registration/", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}