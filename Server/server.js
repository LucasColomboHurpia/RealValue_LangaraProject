const express = require('express');
const app = express();

//RUN ON PORT 5000
//cd server
//npm run dev

const puppeteer = require('puppeteer');


/* (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.rew.ca/properties/4811334/1787-e-6th-avenue-vancouver-bc?search_params%5Bquery%5D=Vancouver%2C+BC&searchable_id=361&searchable_type=Geography'); //link being scrapped

  const [el] = await page.$x('/html/body/section/section/div[1]/div[1]/section/div/div/div/div/div/div/div[2]/ul/li[2]/div/img'); //xpath
  const src = await el.getProperty('src');
  const srcTxt = await src.jsonValue();

  const [el2] = await page.$x('/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[1]'); //xpath
  const txt = await el2.getProperty('textContent');
  const rawTxt = await txt.jsonValue();

  const [el3] = await page.$x('/html/body/section/section/div[3]/header/div/div[2]/div/div/div[1]/div/div/div[2]/div/a'); //xpath
  const link = await el3.getProperty('href');
  const rawlink = await link.jsonValue();


  console.log(srcTxt, rawTxt,rawlink);

  await browser.close();

  app.get("/api", (req, res)=>{ //just for texting, on localhost/api 
    res.json({"item information": [srcTxt,rawTxt,rawlink]})
});
})(); */

const searchPageQuery = async () => {
  //search through search page from website
  //gather links

  let gatheredLinks = [];

  console.log('give me your links!')

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.rew.ca/properties/areas/vancouver-bc'); //link being scrapped

  console.log('finding 1st link');

  const [el1] = await page.$x('/html/body/section/div[3]/div[2]/div[1]/section[1]/div[1]/article[1]/div/div[1]/a'); //xpath
  const link1 = await el1.getProperty('href');
  const linkTxt1 = await link1.jsonValue();
  gatheredLinks.push(linkTxt1);

  console.log('1st link done');
  console.log('finding 2nd link');


  const [el2] = await page.$x('/html/body/section/div[3]/div[2]/div[1]/section[1]/div[1]/article[2]/div/div[1]/a'); //xpath
  const link2 = await el2.getProperty('href');
  const linkTxt2 = await link2.jsonValue();
  gatheredLinks.push(linkTxt2);

  console.log('2nd link done');
  console.log('finding 3rd link');

  const [el3] = await page.$x('/html/body/section/div[3]/div[2]/div[1]/section[1]/div[3]/div[2]/div/a'); //xpath
  const link3 = await el3.getProperty('href');
  const linkTxt3 = await link3.jsonValue();
  gatheredLinks.push(linkTxt3);

  console.log('3rd link done');
  console.log('finding 4th link');

  const [el4] = await page.$x('/html/body/section/div[3]/div[2]/div[1]/section[1]/div[5]/article[1]/div/div[1]/a'); //xpath
  const link4 = await el4.getProperty('href');
  const linkTxt4 = await link4.jsonValue();
  gatheredLinks.push(linkTxt4);

  console.log('4th link done');
  console.log('finding 5th link');

  const [el5] = await page.$x('/html/body/section/div[3]/div[2]/div[1]/section[1]/div[5]/article[2]/div/div[2]/div/a'); //xpath
  const link5 = await el5.getProperty('href');
  const linkTxt5 = await link5.jsonValue();
  gatheredLinks.push(linkTxt5);

  await browser.close();

  console.log('5th link done');

  console.log('All done!')

  console.log(gatheredLinks);

  getDataFromMarketPosts(gatheredLinks);
}

searchPageQuery();

let marketPosts = [];

const getDataFromMarketPosts = async (array) => {

  console.log('let the Scrapping Begin!')
  await array.forEach(link => {
    console.log('Scrapping data... ')
    dataScrapp(link)
  });

  app.get("/api", (req, res) => { //just for texting, on localhost/api 
    res.json({ "item information": [marketPosts] }) //maybe change this?
  });


};

const dataScrapp = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let marketPost = {
    image: undefined,
    price: undefined,
    adress1: undefined,
    adress2: undefined,
    area: undefined,
  }

  await page.goto(link); //link being scrapped

  const [el] = await page.$x('/html/body/section/section/div[1]/div[1]/section/div/div/div/div/div/div/div[2]/ul/li[2]/div/img'); //xpath
  if (el != undefined) {
    let src = await el.getProperty('src');
    let srcTxt = await src.jsonValue();
    marketPost.image = srcTxt;
  } else { console.log("oh no, page not compatible!") }

  const [el2] = await page.$x('/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[1]'); //xpath
  if (el2 != undefined) {
    let txt = await el2.getProperty('textContent');
    let rawTxt = await txt.jsonValue();
    marketPost.price = rawTxt;
  } else { console.log("oh no, page not compatible!") }

  const [el3] = await page.$x('/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[2]/div'); //xpath
  if (el3 != undefined) {
    let adress = await el3.getProperty('textContent');
    let rawAdress = await adress.jsonValue();
    marketPost.adress1 = rawAdress;
  } else { console.log("oh no, page not compatible!") }

  const [el4] = await page.$x('/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[2]/ul/li[1]/text()'); //xpath
  if (el4 != undefined) {
    let adress2 = await el4.getProperty('textContent');
    let rawAdress2 = await adress2.jsonValue();
    marketPost.adress2 = rawAdress2;
  } else { console.log("oh no, page not compatible!") }

  const [el5] = await page.$x('/html/body/section/section/div[1]/div[1]/div[1]/div[1]/ul/li[3]'); //xpath
  if (el5 != undefined) {
    let area = await el5.getProperty('textContent');
    let rawArea = await area.jsonValue();
    marketPost.area = rawArea;
  } else { console.log("oh no, page not compatible!") }

  /*  const [el3] = await page.$x(''); //xpath
      if (el3 != undefined) {
        const txt = await el3.getProperty('textContent');
        const rawTxt = await txt.jsonValue();
        marketPost.price = rawTxt;
    } else { console.log("oh no, page not compatible!") } */


  await browser.close();

  marketPosts.push(marketPost);
  ////////////////////////////////////////////////////////////////////
  console.log(marketPosts)



  return marketPost;

};



app.listen(5000, () => { console.log('server started on port 5000') });