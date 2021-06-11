import * as signalR from "@microsoft/signalr";



const messageForm =  document.getElementById('message-form');
const messageBox = document.getElementById('message-box');
const messages = document.getElementById('messages');
    
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .configureLogging(signalR.LogLevel.Information)
        .build();
        
    connection.on('newMessage', (sender, messageText) => {
        console.log(`${sender}:${messageText}`);
        
        const newMessage = document.createElement('li');
        newMessage.appendChild(document.createTextNode(`${sender}:${messageText}`));
        messages.appendChild(newMessage);
    });
    
    connection.start()
        .then(() => console.log('connected!'))
        .catch(console.error);
        
    messageForm.addEventListener('submit', ev => {
        ev.preventDefault();
        const message = messageBox.value;
        connection.invoke('SendMessage', message);
        messageBox.value = '';
    });