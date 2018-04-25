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
const puppeteer_1 = __importDefault(require("puppeteer"));
// css selectors
const weaponCategories = "#app > div:nth-child(2) > div > div > div";
const weaponCategorySelector = `#app > div:nth-child(2) > div > div > div:nth-child(1)`;
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
        const countSelectors = yield page.$$eval(weaponCategories, divs => divs.length);
        console.log(yield countSelectors);
        // get all the items and put them in an object / array
        // const getHTML = async (nodeListLength, targetNodeSeletor) => {
        //   for (let i = 0; i < nodeListLength; i++) {
        //       await page.$eval("#search", el => el.value);
        //   }
        // };
        yield browser.close(); // end the session
    }))();
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=getAllWeapons.js.map