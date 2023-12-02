const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const puppeteer = require('puppeteer');

const AppError = require('./services/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/user/userRoutes');
const adminRouter = require('./routes/admin/adminRoutes');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging

// Limit requests from same API
const limiter = rateLimit({
  max: process.env.NODE_ENV === 'development' ? 10000 : 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());
// 3) ROUTES
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://puzsergenerator.hu/', {
      waitUntil: 'networkidle2',
    });

    // Click the generate button
    await page.click('#button_generate');

    await page.waitForTimeout(500);

    // Scrape the text content
    const text = await page.$eval('#generator_text', (el) => el.textContent);

    await browser.close();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during scraping');
  }
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
