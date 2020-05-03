const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");

requestLink.addEventListener("click", () => {
	requestModal.classList.add("open");
});

requestModal.addEventListener("click", (e) => {
	if (e.target.classList.contains("new-request")) {
		requestModal.classList.remove("open");
	}
});

// say hello function call
const button = document.querySelector(".call");
button.addEventListener("click", () => {
	// get function reference
	console.log("clicked");
	const sayHello = firebase.functions().httpsCallable("sayHello");
	sayHello({ name: "Mehedi" }).then((result) => {
		console.log(result.data);
	});
});
