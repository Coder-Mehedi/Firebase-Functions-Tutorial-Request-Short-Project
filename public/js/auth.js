const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");
const registerForm = document.querySelector(".register");
const loginForm = document.querySelector(".login");
const signOut = document.querySelector(".sign-out");

// toggle auth modal
authSwitchLinks.forEach((link) => {
	link.addEventListener("click", () => {
		authModals.forEach((modal) => modal.classList.toggle("active"));
	});
});

// Register form
registerForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = registerForm.email.value;
	const password = registerForm.password.value;
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log("registered", user);
			registerForm.reset();
		})
		.catch((err) => {
			registerForm.querySelector(".error").textContent = err.message;
		});
});
