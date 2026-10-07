# QuickNotes

QuickNotes is a lightweight, responsive web application designed for creating, organizing, and searching personal notes quickly and effectively.

## Features
- **Add Notes**: Create notes with custom text and distinct categories (Personal, Work, Study).
- **Validation**: Ensures notes are not empty and stay within a 200-character limit.
- **Search Notes**: Live real-time search filtering by note contents.
- **Data Persistence**: Stores notes in `localStorage` so content persists across page reloads.
- **Responsive Layout**: Mobile-friendly design that switches from side-by-side to stacked layout on screens smaller than 600px.
- **Clear All**: Optional one-click button to purge all notes with confirmation prompt.

## How to Run Locally
1. Clone this repository or download the source code files.
2. Open the project root folder.
3. Open `index.html` directly in any web browser (or serve using VS Code Live Server).

## What I Learned
1. Using `createElement` and `textContent` instead of `innerHTML` ensures user inputs are securely handled without exposure to Cross-Site Scripting (XSS) vulnerabilities.
2. Implementing `localStorage` with `JSON.stringify` and `JSON.parse` allows web applications to retain state seamlessly between browser sessions.
3. Building responsive Flexbox layouts with `@media (max-width: 600px)` ensures dynamic control layout scaling across different viewport sizes.
   ## Future Improvements
- Add dark mode toggle support.
- Support category filtering in addition to search.
