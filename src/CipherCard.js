import React from "react"
import Decrypt from "./Decrypt.js"
import Encrypt from "./Encrypt.js"
import "./styles/CipherCard.css"

export default function CipherCard(props){
    
    const [inputText, setInputText] = React.useState("") // input form text
    const [inputKey, setInputKey] = React.useState("") // input form key
    const [inputKey2, setInputKey2] = React.useState("") // second input form key
    const [outputText, setOutputText] = React.useState("") // output form text
    const [isDropped, setIsDropped] = React.useState(false)
    const [cipherName, setCipherName] = React.useState("Caesar")

    // TO DO
    // working out bugs for remaining ciphers
    // not showing errors if key input is not valid (before submission), highlighting red around if empty when try to encrypt or decrypt
    // text options for output. to upper / to lower. Should be fairly simple implementation. Just a checkbox. Like other site. 

    // TO DO (MUCH LATER)
    // some history or description of how each one works (later) so that people know what is happening behind the scenes. 
    // Brute force output -> coming up with scores and top 10 most likely candidates for the cipher. (list these out on the side or below...)

    function Encryption(cipherName, inputText, inputKey, inputKey2){
        setOutputText(Encrypt(cipherName, inputText, inputKey, inputKey2))
    }

    function Decryption(cipherName, inputText, inputKey, inputKey2){
        setOutputText(Decrypt(cipherName, inputText, inputKey, inputKey2))
    }
     
    function onInputTextChange(event){
        setInputText(event.target.value)
    }

    function onInputKeyChange(event){
        setInputKey(event.target.value)
    }

    function onInputKey2Change(event){
        setInputKey2(event.target.value)
    }

    function onOutputTextChange(event){
        setOutputText(event.target.value)
    }

    function toggleDropdown(){
        setIsDropped(!isDropped)
    }

    window.onclick = function(event) { // hide dropdown when click anywhere else
        if(!event.target.matches(".dropdown--button")) {
            setIsDropped(false)
        }
    }

    const dropDown = (
        <ul className="dropdown--content">
            <li className="dropdown--list" onClick={() => setCipherName('Caesar')}>Caesar Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Vigenere')}>Vigenere Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Atbash')}>Atbash Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('ADFGVX')}>ADFGVX Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Bifid')}>Bifid Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Four Square')}>Four Square Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('ADFGX')}>ADFGX Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Trifid')}>Trifid Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('One Time Pad')}>One Time Pad Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Rail Fence')}>Rail Fence Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Columnar Transposition')}>Columnar Transposition Cipher</li>
            <li className="dropdown--list" onClick={() => setCipherName('Playfair')}>Playfair Cipher</li>
        </ul>
    )

    return (
            <div className="cipher--card">
                <div className="title--container">
                    <h5 className="title--item">{cipherName} Cipher</h5>  
                    <button className="title--item dropdown--button" onClick={toggleDropdown}>
                        Select Cipher
                        {isDropped && dropDown}
                    </button>
                </div>
                <textarea className="cipher--input" onChange={onInputTextChange} value={inputText}></textarea>
                <div className="button--container">
                    <button className="cipher--button" onClick={() => Encryption(cipherName, inputText, inputKey, inputKey2)}>Encrypt</button>
                    <button className="cipher--button" onClick={() => Decryption(cipherName, inputText, inputKey, inputKey2)}>Decrypt</button>
                    <div>
                        <label htmlFor="key--input" className="key--label">Key:</label>
                        <input className="key--input" id="key--input" onChange={onInputKeyChange} value={inputKey}></input>
                    </div>
                    {(cipherName == "ADFGVX" || cipherName == "ADFGX" || cipherName == "Four Square" || cipherName == "Rail Fence") && <div>
                        <label htmlFor="key--input" className="key--label">Key 2:</label>
                        <input className="key--input" id="key--input2" onChange={onInputKey2Change} value={inputKey2}></input>
                    </div>}
                    <button className="cipher--button">Brute Force</button> 
                </div>
                <h6>Output</h6>
                <textarea className="cipher--input" value={outputText} onChange={onOutputTextChange}></textarea>
            </div>
    )
}