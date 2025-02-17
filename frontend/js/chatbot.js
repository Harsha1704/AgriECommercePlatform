
const chatContainer = document.getElementById('chat');
const chatInput = document.createElement('input');
const sendButton = document.createElement('button');


function initChat() {
    chatContainer.innerHTML = '';
    chatInput.type = 'text';
    chatInput.placeholder = 'Type your message...';
    sendButton.textContent = 'Send';
    chatContainer.appendChild(chatInput);
    chatContainer.appendChild(sendButton);
    sendButton.addEventListener('click', sendMessage);
}


function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatInput.value = '';
      
        sendMessageToBackend(message);
    }
}

function sendMessageToBackend(message) {
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        const responseElement = document.createElement('div');
        responseElement.textContent = data.response;
        chatContainer.appendChild(responseElement);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', initChat);
