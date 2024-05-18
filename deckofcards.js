let deckId;
let zIndex = 1;

function drawCard() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No cards left in the deck. Please shuffle the deck to continue.');
            }
            return response.json();
        })
            .then(data => {
            const card = data.cards[0];
            const cardValue = card.value;
            const cardSuit = card.suit;
            const cardImage = card.image;

            // Create image element for the card
            const imageElement = document.createElement('img');
            imageElement.src = cardImage;
            imageElement.alt = `${cardValue} of ${cardSuit}`;

          // Position the card at the center of the pile
            const pileElement = document.getElementById('pile');
            const pileRect = pileElement.getBoundingClientRect();
            const randomRotation = Math.random() * 80 - 40; // Rotate the card between -40 and 40 degrees
            const randomZIndex = zIndex++; // Increment zIndex
            imageElement.style.position = 'absolute';
            imageElement.style.left = `${pileRect.left}px`;
            imageElement.style.top = `${pileRect.top}px`;
            imageElement.style.transform = `rotate(${randomRotation}deg)`;
            imageElement.style.zIndex = randomZIndex;

            // Add the card to the pile
            pileElement.appendChild(imageElement);
            
            console.log(`${cardValue} of ${cardSuit}`);

            // Disable draw card button if there are no cards left
            if (data.remaining === 0) {
                document.getElementById('drawButton').disabled = true;
                alert('No cards left in the deck. Please shuffle the deck to continue.');
            }
        })
        .catch(error => console.log(error));
}

function shuffleDeck() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(response => response.json())
        .then(data => {
            zIndex = 1;
            const pileElement = document.getElementById('pile');
            pileElement.innerHTML = '';
            console.log("Deck shuffled successfully!");
        })
        .catch(error => console.log(error));
}

window.onload = function () {
    fetch('https://deckofcardsapi.com/api/deck/new/')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            console.log("New deck created successfully!");
        })
        .catch(error => console.log(error));
}