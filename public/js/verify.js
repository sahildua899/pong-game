const verifyAccount = document.querySelector("form.verify");
const API_URL = '/api/users'


const token = window.location.href.split('/')[4]
console.log(token)

if(!token){
    window.location.assign('/')
}

verifyAccount.verifyCode.value = token

verifyAccount.addEventListener('submit', (e) =>{
    e.preventDefault();
    const value = {
        token:verifyAccount.verifyCode.value
    }

    fetch(`${API_URL}/authenticate`, {
        method:'post',
        body:JSON.stringify(value),
        headers:{'content-type': 'application/json'}
    }).then((response) => response.json()).then((json)=>verifyResponse(json))
})

const verifyResponse = (response) =>{
    if(response.statusCode === 200) {
        alert(response.message);
        window.location.assign('/')
    }else {
        alert(response.message)
    }
}