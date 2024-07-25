const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session && req.session.token) {
        jwt.verify(req.session.token, "your_jwt_secret_key", (err, user) => {
            if (err) {
                return res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).send('Unauthorized: No token provided');
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
