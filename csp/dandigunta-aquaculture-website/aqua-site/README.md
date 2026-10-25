# Dandigunta Aquaculture Study

A static website for a group field study of aquaculture practices, problems, and solutions in Dandigunta Village, Nellore District, Andhra Pradesh.

## Run the website

No installation or build step is needed.

### Open directly

Open `index.html` in a web browser.

### Run with a local server

From this folder, run:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Press `Ctrl+C` in the terminal to stop the server.

Alternatively, open this folder in VS Code and use the Live Server extension to launch `index.html`.

## Project files

- `index.html` — page structure and study content
- `style.css` — layout and visual styles
- `script.js` — interactive practice stages, problem filters, and pond observation records
- `images/` — field visit photographs

Pond records are saved in the browser's local storage on the device where they are entered. Use **Export CSV** on the page to download a copy.
