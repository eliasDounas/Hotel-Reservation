const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Reservation = require('./models/reservation');
const Client = require('./models/client');
const Account = require('./models/account');
const session = require('express-session');


const app = express();
app.listen(3001);

const dbURI = "mongodb+srv://smoothcriminal5698:HCqu60DBOdHe60Pr@hotel.tglhez2.mongodb.net/Hotel?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("Connected"))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'goksqdnkqs',
    resave: false,
    saveUninitialized: true,
  }));


app.get('/', (req, res) => {
    res.render('index', { errorMessage: false, isConnected: false});
  });



app.post('/signin', async (req, res) => {
      const { uname, psw } = req.body;
      try {
        // Find the user in the database
        const user = await Account.findOne({ email: uname });
    
        if (!user || !(await bcrypt.compare(psw, user.password))) {
          // User not found or incorrect password
          return res.render('index', { errorMessage: 'Invalid username or password', isConnected: false });
        }
        req.session.userId = user._id;
        res.render('index', { errorMessage:false, isConnected: true });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
      
app.post('/signingup', async (req, res) => {
    try {
      const { customEmail, customPassword } = req.body;
      const existingUser = await Account.findOne({ email: customEmail });

      if (existingUser) {
        return res.render('index', { errorMessage: 'This Email is linked to an already existing account', isConnected: false });
    }
      const hashedPassword = await bcrypt.hash(customPassword, 10);
  
      const newAccount = new Account({
        email: customEmail,
        password: hashedPassword
      });
      
      await newAccount.save();
      const user = await Account.findOne({ email: customEmail });
        req.session.userId = user._id;
        res.render('index', { errorMessage:false, isConnected: true });

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
app.post('/', (req, res) => {
    const { checkin, checkout, promo } = req.body;

  // Render the chambres.ejs file and pass form data as variables
  if (req.session.userId) {
        res.render('chambres', { checkin, checkout, promo, userId: req.session.userId });
    } else {
        res.render('chambres', { checkin, checkout, promo, userId: "0" });
    }
  });
app.post('/chambres', (req, res) => {
    const { checkin, checkout, promo, chambre} = req.body;

    if (req.session.userId) {
      res.render('signup', { checkin, checkout, promo, chambre, userId: req.session.userId });
    } else {
      res.render('signup', { checkin, checkout, promo, chambre, userId: "0" });
  }
  });
  app.post('/confirmReservation', (req, res) => {
    const {
      checkin,
      checkout,
      promo,
      chambre,
      userId,
      firstname,
      email,
      address,
      city,
      state,
      zip
    } = req.body;

    let prix;
    if (chambre === "2 Lits Simple") {
      prix = userId === '0' ? 500 : 450;
  } else if (chambre === "Lit Double") {
      prix = userId === '0' ? 600 : 540;
  } else if (chambre === "Suite") {
      prix = userId === '0' ? 1000 : 900; 
  };

  if (promo === "SUMMER2024") {
      prix*=0.9;
    }
    const reserv = new Reservation({
        checkin: new Date(checkin),
        checkout: new Date(checkout),
        promo: promo,
        chambre: chambre,
        email: email,
        usersId: userId,
        price: prix
    });
    const cl = new Client({
        fullName: firstname,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip
        });
        reserv.save()
            .then((result) => {
                console.log("Reservation saved");
          })
          .catch(err => {
            console.log(err);
          });
    
        cl.save()
            .then((result) => {
                res.redirect('/landing');
          })
          .catch(err => {
            console.log(err);
          });
      });
app.get('/landing', function(req, res) {
        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Reservation Confirmation</title>
          <style>
              body {
                  background-color: #f0f0f0;
                  font-family: Arial, sans-serif;
                  color: #333;
                  text-align: center;
                  padding: 20px;
              }
              h1 {
                  color: #666;
              }
              p {
                  font-size: 18px;
                  line-height: 1.6;
              }
          </style>
        </head>
        <body>
          <h1>Your Reservation is Registered!</h1>
          <p>Thank you for booking with us. You can now close this page.</p>
        </body>
        </html>
        `);
     });