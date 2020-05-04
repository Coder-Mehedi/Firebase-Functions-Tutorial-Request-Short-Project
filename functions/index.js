const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Auth Trigger (New User Signup)
exports.newUserSignup = functions.auth.user().onCreate((user) => {
	// for background trigger you must return a value/promise
	return admin.firestore().collection("users").doc(user.uid).set({
		email: user.email,
		upvotedOn: [],
	});
});

// Auth Trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
	// for background trigger you must return a value/promise
	const doc = admin.firestore().collection("users").doc(user.uid);
	return doc.delete();
});

// http callable function (adding a request)
exports.addRequest = functions.https.onCall((data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			"unauthenticated",
			"only authenticated users can add requests"
		);
	}
	if (data.text.length > 30) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"request must be no more than 30 characters long"
		);
	}
	return admin.firestore().collection("requests").add({
		text: data.text,
		upvotes: 0,
	});
});
