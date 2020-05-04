// Notification
const notification = document.querySelector(".notification");
const showNotification = (message) => {
	notification.textContent = message;
	notification.classList.add("active");
	setTimeout(() => {
		notification.textContent = "";
		notification.classList.remove("active");
	}, 4000);
};

var app = new Vue({
	el: "#app",
	data: {
		requests: [],
	},
	methods: {
		upvoteRequest(id) {
			const upvote = firebase.functions().httpsCallable("upvote");
			upvote({ id }).catch((err) => showNotification(err.message));
		},
	},
	mounted() {
		const ref = firebase
			.firestore()
			.collection("requests")
			.orderBy("upvotes", "desc");

		ref.onSnapshot((snapshot) => {
			let requests = [];
			snapshot.forEach((doc) => {
				requests.push({ ...doc.data(), id: doc.id });
			});
			this.requests = requests;
		});
	},
});
