import AmazonSearch from "../Amazon.Search.Scraper.js";


// const url = "http://www.amazon.com/s?k=nike&crid=2C2NJL6L2R77U&sprefix=n%2Caps%2C2401&ref=nb_sb_noss_2";
// const url = "http://www.amazon.com/s?k=Nike&crid=3BHG85FGGE9E1&sprefix=nike%2Caps%2C1461&ref=nb_sb_noss_1";
// const url = "https://www.amazon.com/s?k=samsung&crid=1PKD62UW6I73L&sprefix=sam%2Caps%2C2095&ref=nb_sb_noss_2";
// const url = "https://www.amazon.com/s?k=macbook&ref=nb_sb_noss";
const url = "./tests/Amazon.com _ iphone 13.html";
const amazon = new AmazonSearch(url, "../");
amazon.scrape((data) => {
    console.log(data)
})