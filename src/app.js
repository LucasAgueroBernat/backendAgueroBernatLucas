import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import handlebars from 'express-handlebars';
import {initializePassport} from './config/passport.js';
import { __dirname } from './utils.js';
import passport from 'passport';
import sessionsRouter from './routes/session.router.js';
import UserRouter from './routes/users.router.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import loggerRouter from './routes/logger.router.js';
import currentRouter from "./routes/current.router.js"
import errorHandler from "./middlewares/errors/index.js";
import viewsResetPass from './routes/resetPassword.router.js';
import { addLogger } from './utils.js';
import configs from './config/config.js';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import session from "express-sesion";

const app = express();
app.use(cookieParser());

try {
  await mongoose.connect(configs.mongoUrl);
  console.log('DB connected');
  app.use(session({
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: 3600
    }),
    secret: configs.sessionSecret,
    resave: true,
    saveUninitialized: true,
  }));
} catch (error) {
  console.log(error.message);
}

// Configura el middleware de express-session
app.use(session({
  secret: 'luc@saguerosud1234', 
  resave: false,
  saveUninitialized: false
}));

initializePassport();


//passport
app.use(passport.initialize());
app.use(passport.session());

//express
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//ROUTES
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', UserRouter);
app.use('/', ViewsRouter);
app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);
app.use('/current', currentRouter);
app.use(addLogger);
app.use('/loggerTest', loggerRouter);
app.use('/api/reset', viewsResetPass);
app.use(errorHandler);


app.listen(8080, () => console.log('Server running'));




//const swaggerOptions = {
  //definition: {
    //openapi: '3.0.1',
   // info: {
    //  title: 'Documentacion proyecto backend ecommerce',
     // description: 'api de compra de productos.'
   // }
  //},
 // apis: [`${__dirname}/Docs/**/*.yaml`]
//}
//const specs = swaggerJsdoc(swaggerOptions);

//app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
