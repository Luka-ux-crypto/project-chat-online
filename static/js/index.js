/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-const-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const app = () => {
  const socket = io('http://localhost:3000/chat');

  // Получаем ссылки на DOM-элементы
  const msgInput = document.querySelector('.messages-input');
  const msgList = document.querySelector('.messages-list');

  const sendBtn = document.querySelector('.send-btn');
  const usernameInput = document.querySelector('.username-input');

  const messages = [];

  // Функция для получения сообщений с сервера
  const getMessages = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/chat');
      renderMessages(data);
      messages.push(...data);
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error.message);
    }
  };

  void getMessages();

  const handleSendMessage = (text) => {
    if (!text.trim()) {
      return;
    }
    sendMessage({
      username: usernameInput.value || 'Anonymous',
      text,
      createdAt: new Data(),
    });
    msgInput.value = '';
  };

  msgInput.addEventListener(
    'keydown',
    (e) => e.keyCode === 13 && handleSendMessage(e.target.value),
  );
  sendBtn.addEventListener('click', () => handleSendMessage(msgInput.value));
  const renderMessages = (data) => {
    let message = '';
    data.forEach(
      (message) =>
        (messages += `
        <li class="bg-dark p-2 rounded mb-2 d-flex justify-content-between message">
          <div class="mr-2">
            <span class="text-info">${message.username}</span>
            <p class="text-light">${message.text}</p>,
            
          </div>
          <span class="text-muted text-right date">
          ${new data(message.createdAt).toLocalString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
          </span>
        </li>`),
    );
    void getMessages();
    msgList.innerHTML = messages;
  };
  const sendMessage = (message) => socket.emit('sendMessage', message);
  socket.on('recMessage', (message) => {
    message.push(message);
    renderMessages(messages);
  });
};

app();
