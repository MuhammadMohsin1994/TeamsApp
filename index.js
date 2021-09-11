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
const fdb = firebase.firestore();


auth.onAuthStateChanged((user) => {
    if (user) {
        setTeams();
        setPartMember();
        document.getElementById("name").innerHTML = user.displayName;
    }
    else {
        firebase.auth().signOut().then(() => {
        })
        window.location.replace("./Login.html")
    }
})

const addTeam = () => {
    window.location.replace("./AddTeam.html");
}

function logout() {
    firebase.auth().signOut().then(() => {
    })
}

yourTeams = document.getElementById("yourTeams");

const yourOwn = [];
const setTeams = () => {
    const databaseRef = db.ref('teams');
    databaseRef.on('child_added', (data) => {
        if (data.val().adminUid === auth.currentUser.uid) {
            yourOwn.push(data.val().teamName);
            let other = "others";
            if (data.val().members.length <= 1) {
                other = "other";
            }
            // createDiv(yourTeams,"div");
            createDiv(yourTeams, "p", data.val().teamName, "You, " + data.val().members.length + " " + other);
            // createDiv(yourTeams, "span", "You, " + data.val().members.length + " " + other);
            openChat();
        }
    });
};


const createDiv = (mainDiv, tag, txt = null, spanText) => {
    const div = document.createElement("div");
    const childSpan = document.createElement(tag);
    const span = document.createElement("span");
    const braekLine = document.createElement("br");
    childSpan.innerHTML = txt;
    span.innerHTML = spanText;
    div.appendChild(childSpan);
    div.appendChild(braekLine);
    div.appendChild(braekLine);
    div.appendChild(span);
    mainDiv.appendChild(div);
}

const setPartMember = () => {
    const databaseRef = db.ref('teams');
    databaseRef.on('child_added', (data) => {
        const getData = data.val();
        let arr = [];
        arr = getData.members;
        const arrLen = arr.length;

        arr.forEach(i => {
            if (i === auth.currentUser.email) {
                let other = "others";
                if (arrLen <= 1) {
                    other = "other";
                }
                createDiv(teamMember, "p", getData.teamName, "You and " + arrLen + " " + other);
                // createDiv(teamMember, "span", )
            }
        });
    });
}

let openChat = () => {
    for (let i = 0, len = yourTeams.getElementsByTagName("p").length; i < len; i++) {
        (function (index) {
            yourTeams.getElementsByTagName("p")[i].onclick = function () {
                localStorage.setItem("nkjcBcnCc", yourTeams.getElementsByTagName("p")[index].innerText);
                window.location.replace("./Team/OwnerView.html");
            }
        })(i);
    }
}
