// chat.js

function sendMessage() {
    var userInput = document.getElementById('message-input').value;
    if (userInput.trim() === '') return; // Don't send empty messages
    appendMessage('User: ' + userInput, 'user');

    // Replace this with your AI logic (e.g., calling an AI service)
    var aiResponse = 'AI: Thank you for your message. An AI response would go here.';
    setTimeout(function () {
        appendMessage(aiResponse, 'ai');
    }, 500);

    document.getElementById('message-input').value = '';
}

function appendMessage(message, sender) {
    var chatOutput = document.getElementById('chat-output');
    var messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.innerHTML = message;
    chatOutput.appendChild(messageDiv);
    // Scroll to the bottom of the chat container
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
