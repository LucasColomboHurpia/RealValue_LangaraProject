const app = require('./app');
const searchPageQuery = require('./scraper');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const PORT = 5000; 

app.listen(PORT, () => { 
    //searchPageQuery();
    console.log(`server started on port ${PORT}`)
});


app.get("/scrapper", async (req, res) => { //just for texting, on localhost/api 

  const input = req.query.input;
  const result = await searchPageQuery(input); 
  res.json({ "query": result}) 
    });