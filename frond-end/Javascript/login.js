

function handleLogin(e) {
    e.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const LoginObj = {
        email,
        password
    };

    axios.post('http://localhost:4000/user/login', LoginObj)
        .then((result) => {
            console.log('User login successfully:', result);
            alert('Login successfully!');
            window.location.href = './sign-up.html';
        })
        .catch((err) => {
            console.error('Error logging user:', err);
            alert('Error logging user. Please try again.',req.message);
            
        });
   


}
