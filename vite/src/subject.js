// Add event listeners to the cards
document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', (event) => {
        const topic = card.dataset.topic;
        if (topic === 'cube') {
            showModal(
                'Cube',
                '../math/cube.png',
                '../matharmarker/cubearmarker.png',
                'A cone is a three-dimensional geometric shape that tapers smoothly from a flat base to a point called the apex or vertex. It is commonly used in mathematics, physics, and everyday objects.'
            );
        }
    });
});

// Modal logic
const modal = document.getElementById('modal');
const closeModalButton = modal.querySelector('.close-btn');

function showModal(title, img1, img2, description) {
    document.getElementById('modal-title').textContent = title;
    modal.querySelector('.modal-images img:nth-child(1)').src = img1;
    modal.querySelector('.modal-images img:nth-child(2)').src = img2;
    document.getElementById('modal-description').textContent = description;
    modal.classList.add('show');
}

closeModalButton.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Hide modal on clicking outside content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});
