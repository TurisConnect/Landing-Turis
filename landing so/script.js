function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


// Registro de usuario
function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;

    localStorage.setItem('userName', name);
    document.getElementById('usernameDisplay').textContent = `Bienvenido, ${name}`;
    document.getElementById('userGreeting').style.display = 'block';
    document.getElementById('navButtons').style.display = 'none';

    toggleModal('registerModal');
    document.getElementById('registerForm').reset();
}

// Inicio de sesión
function loginUser(event) {
    event.preventDefault();
    const name = localStorage.getItem('userName');

    if (name) {
        document.getElementById('usernameDisplay').textContent = `Bienvenido, ${name}`;
        document.getElementById('userGreeting').style.display = 'block';
        document.getElementById('navButtons').style.display = 'none';
    } else {
        alert("Usuario no registrado. Por favor regístrate primero.");
    }

    toggleModal('loginModal');
    document.getElementById('loginForm').reset();
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('userName');
    document.getElementById('navButtons').style.display = 'block';
    document.getElementById('userGreeting').style.display = 'none';
    document.getElementById('usernameDisplay').textContent = '';
}

// Mostrar detalles del destino
function showDestinationDetails(title, imageSrc, description) {
    document.getElementById('destinationTitle').textContent = title;
    document.getElementById('destinationImage').src = imageSrc;
    document.getElementById('destinationDescription').textContent = description;

    toggleModal('destinationModal');
}

// Manejo de creación de ítems
async function handleCreateItem(event) {
    event.preventDefault();
    const name = document.getElementById('itemName').value.trim();
    const description = document.getElementById('itemDescription').value.trim();

    if (name && description) {
        try {
            await createItem(name, description);
            alert('¡Ítem creado con éxito!');
            getAllItems();
        } catch (error) {
            alert('Error al crear el ítem.');
        }
        toggleModal('formModal');
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

const params = new URLSearchParams(window.location.search);
const title = params.get('title');
const imageSrc = params.get('image');
const description = params.get('description');

document.getElementById('destinationTitle').textContent = title;
document.getElementById('destinationImage').src = imageSrc;
document.getElementById('destinationDescription').textContent = description;


function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'flex';
}


function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


function addReview(event) {
event.preventDefault();


const title = document.getElementById('reviewTitle').value;
const text = document.getElementById('reviewText').value;


const reviewContainer = document.createElement('div');
reviewContainer.classList.add('review');


reviewContainer.innerHTML = `
<h5>${title}</h5>
<p>${text}</p>
<div class="review-actions">
    <button class="like-button" onclick="toggleLike(this)">❤️ Me gusta</button>
    <button class="comment-button" onclick="toggleComments(this)">💬 Comentar</button>
    <button class="delete-button" onclick="deleteReview(this)">🗑️ Eliminar</button>
    <span class="like-count" data-type="like-count">0 Me gusta</span>
</div>
<div class="comment-section" style="display: none;">
    <div class="comments"></div>
    <form class="comment-form" onsubmit="addComment(event, this)">
        <input type="text" placeholder="Escribe un comentario..." required>
        <button type="submit">Publicar</button>
    </form>
</div>
`;

document.querySelector('.reviews').appendChild(reviewContainer);

closeModal('reviewModal');
document.getElementById('reviewForm').reset();
}

function deleteReview(button) {
    const reviewToDelete = button.closest('.review');
    reviewToDelete.remove();
}

function toggleLike(button) {
const likeCount = button.closest('.review-actions').querySelector('[data-type="like-count"]');
let count = parseInt(likeCount.textContent) || 0;
count += 1;
likeCount.textContent = `${count} Me gusta`;
}

function toggleComments(button) {
    const commentSection = button.closest('.review').querySelector('.comment-section');
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

function addComment(event, form) {
event.preventDefault();

const commentText = form.querySelector('input').value;


const commentDiv = document.createElement('div');
commentDiv.textContent = commentText;


const review = form.closest('.review');
const commentsContainer = review.querySelector('.comments');
commentsContainer.appendChild(commentDiv);


const reviewId = review.querySelector('h5').textContent; 
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];


let reviewData = reviews.find(r => r.title === reviewId);
if (!reviewData) {
reviewData = { title: reviewId, comments: [] };
reviews.push(reviewData);
}

reviewData.comments.push(commentText);
localStorage.setItem('reviews', JSON.stringify(reviews));

form.reset();
}

function loadReviews() {
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

reviews.forEach(reviewData => {
const reviewContainer = document.createElement('div');
reviewContainer.classList.add('review');

reviewContainer.innerHTML = `
    <h5>${reviewData.title}</h5>
    <div class="review-actions">
        <button class="like-button" onclick="toggleLike(this)">❤️ Me gusta</button>
        <button class="comment-button" onclick="toggleComments(this)">💬 Comentar</button>
        <button class="delete-button" onclick="deleteReview(this)">🗑️ Eliminar</button>
        <span class="like-count" data-type="like-count">0 Me gusta</span>
    </div>
    <div class="comment-section" style="display: none;">
        <div class="comments"></div>
        <form class="comment-form" onsubmit="addComment(event, this)">
            <input type="text" placeholder="Escribe un comentario..." required>
            <button type="submit">Publicar</button>
        </form>
    </div>
`;

const commentsContainer = reviewContainer.querySelector('.comments');
reviewData.comments.forEach(commentText => {
    const commentDiv = document.createElement('div');
    commentDiv.textContent = commentText;
    commentsContainer.appendChild(commentDiv);
});

document.querySelector('.reviews').appendChild(reviewContainer);
});
}

window.addEventListener('DOMContentLoaded', loadReviews);

window.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('userName');
    if (name) {
        document.getElementById('usernameDisplay').textContent = `Bienvenido, ${name}`;
        document.getElementById('userGreeting').style.display = 'block';
        document.getElementById('navButtons').style.display = 'none';
    }
    loadReviews(); 
});

// Manejo de creación de ítems
function handleCreateItem(event) {
    event.preventDefault();
    const name = document.getElementById('itemName').value.trim();
    const description = document.getElementById('itemDescription').value.trim();

    if (name && description) {
        createItem(name, description).then(() => {
            alert('¡Ítem creado con éxito!');
            getAllItems();
        });
        toggleModal('formModal');
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

async function createItem(name, description) {
    try {
        const response = await fetch('https://localhost:7217/api/Items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al crear el item:', error);
        alert('Hubo un error al crear el item.');
    }
}


// Simula la obtención de ítems del servidor
function getAllItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    const items = [
        { id: 1, name: "Item 1", description: "Descripción 1" },
        { id: 2, name: "Item 2", description: "Descripción 2" },
    ];

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}: ${item.description}`;
        itemList.appendChild(listItem);
    });

    document.getElementById('actionButtons').classList.add('vertical');
}

// Actualización de ítems
function promptUpdate() {
    const id = prompt('Ingrese el ID del ítem a actualizar:');
    if (id) {
        document.getElementById('editItemId').value = id;
        document.getElementById('editItemName').value = `Nombre Item ${id}`;
        document.getElementById('editItemDescription').value = `Descripción Item ${id}`;
        toggleModal('editFormModal');
    }
}

// Manejo de actualización de ítems
function handleEditItem(event) {
    event.preventDefault();
    const id = document.getElementById('editItemId').value.trim();
    const name = document.getElementById('editItemName').value.trim();
    const description = document.getElementById('editItemDescription').value.trim();

    if (id && name && description) {
        updateItem(id, name, description).then(() => {
            alert('¡Ítem actualizado con éxito!');
            getAllItems();
        });
        toggleModal('editFormModal');
    } else {
        alert('Todos los campos son obligatorios.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        getAllItems();
    } catch (error) {
        console.warn("Error al cargar ítems inicialmente:", error);
    }
});

document.getElementById('item-list').innerHTML = '';

// Eliminación de ítems
function promptDeleteItem() {
    toggleModal('deleteFormModal');
}

function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    const button = document.getElementById('showFormButton');

    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
        button.textContent = 'Ocultar Formulario';
    } else {
        formContainer.style.display = 'none';
        button.textContent = 'Mostrar Formulario';
    }
}

// Función para abrir/cerrar modales
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function(event) {
    const modal = document.getElementById('formModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

function editItem(id, currentName, currentDescription) {
    // Prellenar el formulario con los datos actuales del ítem
    const idField = document.getElementById('editItemId');
    const nameField = document.getElementById('editItemName');
    const descField = document.getElementById('editItemDescription');

    idField.value = id;
    nameField.value = currentName;
    descField.value = currentDescription;

    // Abrir el modal
    toggleEditModal();
}

function editItem(id, currentName, currentDescription) {
    // Asignar valores a los campos del modal
    document.getElementById('editItemId').value = id || ''; 
    document.getElementById('editItemName').value = currentName || ''; 
    document.getElementById('editItemDescription').value = currentDescription || ''; 

    toggleEditModal();
}

function toggleEditModal() {
    const modal = document.getElementById('editFormModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

async function updateItem(id, name, description) {
    try {
        const response = await fetch(`https://localhost:7217/api/Items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, description }),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al actualizar item:', error);
        alert('Hubo un error al actualizar el item.');
    }
}

function toggleDeleteModal() {
    const modal = document.getElementById('deleteFormModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Manejo de eliminación de ítems
function handleDeleteItem(event) {
    event.preventDefault();
    const id = document.getElementById('deleteItemId').value.trim();

    if (id) {
        deleteItem(id).then(() => {
            alert('¡Ítem eliminado con éxito!');
            getAllItems();
        });
        toggleModal('deleteFormModal');
    } else {
        alert('Por favor, ingresa un ID válido.');
    }
}


async function deleteItem(id) {
    try {
        const response = await fetch(`https://localhost:7217/api/Items/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al eliminar item:', error);
        alert('Hubo un error al eliminar el item.');
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', getAllItems);
