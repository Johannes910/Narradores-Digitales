const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

//Metodo ppara añadir un boton con click
sign_up_btn.addEventListener('click',() =>{
	container.classList.add("sign-up-mode");
});

