const resetForm = document.querySelector("form.reset");
const API_URL = '/api/users'
resetForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const value = {
        email:resetForm.email.value
    }
    fetch(`${API_URL}/forgot`, {
        method:'post',
        body:JSON.stringify(value),
        headers:{'content-type': 'application/json'}
    }).then((response) => response.json()).then((json)=>alert(json.message))
})