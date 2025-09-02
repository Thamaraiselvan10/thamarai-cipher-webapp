document.addEventListener('DOMContentLoaded', () => {
    const alphabet = 'tjqifxuwvscbkyeldgohmrpanz'; // Custom alphabet

    const messageInput = document.getElementById('message');
    const shiftInput = document.getElementById('shift');
    const encryptButton = document.getElementById('encrypt');
    const decryptButton = document.getElementById('decrypt');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    function caesarCipher(text, shift, direction) {
        let result = "";
        shift = shift % 26;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const lowerChar = char.toLowerCase();
            const charIndex = alphabet.indexOf(lowerChar);

            if (charIndex !== -1) {
                let newIndex;
                if (direction === 'encrypt') {
                    newIndex = (charIndex + shift) % 26;
                } else {
                    newIndex = (charIndex - shift + 26) % 26;
                }
                
                // Preserve case
                result += (char === lowerChar) ? alphabet[newIndex] : alphabet[newIndex].toUpperCase();
            } else {
                result += char; // Keep non-alphabetic characters
            }
        }
        return result;
    }

    function displayResult(title, text) {
        resultTitle.textContent = title;
        resultText.textContent = text;

        // Reset animation
        resultText.classList.remove('animate');
        void resultText.offsetWidth; // Trigger reflow to restart animation
        resultText.classList.add('animate');
    }

    encryptButton.addEventListener('click', () => {
        const text = messageInput.value;
        const shift = parseInt(shiftInput.value);
        if (text && !isNaN(shift)) {
            const encryptedText = caesarCipher(text, shift, 'encrypt');
            displayResult("Encrypted Message:", encryptedText);
        } else {
            displayResult("Error:", "Please enter a valid message and shift number.");
        }
    });

    decryptButton.addEventListener('click', () => {
        const text = messageInput.value;
        const shift = parseInt(shiftInput.value);
        if (text && !isNaN(shift)) {
            const decryptedText = caesarCipher(text, shift, 'decrypt');
            displayResult("Decrypted Message:", decryptedText);
        } else {
            displayResult("Error:", "Please enter a valid message and shift number.");
        }
    });
});