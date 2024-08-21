document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const addButton = document.getElementById('add-button');

    let draggedElement = null;

    // Function to create a new card
    function createCard() {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;  // Make the card draggable

        const textarea = document.createElement('textarea');
        textarea.className = 'card-text';
        textarea.placeholder = 'Enter your text here...';

        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.textContent = 'Save';

        saveButton.addEventListener('click', () => {
            textarea.disabled = true;
            saveButton.disabled = true;
        });

        card.appendChild(textarea);
        card.appendChild(saveButton);
        cardContainer.appendChild(card);

        // Add drag-and-drop functionality
        addDragAndDropListeners(card);
    }

    // Function to add drag and drop listeners to a card
    function addDragAndDropListeners(card) {
        card.addEventListener('dragstart', (event) => {
            draggedElement = card;
            setTimeout(() => card.classList.add('dragging'), 0);
        });

        card.addEventListener('dragend', () => {
            draggedElement = null;
            card.classList.remove('dragging');
        });

        card.addEventListener('dragover', (event) => {
            event.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            const cards = [...cardContainer.querySelectorAll('.card')];
            const currentIndex = cards.indexOf(card);
            const draggedIndex = cards.indexOf(draggingCard);

            if (currentIndex > draggedIndex) {
                cardContainer.insertBefore(draggingCard, card.nextSibling);
            } else {
                cardContainer.insertBefore(draggingCard, card);
            }
        });
    }

    // Add the first card on page load
    createCard();

    // Add new card when "Add" button is clicked
    addButton.addEventListener('click', createCard);
});
