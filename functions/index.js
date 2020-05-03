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
