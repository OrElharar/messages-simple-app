import React, { useEffect, useState } from 'react';
import { getMessagesFromDB, postMessageOnDB } from './dataBase/messagesRequests';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const renderMessages = () => {
    getMessagesFromDB()
      .then((res) => {
        setErrorMessage("")
        setMessages(res)
      }).catch((err) => {
        setErrorMessage(err.message)

      })
  }

  useEffect(() => {
    renderMessages()
  }, []);

  const onBlurTextarea = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue === "")
      return
    setTextInput(inputValue);
    e.target.value = "";
  }

  const onClickUploadBtn = () => {
    if (textInput === "")
      return
    postMessageOnDB({ content: textInput })
      .then((res) => {
        const messagesCopy = [...messages]
        setMessages(messagesCopy.concat(res))
      }).catch((err) => {
        setErrorMessage("Server error.")
      })
    setTextInput("")
  }

  return (
    <div className="messages-app">
      <div className="add-new-message-section">
        <div>Add new message:</div>
        <textarea onBlur={onBlurTextarea} />
        <div>
          <button onClick={onClickUploadBtn}>Upload</button>
        </div>
      </div>
      <div className="messages-container">
        <h2>Messages</h2>
        {messages.map((message, i) => (
          <div key={"message" + i}>
            {message.content}
          </div>
        ))}
      </div>
      {errorMessage !== "" && <div>{errorMessage}</div>}
    </div>
  );
}

export default App;
