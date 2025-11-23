import './styles/style.css';

// Get DOM elements
const imageInput = document.getElementById('imageInput');
const attachButton = document.getElementById('attachButton');
const sendButton = document.getElementById('sendButton');
const imagePreview = document.getElementById('imagePreview');
const messagesArea = document.getElementById('messagesArea');
const clearButton = document.getElementById('clearButton');

let selectedImage = null;

// Handle attach button click
attachButton.addEventListener('click', () => {
    imageInput.click();
});

// Handle image selection
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedImage = file;
        displayImagePreview(file);
    }
});

// Display image preview
function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
            <button class="remove-image" title="Remove image">×</button>
        `;
        
        // Add remove functionality
        const removeBtn = imagePreview.querySelector('.remove-image');
        removeBtn.addEventListener('click', removeImage);
    };
    reader.readAsDataURL(file);
}

// Remove image
function removeImage() {
    selectedImage = null;
    imagePreview.innerHTML = '';
    imageInput.value = '';
}

// Handle send button
sendButton.addEventListener('click', () => {
    if (selectedImage) {
        addMessage('user', selectedImage);
        removeImage();
        
        // Simulate bot response
        setTimeout(() => {
            addMessage('bot', 'Image received! Processing your grocery receipt...');
        }, 500);
    }
});

// Handle clear button
clearButton.addEventListener('click', () => {
    messagesArea.innerHTML = '<!-- Output will be displayed here -->';
    removeImage();
});

// Add message to chat
function addMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (content instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            messageDiv.innerHTML = `
                <div>Uploaded image:</div>
                <img src="${e.target.result}" alt="Uploaded">
            `;
        };
        reader.readAsDataURL(content);
    } else {
        messageDiv.textContent = content;
    }
    
    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}
