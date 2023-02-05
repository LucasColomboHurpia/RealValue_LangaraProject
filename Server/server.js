const app = require('./app');
const searchPageQuery = require('./scraper');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const PORT = process.env.PORT;

app.listen(PORT, () => { 
    searchPageQuery();
    console.log(`server started on port ${PORT}`)
});