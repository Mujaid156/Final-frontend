function  login() {
    // let email = document.querySelector('#email').value;
    // let password = document.querySelector('#password').value;
    // console.log(email, password);

    fetch("https://sleepy-crag-84730.herokuapp.com/login/", {
        method: 'POST',
        body: JSON.stringify({
            phone_number: document.querySelector('#phone_number').value,
            password: document.querySelector('#password').value
        }),
        headers: {
            'Content-type': 'application/json',
        },
       
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.status_code == 201) {
            window.location.href = "products.html"
        }else{
            alert("not working")
        }

    })
}

function myFunction() {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  