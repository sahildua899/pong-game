const newPassForm = document.querySelector("form.newpass");
const API_URL = '/api/users'


const token = window.location.href.split('/')[4]

if(!token) window.location.replace('/reset')

newPassForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const value = {
        token:token,
        password:newPassForm.password.value,
        confirmpassword:newPassForm.confirmpassword.value
    }

    fetch(`${API_URL}/newpass`, {
        method:'post',
        body:JSON.stringify(value),
        headers:{'content-type': 'application/json'}
    }).then((response) => response.json()).then((json)=>newPassResponse(json))
})

const newPassResponse = (response) =>{
    if(response.statusCode === 200) {
        
        alert(response.message);
        window.location.assign('/')
    }else {
        alert(response.message)
    }
}