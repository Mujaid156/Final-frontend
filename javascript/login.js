function  login() {
    // let email = document.querySelector('#email').value;
    // let password = document.querySelector('#password').value;
    // console.log(email, password);

    fetch("https://sleepy-crag-84730.herokuapp.com/login", {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.Status_code == 200) {
            window.location.href = "./products.html"
        }
    })
}