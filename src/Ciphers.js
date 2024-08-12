import React from "react"
import CipherCard from "./CipherCard.js"
import "./styles/Ciphers.css"



export default function Ciphers(){
    
    const [cipher, setCipher] = React.useState("Caesar")

    return (
        <div className="cipher--container"> 
            <h3>Cipher Encryption and Decryption</h3>
            <CipherCard name={cipher}/> 

            
        </div>
    )
}