
export default function Encrypt(name, inputText, inputKey, inputKey2){
    switch(name){
        case "Caesar":
            return EncryptCaesar(inputText, inputKey);
        case "Atbash":
            return EncryptAtbash(inputText)
        case "Vigenere":
            return EncryptVigenere(inputText, inputKey);
        case "ADFGVX":
            return EncryptCaesar(inputText, inputKey); // not done
        case "Bifid":
            return EncryptBifid(inputText, inputKey)
        case "Four Square":
            return EncryptVigenere(inputText, inputKey); // not done
        case "ADFGX":
            return EncryptCaesar(inputText, inputKey); // not done
        case "Trifid":
            return EncryptAtbash(inputText) // not done
        case "One Time Pad":
            return EncryptOTP(inputText, inputKey);
        case "Rail Fence":
            return EncryptRailFence(inputText, inputKey, inputKey2);
        case "Columnar Transposition":
            return EncryptColumnarTransposition(inputText, inputKey);
        case "Playfair":
            return EncryptPlayfair(inputText, inputKey);
        default:
            break;
    }
}


function EncryptCaesar(inputText, inputKey){
    
    const text = inputText.toUpperCase();
    const key = parseInt(inputKey)
    
    // Initialize an empty string to store the encrypted text
    let encryptedText = '';
  
    // Iterate through each character in the input text
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
  
      // Check if the character is a letter
      if (char.match(/[A-Z]/)) {
        // Get the ASCII code of the character
        const charCode = char.charCodeAt(0);
  
        // Apply the Caesar cipher encryption with the specified key
        const encryptedCharCode = ((charCode - 65 + key) % 26) + 65;
  
        // Convert the encrypted ASCII code back to a character and append to the result
        encryptedText += String.fromCharCode(encryptedCharCode);
      } else {
        // If the character is not a letter, leave it unchanged
        encryptedText += char;
      }
    }
    return encryptedText; 
}

function EncryptVigenere(inputText, inputKey) {
    inputText = inputText.toUpperCase();
    inputKey = inputKey.toUpperCase();

    let encryptedText = "";
    let keyIndex = 0;

    for (let i = 0; i < inputText.length; i++) {
        let charCode = inputText.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            let keyCharCode = inputKey.charCodeAt(keyIndex % inputKey.length);
            let encryptedCharCode = ((charCode - 65 + (keyCharCode - 65)) % 26) + 65;
            encryptedText += String.fromCharCode(encryptedCharCode);
            keyIndex++;
        } else {
            encryptedText += inputText[i];
        }
    }

    return encryptedText;
}

function EncryptAtbash(inputText) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

    let encryptedText = '';

    for (let char of inputText.toUpperCase()) {
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            encryptedText += reversedAlphabet[index];
        } else {
            encryptedText += char;
        }
    }

    return encryptedText;
}

function createKeySquare(key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let keySquare = '';
    for (let char of key + 'ABCDEFGHIKLMNOPQRSTUVWXYZ') {
        if (!keySquare.includes(char) && char !== 'J') {
            keySquare += char;
        }
    }
    return keySquare;
}

function getCoordinates(text, keySquare) {
    const coordinates = [];
    for (let char of text) {
        if (char === 'J') char = 'I';
        const index = keySquare.indexOf(char);
        if (index !== -1) {
            coordinates.push([Math.floor(index / 5), index % 5]);
        }
    }
    return coordinates;
}

function flattenCoordinates(coordinates) {
    return coordinates.reduce((acc, val) => acc.concat(val), []);
}

function transposeCoordinates(flattenedCoordinates) {
    const halfLength = Math.ceil(flattenedCoordinates.length / 2);
    const firstHalf = flattenedCoordinates.slice(0, halfLength);
    const secondHalf = flattenedCoordinates.slice(halfLength);

    const transposedCoordinates = [];
    for (let i = 0; i < firstHalf.length; i++) {
        transposedCoordinates.push([firstHalf[i], secondHalf[i]]);
    }
    return transposedCoordinates;
}

function getTextFromCoordinates(transposedCoordinates, keySquare) {
    let text = '';
    for (let pair of transposedCoordinates) {
        if (pair[0] !== undefined && pair[1] !== undefined) {
            text += keySquare[pair[0] * 5 + pair[1]];
        }
    }
    return text;
}

function EncryptBifid(inputText, inputKey) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keySquare = createKeySquare(inputKey);
    const coordinates = getCoordinates(inputText.toUpperCase(), keySquare);
    const flattenedCoordinates = flattenCoordinates(coordinates);
    const transposedCoordinates = transposeCoordinates(flattenedCoordinates);
    const encryptedText = getTextFromCoordinates(transposedCoordinates, keySquare);

    return encryptedText;
}

function EncryptOTP(inputText, inputKey) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let sanitizedKey = inputKey.replace(/\s+/g, '').toUpperCase();
    let encryptedText = '';
    let keyIndex = 0;

    for (let char of inputText.toUpperCase()) {
        if (char === ' ') {
            encryptedText += ' ';
        } else {
            const inputChar = char;
            const keyChar = sanitizedKey.charAt(keyIndex);

            if (alphabet.includes(inputChar) && alphabet.includes(keyChar)) {
                const inputIndex = alphabet.indexOf(inputChar);
                const keyIndexValue = alphabet.indexOf(keyChar);
                const encryptedIndex = (inputIndex + keyIndexValue) % 26;
                encryptedText += alphabet.charAt(encryptedIndex);
                keyIndex = (keyIndex + 1) % sanitizedKey.length;
            } else {
                encryptedText += inputChar;
            }
        }
    }

    return encryptedText;
}

function EncryptColumnarTransposition(inputText, inputKey) {
    const sanitizedText = inputText.replace(/\s+/g, '').toUpperCase();
    const sanitizedKey = inputKey.replace(/\s+/g, '').toUpperCase();

    const numCols = sanitizedKey.length;
    const numRows = Math.ceil(sanitizedText.length / numCols);
    
    let grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
    for (let i = 0; i < sanitizedText.length; i++) {
        const row = Math.floor(i / numCols);
        const col = i % numCols;
        grid[row][col] = sanitizedText[i];
    }
    
    let sortedKeyIndices = [...sanitizedKey].map((char, index) => [char, index])
                                            .sort(([a], [b]) => a.localeCompare(b))
                                            .map(([, index]) => index);
    
    let encryptedText = '';
    for (let colIndex of sortedKeyIndices) {
        for (let row = 0; row < numRows; row++) {
            if (grid[row][colIndex]) {
                encryptedText += grid[row][colIndex];
            }
        }
    }

    return encryptedText;
}

function generatePlayfairMatrix(key) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    const keySquare = [];
    const usedChars = new Set();
    
    for (let char of key + alphabet) {
        if (!usedChars.has(char)) {
            usedChars.add(char);
            keySquare.push(char);
        }
    }
    
    const matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix.push(keySquare.slice(i * 5, i * 5 + 5));
    }
    
    return matrix;
}

function createPairs(text) {
    const pairs = [];
    for (let i = 0; i < text.length; i += 2) {
        let first = text[i];
        let second = text[i + 1] || 'X';
        if (first === second) {
            second = 'X';
            i--;
        }
        pairs.push([first, second]);
    }
    return pairs;
}

function findPosition(matrix, char) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] === char) {
                return [row, col];
            }
        }
    }
    return [-1, -1];
}

function EncryptPlayfair(inputText, inputKey) {
    const sanitizedText = inputText.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    const sanitizedKey = inputKey.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    
    const matrix = generatePlayfairMatrix(sanitizedKey);
    const pairs = createPairs(sanitizedText);
    
    let encryptedText = '';
    for (let [first, second] of pairs) {
        const [firstRow, firstCol] = findPosition(matrix, first);
        const [secondRow, secondCol] = findPosition(matrix, second);
        
        if (firstRow === secondRow) {
            encryptedText += matrix[firstRow][(firstCol + 1) % 5] + matrix[secondRow][(secondCol + 1) % 5];
        } else if (firstCol === secondCol) {
            encryptedText += matrix[(firstRow + 1) % 5][firstCol] + matrix[(secondRow + 1) % 5][secondCol];
        } else {
            encryptedText += matrix[firstRow][secondCol] + matrix[secondRow][firstCol];
        }
    }
    
    return encryptedText;
}

function offsetText(text, offset) {
    return text.slice(offset) + text.slice(0, offset);
}

function EncryptRailFence(inputText, inputKey, inputKey2) {
    const sanitizedText = inputText.replace(/\s+/g, '').toUpperCase();
    const numRails = parseInt(inputKey, 10);
    const offset = parseInt(inputKey2, 10);

    if (numRails <= 1) {
        return sanitizedText;
    }

    const railFence = Array.from({ length: numRails }, () => []);
    let directionDown = false;
    let row = 0;

    for (let i = 0; i < sanitizedText.length; i++) {
        railFence[row].push(sanitizedText[i]);

        if (row === 0 || row === numRails - 1) {
            directionDown = !directionDown;
        }

        row += directionDown ? 1 : -1;
    }

    const encryptedText = railFence.flat().join('');
    return offsetText(encryptedText, offset);
}