const puppeteer = require("puppeteer");

// css selector variables
const weaponTitleSelector =
  "#app > div:nth-child(2) > div > div > div:nth-child(1) > div.panel-heading > h3";
const weaponsSelector = "div.panel-body.panel-item-info";
const weaponArea =
  "#app > div:nth-child(2) > div > div > div:nth-child(1) > div.panel-body.panel-item-info";

// async function run() {
//   // start pupetteer up
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   //   puppeteer to navigate to the page
//   await page.goto("https://db.fortnitetracker.com/weapons");

//   // always wrap async await in try catch blocks
//   try {
//     const html = await page.$$eval(weaponsSelector, divs => divs.length);
//     // console.log(html);
//     /**
//      * if you want to do one item then use this below:
//      */
//     // const res = await page.$(weaponTitleSelector);
//     // console.log(res);
//     // ----------------------

//     /**
//      * use this to iterate over a list of items using the css selector above.
//      * You will have all the innerHTML, it may be easier to then pick this out using just nodejs?
//      */

//     const weaps = await page.$$(weaponsSelector); // document.querySelectAll()

//     // weaps returns an array, wrap this in promise.all to allow the promises to resolve before you return the array
//     //, else you will end up having an array of promises
//     const resultHandle = await Promise.all(
//       weaps.map(
//         //use the map as a for of loop, this would be one alternative
//         async weapon =>
//           await page.evaluate(async body => {
//             // 1) get the element more
//             // 2) click the element to loage the new page
//             // 3) scrape the data off the page
//             let el = await body.querySelector(".weapon > .values > .more");
//             let more = await el.click();
//             console.log(await more);
//             return;
//           }, weapon)
//       )
//     );
//     console.log(await resultHandle);
//   } catch (error) {
//     console.log(error);
//   }
//   await browser.close(); //end the session
// }
//
// run(); //run the puppetteer function

async function clickableObj() {
  const moreWeapon =
    "#app > div:nth-child(2) > div > div > div:nth-child(1) > div.panel-body.panel-item-info > div:nth-child(1) > div.values > div.more";
  // start pupetteer up
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250
  });
  const page = await browser.newPage();
  //   puppeteer to navigate to the page
  await page.goto("https://db.fortnitetracker.com/weapons");

  // always wrap async await in try catch blocks
  try {
    //   get the more option for each weapon and click it
    const response = await page.click(moreWeapon);
    // when the page loads grab some data (below just grabs soe of the first section)
    const res = await page.$(
      "#data-nite > div.row > div.col-lg-10 > div:nth-child(1) > div > div"
    );
    // process the returned page element
    const html = await page.evaluate(
      body =>
        //   loop through the selectors that are needed on the page and hold them as an object
        body,
      res
    );

    const htmlWithout = page.evaluate(async() => {
      const res = await document.querySelector("#data-nite > div.row > div.col-lg-10 > div:nth-child(1) > div > div").outerHTML;
      // const getChild = await res.querySelector('.psnel-title').innerHTML;
      return await res
    });

    // console.log(await htmlWithout);
    const test = typeof await htmlWithout
  console.log(test)
  } catch (error) {
    console.log(error);
  }
  await browser.close(); //end the session

  

}

clickableObj();
