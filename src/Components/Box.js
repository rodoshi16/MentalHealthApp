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

        const newMessage = {sender: "User", message: userInput}
        setChatHistory(prevHistory => [...prevHistory, newMessage])
        setUserInput(""); 

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

    )

}