const express = require('express');

const app = express();

const api_routes = require('./controllers/api_routes');

const PORT = 3333;

// Import db connection
const db = require('./config/connection');



// Allow json to be sent by client
app.use(express.json());

app.use('/', api_routes);


app.get('*', (req, res) => {
  res.status(404).send({
    message: 'That route is incorrect',
    error: 404
  })
})

db.on('open', () => {
  console.log('db connected');
  // Start the server
  app.listen(PORT, () => console.log('Server started on %s', PORT));
})
