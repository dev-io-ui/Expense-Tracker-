
function handleFormSubmit(e)
{
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');

    const signUpObj ={
        name,
        email,
        phone,
        password
    }
    axios.post('http://localhost:4000/user/sign-up',signUpObj)
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    });



}