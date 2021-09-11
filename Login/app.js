// const db = firebase.database();
// const ref = db.ref('signup');


// let arr = [];
// // Attach an asynchronous callback to read the data at our posts reference
// // ref.on('value', (snapshot) => {
// //   console.log(snapshot.val());
// // }, (errorObject) => {
// //   console.log('The read failed: ' + errorObject.name);
// // }); 

// ref.on('child_added', (snapshot) => {
//     // console.log(snapshot.key);
//     const newPost = snapshot.val();
//     newPost.id = snapshot.key;
//     arr.push(newPost);
//     console.log(arr);
// });

// loginEmail = document.getElementById("email");
// loginPassword = document.getElementById("password");


// let flag = false;

// function login() {
//     for (let i = 0; i < arr.length; i++) {
//         const email = arr[i]["email"];
//         const password = arr[i]["password"];
//         console.log(email, password);
//         if (email === loginEmail.value && password === loginPassword.value) {
//             flag = true;
//             localStorage.setItem("juPWFLNnew", arr[i]["id"]);
//         }
//         else {

//         }

//     }
//     if (flag) {
//         window.location.replace("../index.html");

//     }
//     else {
//         alert("Incorrect User or Password");
//     }
// }
const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            window.location.replace("./index.html")
            // console.log(user);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}