const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use('/flight-booking', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true ,  pathRewrite: {
    '^/flight-booking': '/', 
  },}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
})
