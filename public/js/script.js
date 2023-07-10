const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const signupForm = document.getElementById('signupForm');

const API_URL = '/api/users'

signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

signupForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const values = {
    firstname:signupForm.firstName.value,
    lastname:signupForm.lastName.value,
    email:signupForm.email.value,
    phone:signupForm.phone.value,
    password:signupForm.password.value,
    confirmpassword:signupForm.confirmpassword.value
  }
  fetch(`${API_URL}/addNew`, {
    method:'post',
    body:JSON.stringify(values),
    headers:{'content-type': 'application/json'}
  }).then((response) => response.json()).then((json)=>printingRegisterResponse(json))
  signupForm.reset()
})



loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const values = {
    email:loginForm.email.value,
    password:loginForm.password.value
  }
  fetch(`${API_URL}/login`, {
    method:'post',
    body:JSON.stringify(values),
    headers:{'content-type': 'application/json'}
  }).then((response)=>response.json()).then((json)=>printingLoginResponse(json))
  loginForm.reset()
})

const printingLoginResponse = (response) => {
  if(response.statusCode === 200) {
    console.log(response)
    alert(response.message);
    window.location.replace('/pong')
  }else {
    alert(response.message)
  }
}

const printingRegisterResponse = (response) =>{
  if(response.statusCode === 200) {
    alert(response.message);
    window.location.href('/')
}else {
  alert(response.message)
}
}