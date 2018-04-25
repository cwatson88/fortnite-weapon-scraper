"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
let getWeapons;
// css selectors
const allWeaponCategories = "#app > div:nth-child(2) > div > div > div";
// always wrap async await in try catch blocks
try {
    // start an iife and annonomous async function
    (() => __awaiter(this, void 0, void 0, function* () {
        // start puppeteer
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto("https://db.fortnitetracker.com/weapons");
        // generic helper functions
        /*
         ######
         page.$$eval() uses Array.from() to put querySelectors into iterable array
    
          divs => divs.map(div => div.textContent)
          */
        const countSelectors = yield page.$$eval(allWeaponCategories, divs => divs);
        // console.log(await countSelectors);
        const allWeapons = (categorySelector) => __awaiter(this, void 0, void 0, function* () {
            const weaponsCategoryArray = yield page.$$eval(categorySelector, divs => divs);
            // .map() is used to loop through the
            // promise all is needed to resolve promises from array.map()
            const result = yield Promise.all(weaponsCategoryArray.map((item, index) => __awaiter(this, void 0, void 0, function* () {
                // grab the weapon title
                const weaponTitle = yield page.$eval(
                // add one to index because nodes start at 1 not 0 like arrays
                `${categorySelector}:nth-child(${index + 1}) > div.panel-heading`, divs => divs.textContent.trim());
                // grab the weapon stats
                const weaponsSelector = `${categorySelector}:nth-child(${index +
                    1}) > div.panel-body.panel-item-info > div`;
                const weaponsArray = yield page.$$eval(weaponsSelector, divs => divs);
                const weaponStats = yield Promise.all(yield weaponsArray.map((item, index) => __awaiter(this, void 0, void 0, function* () {
                    const weaponsDiv = `${weaponsSelector}:nth-child(${index +
                        1}) > div.values >`;
                    const weaponBody = yield page.$eval(`${weaponsDiv} div.body`, divs => divs.textContent.trim());
                    const weaponHead = yield page.$eval(`${weaponsDiv} div.head`, divs => divs.textContent.trim());
                    const weaponReload = yield page.$eval(`${weaponsDiv} div.reload`, divs => divs.textContent.trim());
                    return {
                        weaponBody,
                        weaponHead,
                        weaponReload
                    };
                })));
                return {
                    weaponTitle,
                    weaponStats
                };
            })));
            return result;
        });
        getWeapons = yield allWeapons(allWeaponCategories);
        console.log(yield JSON.stringify(getWeapons, null, 2));
        // write to a new file named 2pac.txt
        fs_1.default.writeFile("fortnite-weapons.js", JSON.stringify(getWeapons, null, 2), err => {
            // throws an error, you could also catch it here
            if (err) {
                throw err;
            }
            // success case, the file was saved
            console.log("Fnite saved!");
        });
        yield browser.close(); // end the session
    }))();
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=getAllWeapons.js.map