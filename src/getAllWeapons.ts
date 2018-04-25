import fs from "fs";
import puppeteer from "puppeteer";

let getWeapons;
// css selectors

const allWeaponCategories: string = "#app > div:nth-child(2) > div > div > div";
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

    const countSelectors = await page.$$eval(allWeaponCategories, divs => divs);
    // console.log(await countSelectors);

    const allWeapons = async (categorySelector: string): Promise<any[]> => {
      const weaponsCategoryArray = await page.$$eval(
        categorySelector,
        divs => divs
      );
      // .map() is used to loop through the
      // promise all is needed to resolve promises from array.map()
      const result = await Promise.all(
        weaponsCategoryArray.map(async (item: string, index: number) => {
          // grab the weapon title
          const weaponTitle: string = await page.$eval(
            // add one to index because nodes start at 1 not 0 like arrays
            `${categorySelector}:nth-child(${index + 1}) > div.panel-heading`,
            divs => divs.textContent.trim()
          );

          // grab the weapon stats
          const weaponsSelector: string = `${categorySelector}:nth-child(${index +
            1}) > div.panel-body.panel-item-info > div`;
          const weaponsArray = await page.$$eval(weaponsSelector, divs => divs);
          const weaponStats = await Promise.all(
            await weaponsArray.map(async (item: string, index: number) => {
              const weaponsDiv: string = `${weaponsSelector}:nth-child(${index +
                1}) > div.values >`;

              const weaponBody: string = await page.$eval(
                `${weaponsDiv} div.body`,
                divs => divs.textContent.trim()
              );

              const weaponHead: string = await page.$eval(
                `${weaponsDiv} div.head`,
                divs => divs.textContent.trim()
              );
              const weaponReload: string = await page.$eval(
                `${weaponsDiv} div.reload`,
                divs => divs.textContent.trim()
              );

              return {
                weaponBody,
                weaponHead,
                weaponReload
              };
            })
          );

          return {
            weaponTitle,
            weaponStats
          };
        })
      );
      return result;
    };

    getWeapons = await allWeapons(allWeaponCategories);
    console.log(await JSON.stringify(getWeapons, null, 2));

    // write to a new file named 2pac.txt
    fs.writeFile(
      "fortnite-weapons.js",
      JSON.stringify(getWeapons, null, 2),
      err => {
        // throws an error, you could also catch it here
        if (err){
          throw err;
        } 

        // success case, the file was saved
        console.log("Fnite saved!");
      }
    );

    await browser.close(); // end the session
  })();
} catch (error) {
  console.log(error);
}
