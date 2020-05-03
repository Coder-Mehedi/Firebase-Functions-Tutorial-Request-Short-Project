const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// http request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
	const number = Math.round(Math.random() * 100);
	res.send(number.toString());
});

// http callable function
exports.sayHello = functions.https.onCall((data, context) => {
	return `hello, ${data.name}`;
});
