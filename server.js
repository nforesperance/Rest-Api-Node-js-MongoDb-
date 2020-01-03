<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

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
app.use('/api/admin', require('./routes/api/admin'));


  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
=======
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

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
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/espece', require('./routes/api/espece'));
app.use('/api/capteur', require('./routes/api/capteur'));
app.use('/api/mesure', require('./routes/api/mesure'));
app.use('/api/parcelle', require('./routes/api/parcelle'));


  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
>>>>>>> d1a667dee1fcbc760be00673deb873587b252a1e
  