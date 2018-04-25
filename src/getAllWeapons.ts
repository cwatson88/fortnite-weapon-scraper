import puppeteer from "puppeteer";

// css selectors

const weaponCategories: string = "#app > div:nth-child(2) > div > div > div";
const weaponCategorySelector: string = `#app > div:nth-child(2) > div > div > div:nth-child(1)`;
// always wrap async await in try catch blocks
try {
  // start an iife and annonomous async function
  (async () => {
    
    // start puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://db.fortnitetracker.com/weapons");

    // generic helper functions

    /*
     ######
     page.$$eval() uses Array.from() to put querySelectors into iterable array

      divs => divs.map(div => div.textContent)
      */

    const countSelectors = await page.$$eval(
      weaponCategories,
      divs => divs.length
    );
    console.log(await countSelectors);
    // get all the items and put them in an object / array
    // const getHTML = async (nodeListLength, targetNodeSeletor) => {
    //   for (let i = 0; i < nodeListLength; i++) {
    //       await page.$eval("#search", el => el.value);
    //   }
    // };

    await browser.close(); // end the session
  })();
} catch (error) {
  console.log(error);
}
