// --- Element References ---
// Get the "Create" button, color input, and the container for notes.
const createBtn = document.getElementById('createBtn')   // Button to create a new note
const color = document.getElementById('color')           // Input for choosing note border color
const list = document.getElementById('list')             // Container to hold all notes

console.log(createBtn); // Log the create button to ensure it exists (should not be null)

// --- Creating a New Note ---
// When the create button is clicked, a new note is created.
createBtn.onclick = () => {
    let newNote = document.createElement('div')         // Create a new div for the note
    newNote.classList.add('note')                         // Add a CSS class for styling

    // Define the HTML content of the note, including a close button and a textarea.
    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
      placeholder="Write content....."
      rows="10" cols="30"></textarea>`

    // Set the note's border color based on the chosen color.
    newNote.style.borderColor = color.value

    // Add the new note to the container so it appears on the page.
    list.appendChild(newNote)
}

// --- Removing a Note ---
// Listen for click events on the document.
document.addEventListener('click', (e) => {
    // If the clicked element has the class "close", it is the close button.
    if(e.target.classList.contains('close')){
        // Remove the note (the parent element of the close button).
        e.target.parentNode.remove()
    }
})

// --- Dragging a Note ---
// Variables to store the initial cursor and note positions when dragging starts.
let cursor = {
    x: null,
    y: null
}

let note = {
    dom: null,  // The note element being dragged
    x: null,    // Its starting left position
    y: null     // Its starting top position
}

// When the mouse button is pressed down...
document.addEventListener('mousedown', (e) => {
    // Check if the target is a note.
    if(e.target.classList.contains('note')){
        // Save the starting cursor position.
        cursor = {
            x: e.clientX,
            y: e.clientY
        }

        // Save the note's element and its starting position on the screen.
        note = {
            dom: e.target,
            x: e.target.getBoundingClientRect().left,
            y: e.target.getBoundingClientRect().top
        }
        console.log(note);  // Log the note info for debugging
    }
})

// When the mouse moves...
document.addEventListener('mousemove', (e) => {
    // Only run if a note is currently being dragged.
    if(note.dom == null) return;

    // Calculate the current cursor position.
    let currentCursor = {
        x: e.clientX,
        y: e.clientY
    }

    // Calculate how far the cursor has moved since the drag started.
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }

    // Update the note's position based on its starting position plus the movement.
    note.dom.style.left = (note.x + distance.x) + 'px'
    note.dom.style.top = (note.y + distance.y) + 'px'
    note.dom.style.cursor = 'grab' // Change cursor style to indicate dragging
})

// When the mouse button is released...
document.addEventListener('mouseup', (e) => {
    // If no note is being dragged, do nothing.
    if(note.dom == null) return;
    // Reset the cursor style to default.
    note.dom.style.cursor = 'auto'
    // Clear the note variable to end the dragging action.
    note.dom = null
})
