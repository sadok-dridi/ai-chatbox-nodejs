var sendBtn = document.getElementById("sendBtn");
var textBox = document.getElementById("textBox");
var chatContainer = document.getElementById("chatcontainer");

var user = {message:""};



function sendMessage(userMessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.innerHTML = "<span> you: </span>" +
        "<span>"+userMessage+"</span>";

    chatContainer.appendChild(messageElement);

}

function chatBoxResponse(userMessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "left";
    messageElement.innerHTML = "<span> ChatBot: </span>" +
        "<span>"+userMessage+"</span>";

    chatContainer.appendChild(messageElement);
}

sendBtn.addEventListener("click", function (e) {

    var userMessage = textBox.value ;


    if (userMessage == "") {
        alert('Please enter a message');
    }else {
        let userMessageText = userMessage.trim();
        user.message = userMessageText;
        textBox.value = "";
        sendMessage(userMessageText);
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessageText })
        })
            .then(response => response.json())
            .then(data => {
                chatBoxResponse(data.reply);
            })
            .catch(error => {
                chatBoxResponse("Error: couldn't contact AI.");
            });

    }
})
