const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.send('Hello, world!');
  });


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});