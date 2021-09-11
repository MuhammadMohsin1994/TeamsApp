// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const auth = firebase.auth();
const db = firebase.database();


fullName = document.getElementById("name");
email = document.getElementById("email");
password = document.getElementById("password");
warning = document.getElementById("warning");

function saveDetail() {
    console.log(fullName, email, password);
    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);

            // let users = {
            //     uid: user.uid,
            //     userName: fullName.value,
            //     userEmail: email.value,
            // }
            // db.collection("users").doc(uID).set(users);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            warning.innerHTML = errorMessage;
            // ..
        });
    auth.onAuthStateChanged(function (user) {
        if (user) {

            // Updates the user attributes:

            user.updateProfile({ // <-- Update Method here
                displayName: fullName.value
            }).then(function () {
                // var displayName = user.displayName;
                window.location.replace("../Login.html")

            }, function (error) {
                // console.log(error)
            });

        }
    });

    // const data = {
    //     fullName: fullName.value,
    //     email: email.value,
    //     password: password.value
    // }
    // try {
    //     const postListRef = firebase.database().ref('signup');
    //     const newPostRef = postListRef.push();
    //     newPostRef.set(data);
    //     console.log("Successfully Saved");
    //     window.location.replace("./Login.html");
    // } catch (e) {
    //     alert("Something went wrong, Please try later. ")
    // }

}