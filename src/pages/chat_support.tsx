import React from 'react';
import ChatComponent from './components/ChatComponent ';
import styles from './css/novinho.module.css' // Importe os estilos

function ChatPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Chat de Suporte</h1>
      </header>
      <div className={styles.chatContainer}>
        <ChatComponent /> {/* Renderize o componente do chat */}
      </div>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Chat de Suporte</p>
      </footer>
    </div>
  );
}

export default ChatPage;
