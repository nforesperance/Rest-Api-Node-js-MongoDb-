const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
var cors = require('cors');
// Bodyparser Middleware
app.use(express.json());

//DB config
const url = require("./config/keys").mongoURI;

// Connect to Mongodb
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));


// Use Routes
app.use(cors());

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/espece', require('./routes/api/espece'));
app.use('/api/capteur', require('./routes/api/capteur'));
app.use('/api/mesure', require('./routes/api/mesure'));
app.use('/api/parcelle', require('./routes/api/parcelle'));
app.use('/api/actionneur', require('./routes/api/actionneur'));
app.use('/api/planaction', require('./routes/api/planaction'));
app.use('/api/plancapteur', require('./routes/api/plancapteur'));
app.use('/api/action', require('./routes/api/action'));
app.use('/api/sousespece', require('./routes/api/sousespece'));


  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
  