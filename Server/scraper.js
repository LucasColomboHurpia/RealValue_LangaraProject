const express = require('express');
const app = express();
const parseTexts = require('./parseText');

//RUN ON PORT 5000
//cd Server
//npm run dev

const puppeteer = require('puppeteer');

let gatheredLinks = [];

const websites = [
  { //REW
    query: 'https://www.rew.ca/properties/search/results?initial_search_method=single_field&query=',
    inputParse: parseTexts.parseTextREW,
    active: true,
    postLinks: { //XPATHS to post links
      link1: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[1]/article/div/div[1]/a',
      link2: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[2]/article[1]/div/div[1]/a',
      link3: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[2]/article[2]/div/div[1]/a',
      link4: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[2]/article[3]/div/div[1]/a',
      link5: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[2]/article[4]/div/div[1]/a',
      link6: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[2]/article[4]/div/div[1]/a'
    },
    postProperties: { //XPATHS to post properties
      post_IMG: '/html/body/section/section/div[1]/div[1]/section/div/div/div/div/div/div/div[2]/ul/li[2]/div/img',
      post_Price: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[1]',
      post_Adress1: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[2]/div',
      post_Adress2: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[2]/ul/li[1]/text()',
      post_Area: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/ul/li[3]',
      post_PropertyType: '//*[@id="property-details"]/div/div[2]/section[3]/div[2]',
      post_Source: 'https://www.rew.ca/',
    }
  },
  { //
    query: 'https://www.point2homes.com/CA/Real-Estate-Listings/BC.html?location=oakridge+vancouver&search_mode=location&page=1&SelectedView=listings&location_changed=true&ajax=1',
    inputParse: parseTexts.parseTextPoint2Homes,
    active: false,
    postLinks: { //XPATHS to post links
      link1: '/html/body/div[2]/div[4]/div/div/div/div[1]/div[1]/div[3]/div[1]/ul/li[1]/article/div/div[1]/div/ul/li/div[2]/div/ul/li[1]/a',
      link2: '/html/body/div[2]/div[4]/div/div/div/div[1]/div[1]/div[3]/div[1]/ul/li[2]/article/div/div[1]/div/ul/li/div[2]/div/ul/li[1]/a',
      link3: '/html/body/div[2]/div[4]/div/div/div/div[1]/div[1]/div[3]/div[1]/ul/li[3]/article/div/div[1]/div/ul/li/div[2]/div/ul/li[1]/a',
      link4: '/html/body/div[2]/div[4]/div/div/div/div[1]/div[1]/div[3]/div[1]/ul/li[4]/article/div/div[1]/div/ul/li/div[2]/div/ul/li[1]/a',
      link5: '/html/body/div[2]/div[4]/div/div/div/div[1]/div[1]/div[3]/div[1]/ul/li[5]/article/div/div[1]/div/ul/li/div[2]/div/ul/li[1]/a',
    },
    postProperties: { //XPATHS to post properties
      post_IMG: '/html/body/div[4]/div[1]/div[2]/div[1]/div[2]/div[1]/div/div/ul/li[1]/a/img',
      post_Price: '/html/body/div[4]/div[1]/div[2]/div[1]/div[3]/div/div[1]/div[1]/div[1]/div[1]/span/span',
      post_Adress1: '/html/body/div[4]/div[1]/div[2]/div[1]/div[1]/div/div[1]/h1/div',
      post_Adress2: '',
      post_Area: '/html/body/div[4]/div[1]/div[2]/div[1]/div[3]/div/div[1]/div[2]/ul/li[3]/strong',
      post_PropertyType: '/html/body/div[4]/div[1]/div[2]/div[1]/div[5]/div[1]/div[2]/div/dl[1]/dd',
    }
  },
]

const searchPageQuery = async (input) => {

  let websitesResults = []
  gatheredLinks = [];

  let n = 0;

  let searchPosts;

  await Promise.all(websites.map(async (webSource) => {

    if (webSource.active) {
      console.log('Scrapping data from, ', webSource.query)

      let parsedQuery = webSource.inputParse(input)

      searchPosts = await searchFromQuery(parsedQuery, n);
    }
    n++;
  }))

  searchPosts.forEach(post => {
    websitesResults.push(post)
  })

  console.log('______________________websitesResults______________________ ');
  console.log(websitesResults);

  return websitesResults

}


//---------------------------------------------------------------------//
//----------------SCRAPPING FUNCTIONS ------------------//

const searchFromQuery = async (query, n) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${query}`); //link being scrapped

  console.log('page query is ', `${query}`)

  console.log('looking for link...');

  let website = websites[n].postLinks

  for (let link in website) {
    console.log(link, website[link])
    const [el] = await page.$x(`${website[link]}`); //xpath
    if (el != undefined) {

      const link1 = await el.getProperty('href');
      const linkTxt1 = await link1.jsonValue();
      gatheredLinks.push(linkTxt1);

      console.log('Post link found: ', linkTxt1);
    } else { console.log("Element invalid") }
  }


  await browser.close();

  console.log('All done!', gatheredLinks)

  const dataFromMarketPosts = await getDataFromMarketPosts(gatheredLinks, n);

  return dataFromMarketPosts
}

const getDataFromMarketPosts = async (arrayOfLinks, n) => {

  let marketPosts = [];
  let post = {};

  console.log('let the Scrapping Begin!')

  await Promise.all(arrayOfLinks.map(async (link) => {
    console.log('Scrapping data... ')

    post = await dataScrapp(link, n)
    marketPosts.push(post);
  }));

  let finalResults = marketPosts;
  marketPosts = [];

  return finalResults

};

const dataScrapp = async (link, n) => {

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

  //get post IMAGE
  const [scrappImg] = await page.$x(`${websites[n].postProperties.post_IMG}`); //xpath
  if (scrappImg != undefined) {
    let src = await scrappImg.getProperty('src');
    let srcTxt = await src.jsonValue();
    marketPost.image = srcTxt;
  } else { console.log("oh no, element not compatible!") }

  //get post PRICE
  const [scrappPrice] = await page.$x(`${websites[n].postProperties.post_Price}`); //xpath
  if (scrappPrice != undefined) {
    let txt = await scrappPrice.getProperty('textContent');
    let rawTxt = await txt.jsonValue();
    marketPost.price = rawTxt;
  } else { console.log("oh no, page not compatible!") }

  //get post Adress (part 1)
  const [scrappAdress1] = await page.$x(`${websites[n].postProperties.post_Adress1}`); //xpath
  if (scrappAdress1 != undefined) {
    let adress = await scrappAdress1.getProperty('textContent');
    let rawAdress = await adress.jsonValue();
    marketPost.adress1 = rawAdress;
  } else { console.log("oh no, page not compatible!") }

  //get post Adress (part 2)
  const [scrappAdress2] = await page.$x(`${websites[n].postProperties.post_Adress2}`); //xpath
  if (scrappAdress2 != undefined) {
    let adress2 = await scrappAdress2.getProperty('textContent');
    let rawAdress2 = await adress2.jsonValue();
    marketPost.adress2 = rawAdress2;
  } else { console.log("oh no, page not compatible!") }

  //get post Area
  const [scrappArea] = await page.$x(`${websites[n].postProperties.post_Area}`); //xpath
  if (scrappArea != undefined) {
    let area = await scrappArea.getProperty('textContent');
    let rawArea = await area.jsonValue();
    marketPost.area = rawArea;
  } else { console.log("oh no, page not compatible!") }

  await browser.close();

  return marketPost;
};


///----------------------------------------------------------------------

module.exports = searchPageQuery;