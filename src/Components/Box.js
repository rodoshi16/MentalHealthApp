import react, { useState } from 'react'; 
import axios from 'axios';
import sendImage from './send-4008.png'



export const ChatBox = () => {

    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]); 
    const [botResponse, setbotResponse] = useState(''); 

    const handleSendMessage = () => {
        if (userInput.trim() == ""){
            return;  
        }

        const recentText = {sender: "User", message: userInput}
        setChatHistory( prevHistory => [...prevHistory, recentText]);

        //axios is making a post request to send user's response to local host to display it 
        axios({
            url: "http://localhost:3000/mindmate", 
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
            },

            data: {
                user_Input: userInput, 
                chat_history: chatHistory, 
            }

        })
        //extracts bots message from the API response 
        .then((res) => {
            const botResponse = res.data.response; 
            const botText = {sender: "Bot", message: botResponse}; 

            setChatHistory(prevHistory => [...prevHistory, botText])
            
        })
    
        .catch((err) => {
            console.log(err); 
        })

        setUserInput("");

    }


    return (
        <div className= "Bot-container">
            <div className='Bot-header'>
                <div className='Bot-logo'>
                <img 
                    src= {"https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"} 
                    class= "Bot-logo" 
                    width= "70" 
                    height= "70"
                />
                </div>
                <div className= "Bot-title">
                    <h2>MindMate</h2>
                    <p2>I am here to listen!</p2>
                </div>
            </div>

            <div className="ChatWindow">
                {chatHistory.map((text, index) => (
                    <div
                        key={index}
                        className={text.sender === "User" ? "UserText": "BotText"}
                    >
                        {text.message}
                    </div>

                ))}

            </div>

            <div className="TypeSection">
                <input 
                type= "text"
                className= "TextBar"
                placeholder="Type your message..."
                autocomplete="on"
                value={userInput}

                onChange= {(e) => setUserInput(e.target.value)}
                ></input>

                <div className= "SendIcon" onClick= {handleSendMessage}>
                    <img
                        src={sendImage}
                    />

                </div>
            </div>
        </div>

    )

}