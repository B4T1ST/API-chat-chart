import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust URL accordingly

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
        try {
            await fetch('http://localhost:3001/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            setInputMessage('');
        }   catch (error){
        console.error('Error sanding message: ', error);
        }
    }
    alert('Mesagem enviada com sucesso!');
  };

  return (
    <div>
        <div>
            {/* Mapeia as mensagens*/}
            {messages.map((message, index) => (
                <div key={index}>{message}</div>
            ))}
        </div>
        <div>
            {/*Campo de entrada*/}
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                  color:'#000000',
                  backgroundColor: '#FFFFFF',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
            />
            {/*botao de enviar*/}
            <button onClick={handleSendMessage} style={{
              position:"fixed",
              top:"400px",
              left:"50%",
              transform:"translate(-50%)",
              marginTop:"1rem",
              backgroundColor:"#007bff",
              color: "white",
              border: "none",
              padding:"0.5rem 1rem",
              borderRadius:"8px",
              cursor:"pointer",
              fontSize: "16px",
              }}>Send</button>
        </div>
    </div>
  );

}

export default ChatComponent;