const firebaseConfig = {
    apiKey: "AIzaSyD4aXh6VqOUlzwAxCcNi7AMvXoZe3JF8vk",
    authDomain: "teamswebapp.firebaseapp.com",
    databaseURL: "https://teamswebapp-default-rtdb.firebaseio.com",
    projectId: "teamswebapp",
    storageBucket: "teamswebapp.appspot.com",
    messagingSenderId: "291265260112",
    appId: "1:291265260112:web:4b834e9bb98567c912ff55"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
        console.log(user.uid);
        // const obj = {
        //     email: user.email,
        //     displayName: user.displayName,
        //     uid: user.uid
        // }
        // // localStorage.setItem("jAnkjnakjcb",JSON.stringify(obj));
        // document.getElementById("name").innerHTML = user.displayName;
    }
    else {
        window.location.replace("./Login.html")
    }
})

teamName = document.getElementById("teamName");
memberDiv = document.getElementById("memberDiv");

const arr = [];

const addMember = () => {
    email = document.getElementById("member_Email");
    if (email.value === "") {
        email.focus();
    }
    else {
        console.log(email.value);
        const childSpan = document.createElement('span');
        // const breakLine = document.createElement('br');
        childSpan.innerHTML = email.value + " ";
        arr.push(email.value);
        email.value = "";

        memberDiv.appendChild(childSpan);

    }
}

const createTeam = () => {

    const team = db.ref("teams");
    team.push({
        teamName: teamName.value,
        adminName: auth.currentUser.displayName,
        adminEmail: auth.currentUser.email,
        adminUid: auth.currentUser.uid,
        members: arr

    }).then(() => {
        console.log("Document written");
        window.location.replace("./index.html")
    }).catch((error) => {
        console.error("Error adding document: ", error);
        alert(error);
    });

}

const back = () => {
    window.location.replace("./index.html");
}


// const createTeam = (data) => {

// }