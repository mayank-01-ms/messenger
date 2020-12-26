// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDk0hlHcGBEfX6fPGkrz0qmzkh2O68cMHk",
    authDomain: "social-media-6bf09.firebaseapp.com",
    databaseURL: "https://social-media-6bf09.firebaseio.com",
    projectId: "social-media-6bf09",
    storageBucket: "social-media-6bf09.appspot.com",
    messagingSenderId: "959683378352",
    appId: "1:959683378352:web:0aab54c453af5cc5d28f75"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const msgRef = db.ref("/msgs"); //to store data in the msgs folder by creating a reference in database

const messagesArea = document.getElementById('messages');
const form = document.getElementById('form');
const msg = document.getElementById('msg');
const message = document.getElementById('message');

let username = '';

let init = () => {
    username = prompt("Enter your name");
}

window.addEventListener('load', init);


form.addEventListener('submit', e => {
    e.preventDefault();
    const text = message.value.trim();
    msg.innerHTML = '';

    if(!text) {
        msg.innerHTML = '* Please enter a message';
    }
    const data = {
        name: username,
        text: text
    };

    msgRef.push(data);
    message.value = "";
})

const updateMessages = data => {
    const {name, text} = data.val();
    const msg = `<li class="${name == username ? "message right": "message left"}">
                    <i class = "name">${name}: </i>${text}
                </li>`;

    messagesArea.innerHTML += msg;
    //auto scroll to bottom
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
}

msgRef.on('child_added', updateMessages);

