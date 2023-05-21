import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messaging = () => {
  const [messages, setMessages] = useState(["how are you","you are id is approved"]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/messages', { message: newMessage });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
      <div class="flex h-screen">
  <div class="bg-gray-800 text-white w-64">
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-4">Inbox</h2>
      <ul class="space-y-2">
       
  <div class="bg-slate-700 rounded-lg shadow p-4">
  <ul class="space-y-4">
    <li class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User 1" />
      <div>
        <h3 class="font-medium">John Doe</h3>
      </div>
    </li>
    <li class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User 2" />
      <div>
        <h3 class="font-medium">Jane Smith</h3>
      </div>
    </li>
    <li class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User 3" />
      <div>
        <h3 class="font-medium">David Johnson</h3>
      </div>
    </li>
  </ul>
</div>

      </ul>
    </div>
  </div>
  <div class="flex flex-col flex-grow justify-end bg-gray-100 p-5 mb-9">
      <div className="messages-container ">
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <ul className="list-disc pl-6 list-none">
            {messages.map((message, index) => (
              <li key={index} className="mb-2  bg-blue-300 p-5 m-5">{message}</li>
            ))}
          </ul>
        )}
      </div>
      <form className="mt-4" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type your message..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
  </div>
     
    </div>
  );
};

export default Messaging;
