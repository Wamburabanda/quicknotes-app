// Select DOM elements using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const noteCount = document.querySelector('#note-count');
const notesList = document.querySelector('#notes-list');
const clearAllBtn = document.querySelector('#clear-all-btn');

// Load stored notes or initialize empty array
let notes = JSON.parse(localStorage.getItem('quicknotes_data')) || [];

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('quicknotes_data', JSON.stringify(notes));
}

// Render count text according to requirement rules
function updateNoteCount(filteredCount) {
  if (filteredCount === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (filteredCount === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${filteredCount} notes.`;
  }
}

// Render the list of notes safely using createElement and textContent
function render() {
  notesList.textContent = '';
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filter notes based on search
  const filteredNotes = notes.filter(note => 
    note.text.toLowerCase().includes(searchTerm)
  );

  updateNoteCount(filteredNotes.length);

  if (filteredNotes.length === 0 && notes.length > 0) {
    const noResultsP = document.createElement('p');
    noResultsP.className = 'no-notes-msg';
    noResultsP.textContent = 'No notes match your search.';
    notesList.appendChild(noResultsP);
    return;
  }

  filteredNotes.forEach(note => {
    // Note list item (card)
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Left container for details
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'note-details';

    // Note text element (using textContent for safety)
    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;

    // Metadata container (Category Badge & Timestamp)
    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'category-badge';
    badgeSpan.textContent = note.category;

    const timeSpan = document.createElement('span');
    timeSpan.textContent = note.createdAt;

    metaDiv.appendChild(badgeSpan);
    metaDiv.appendChild(timeSpan);

    detailsDiv.appendChild(textP);
    detailsDiv.appendChild(metaDiv);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    // Append components to card
    li.appendChild(detailsDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// Add Note Handler
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const textValue = noteInput.value.trim();

  // Validation checks
  if (textValue === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  if (textValue.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  // Clear validation errors
  errorMessage.textContent = '';

  const newNote = {
    id: Date.now().toString(),
    text: textValue,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  saveNotes();
  render();

  // Reset input field
  noteInput.value = '';
});

// Delete Note Handler
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render();
}

// Search Handler
searchInput.addEventListener('input', render);

// Bonus: Clear All Notes with confirmation prompt
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    if (notes.length === 0) return;
    if (confirm('Delete all notes?')) {
      notes = [];
      saveNotes();
      render();
    }
  });
}

// Initial Render on Load
render(); 
// Updated validation and search).
