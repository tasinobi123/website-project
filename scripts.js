// Example functionality: Lightbox for gallery
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'flex';
    lightboxImg.src = imgElement.src;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function submitEmotion(emotion) {
    alert(`You selected: ${emotion}`);
}

function submitFeedback() {
    const feedback = document.getElementById('emotionFeedback').value;
    if (feedback) {
        alert(`Thank you for sharing: "${feedback}"`);
    } else {
        alert('Please enter your feedback!');
    }
}
