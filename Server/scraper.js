const express = require('express');
const app = express();
const parseTexts = require('./parseText');

//RUN ON PORT 5000
//cd Server
//npm run dev

  //todo
    //make SQTF appear in front end, remove it from here

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
  //    link6: '/html/body/section/div[3]/div[2]/div[1]/section[1]/div[2]/article[4]/div/div[1]/a'
    },
    postProperties: { //XPATHS to post properties
      post_IMG: '/html/body/section/section/div[1]/div[1]/section/div/div/div/div/div/div/div[2]/ul/li[2]/div/img',
      post_Price: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[1]',
      post_Adress1: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[2]/div',
      post_Adress2: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/div[2]/ul/li[1]/text()',
      post_Area: '/html/body/section/section/div[1]/div[1]/div[1]/div[1]/ul/li[3]',
      post_PropertyType: '//*[@id="property-details"]/div/div[2]/section[3]/div[2]',
      post_Source: 'https://www.rew.ca/',
      post_PropertyAge: 'html/body/section/section/div[1]/div[1]/main/div[2]/div[1]/div[2]/section[4]/div[2]',
      post_Ratio: 'N/A',
      calculateRatio: true
    }
  },
  { //Pint2Homes
    query: 'https://www.point2homes.com/CA/Real-Estate-Listings/BC.html?location=oakridge+vancouver&search_mode=location&page=1&SelectedView=listings&location_changed=true&ajax=1',
    inputParse: parseTexts.parseTextPoint2Homes,
    active: false,
    postLinks: { //XPATHS to post links
      link1: '/html/body/div[2]/div[3]/div/div/div/div/main/div[3]/div[1]/ul/li[1]/article/div/div[2]/div[1]/div[1]/div',
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
  { //REMAX
    query: 'https://www.remax.ca/find-real-estate?address=oakridge%2C+Vancouver%2C+BC%2C+Canada&pageNumber=1',
    inputParse: parseTexts.parseRemax,
    active: true,
    postLinks: { //XPATHS to post links
      link1: '/html/body/div/div[1]/div/div[2]/main/div/div[1]/a',
      link2: '/html/body/div[1]/div[1]/div/div[2]/main/div/div[2]/a',
      link3: '/html/body/div[1]/div[1]/div/div[2]/main/div/div[3]/a',
      link4: '/html/body/div[1]/div[1]/div/div[2]/main/div/div[4]/a',
      link5: '/html/body/div[1]/div[1]/div/div[2]/main/div/div[5]/a',
    },
    postProperties: { //XPATHS to post properties
      post_IMG: '/html/body/div/div[1]/div[3]/div/div/img',
      post_Price: '/html/body/div/div[1]/header/div[1]/div[1]/div[1]/div[1]',
      post_Adress1: '/html/body/div/div[1]/header/div[1]/div[2]/h1/div/span[1]',
      post_Adress2: '/html/body/div/div[1]/header/div[1]/div[2]/h1/div/span[2]',
      post_Area: '/html/body/div/div[1]/header/div[1]/div[1]/div[2]/div[1]/div[2]/span[1]/span[1]',
      post_PropertyType: '/html/body/div/div[1]/main/div/section[2]/ul[2]/li[1]/span[2]',
      post_Source: 'https://www.remax.ca/',
     // post_PropertyAge: '',
      post_Ratio: 'N/A',
      calculateRatio: true
    }
  },

  { //
    query: '',
 //   inputParse: parseTexts.PARSEFUNCTIONAME,
    active: false,
    postLinks: { //XPATHS to post links
      link1: '',
      link2: '',
      link3: '',
      link4: '',
      link5: '',
    },
    postProperties: { //XPATHS to post properties
      post_IMG: '',
      post_Price: '',
      post_Adress1: '',
      post_Adress2: '',
      post_Area: '',
      post_PropertyType: '',
      post_Source: '',
      post_PropertyAge: '',
      post_Ratio: 'N/A',
      calculateRatio: false
    }
  },
]

const searchPageQuery = async (input) => {

  let websitesResults = []

  let n = -1;

  let searchPosts = [];

  await Promise.all(websites.map(async (webSource) => {
    n++;
    if (webSource.active) {
      console.log('Scrapping data from, ', webSource.query)

      let parsedQuery = webSource.inputParse(input)
      gatheredLinks = [];

      let currentLoopResults = await searchFromQuery(parsedQuery, n)

      currentLoopResults.forEach(post => {
        if(post.price!=undefined){searchPosts.push(post)}
      })
    }

    

  }))

  searchPosts.forEach(post => {
    websitesResults.push(post)
  })

  console.log('______________________websitesResults______________________ ');
  console.log(websitesResults.length, ' Market posts found!');
  console.log(websitesResults);

  return websitesResults

}


//---------------------------------------------------------------------//
//----------------SCRAPPING FUNCTIONS ------------------//

const searchFromQuery = async (query, n) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  gatheredLinks = [];

  await page.goto(`${query}`); //link being scrapped

  console.log('page query is ', `${query}`)

  console.log('looking for links...');

  let website = websites[n].postLinks


  for (let link in website) {
    console.log(link, website[link])
    const el = await page.waitForXPath(`${website[link]}`, { timeout: 1000 }).catch((error) => console.log('failed to wait for XPATH')); //xpath
    if (el != undefined) {

      const link1 = await el.getProperty('href');
      const linkTxt1 = await link1.jsonValue();
      gatheredLinks.push(linkTxt1);

      console.log(el)

      console.log('Post link found: ', linkTxt1);
    } else {
       console.log("Element invalid: ",el) 
       console.log("--------------------------------------------------------------------------") 

      }
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

//scrap posts
const dataScrapp = async (link, n) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let marketPost = {
    image: undefined,
    price: undefined,
    adress1: undefined,
    adress2: undefined,
    area: undefined,
    link: undefined,
    type: 'N/A',
    age: 'N/A',
    ratio: 'N/A'
  }

  await page.goto(link); //link being scrapped

  //get post IMAGE
  const [scrappImg] = await page.$x(`${websites[n].postProperties.post_IMG}`); //xpath
  if (scrappImg != undefined) {
    console.log('image found')
    let src = await scrappImg.getProperty('src');
    let srcTxt = await src.jsonValue();
    marketPost.image = srcTxt;
  } else { console.log("oh no, element not compatible! Image!") }

  //get post PRICE
  const [scrappPrice] = await page.$x(`${websites[n].postProperties.post_Price}`); //xpath
  console.log('price found')
  if (scrappPrice != undefined) {
    let txt = await scrappPrice.getProperty('textContent');
    let rawTxt = await txt.jsonValue();
    marketPost.price = rawTxt;
  } else { console.log("oh no, element not compatible! Price") }

  //get post Adress (part 1)
  const [scrappAdress1] = await page.$x(`${websites[n].postProperties.post_Adress1}`); //xpath
  if (scrappAdress1 != undefined) {
    console.log('Adress 1 found')
    let adress = await scrappAdress1.getProperty('textContent');
    let rawAdress = await adress.jsonValue();
    marketPost.adress1 = rawAdress;
  } else { console.log("oh no, element not compatible! Adress 1") }

  //get post Adress (part 2)
  const [scrappAdress2] = await page.$x(`${websites[n].postProperties.post_Adress2}`); //xpath
  if (scrappAdress2 != undefined) {
    console.log('Adress 2 found')
    let adress2 = await scrappAdress2.getProperty('textContent');
    let rawAdress2 = await adress2.jsonValue();
    marketPost.adress2 = rawAdress2;
  } else { console.log("oh no, element not compatible! Adress 2") }

  //get post Area
  const [scrappArea] = await page.$x(`${websites[n].postProperties.post_Area}`); //xpath
  if (scrappArea != undefined) {
    console.log('area found')
    let area = await scrappArea.getProperty('textContent');
    let rawArea = await area.jsonValue();
    marketPost.area = rawArea;
  } else { console.log("oh no, element not compatible!  Area") }

  //get post link
    marketPost.link = link;

  //get post age
  const [scrappAge] = await page.$x(`${websites[n].postProperties.post_PropertyAge}`); //xpath
  if (scrappAge != undefined) {
    console.log('age found')
    let age = await scrappAge.getProperty('textContent');
    let rawAge = await age.jsonValue();
    marketPost.age = rawAge;
  } else { console.log("oh no, element not compatible! Age") }

  //get post type
  const [scrappType] = await page.$x(`${websites[n].postProperties.post_PropertyType}`); //xpath
  if (scrappType != undefined) {
    console.log('property type found')
    let type = await scrappType.getProperty('textContent');
    let rawType = await type.jsonValue();
    marketPost.type = rawType;
  } else { console.log("oh no, element not compatible! post type") }

  //Ratio
  if (websites[n].postProperties.calculateRatio) {

    const strPrice = marketPost.price;
    const strArea = marketPost.area;
    console.log(`calculating ratio, ${strPrice}/${strArea}`)

  if(strPrice!=undefined && strArea!=undefined){

      const numPrice = parseInt(strPrice.replace(/[$,]/g, ''), 10);
      const numArea = parseInt(strArea.replace(/\D/g, ''), 10);

      const calculatedRatio = numPrice / numArea;
      const roundedRatio = parseFloat(calculatedRatio.toFixed(2));

      marketPost.ratio = roundedRatio;
      console.log('ratio is: ',roundedRatio)
    }
  }

  await browser.close();

  return marketPost;
};


///----------------------------------------------------------------------

module.exports = searchPageQuery;