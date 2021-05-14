const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn = document.querySelector("#sign-in-btn");

//Metodo ppara añadir un boton con click
sign_up_btn.addEventListener('click',() =>{
	container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click',() =>{
	container.classList.remove("sign-up-mode");
});

