# httpfsJS
A file upload client+server written in vanilla JS (ES6) and NodeJS.
In the time being, vanilla means no web framework (no ExpressJS, no React/Angular),
and no npm packages except MongoDB related.

## How to run
```
git clone https://github.com/luzushka/httpfsJS
cd httpfsJS
node index
```

### To do list:
- [X] Simple HTML + JS interface that reads files
- [X] Simple NodeJS http server that serves static files
- [X] Change promise-based fileIO.js to stream-based
- [ ] Add write function to fileIO.js
- [ ] Add MongoDB for users
- [ ] Handle user sessions
- [ ] Add GridFS for files
- [ ] Generate file access links
- [ ] Style site with CSS & JS
