import Request from "./ReqJS/Request.js"

/**
 * Amazon Scraper is a lightweight framework that allows you to scrape certain date from Amazon Search Result Page
 * @author Olawoore Emmanuel Collins
 */
class AmazonSearch {
    /**
     * 
     * @param {String} url amazon search url.
     * @param {String} moduleDir root folder for the module i.e where it's stored.
     */
    constructor(url, moduleDir) {
        this.url = url;
        this.dir = moduleDir;
        this.req = new Request({ url: this.dir + "scrape.php", method: "POST", res: "blob", type: "application/x-www-urlencoded", data: url });
    }

    /**
     * @param {Function} callback Callback function to handle response 
     */
    scrape(callback) {
        let data = {
            productA: [],
            productB: [],
            links: [],
            images: [],
            priceData: {
                symbol: [],
                amount: [],
                fraction: []
            }
        };
        this.req.push((response) => {
            const test = document.createElement("div");
            test.id = "test";
            test.hidden = true;
            const file = new FileReader();
            file.onload = function() {
                test.innerHTML = this.result;
                document.body.append(test);
                const searchValue = document.getElementsByTagName("SPAN");
                const img = document.getElementsByTagName("IMG");
                const anchor = document.getElementsByTagName("a");
                for (let i = 0; i < searchValue.length; i++) {
                    if (searchValue[i].className === "a-size-medium a-color-base a-text-normal") {
                        data.productA.push(searchValue[i].innerText);
                    }
                    if (searchValue[i].className === "a-size-base-plus a-color-base a-text-normal") {
                        data.productB.push(searchValue[i].innerText);
                    }
                    if (searchValue[i].className === "a-price-symbol") {
                        data.priceData.symbol.push(searchValue[i].innerText);
                    }
                    if (searchValue[i].className === "a-price-whole") {
                        data.priceData.amount.push(searchValue[i].innerText);
                    }
                    if (searchValue[i].className === "a-price-fraction") {
                        data.priceData.fraction.push(searchValue[i].innerText);
                    }
                }

                for (let i = 0; i < img.length; i++) {
                    if (img[i].className === "s-image") {
                        data.images.push(img[i].src);
                        callback(data);
                    }
                }
                for (let i = 0; i < anchor.length; i++) {
                    if (anchor[i].className === "a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal") {
                        let urls = anchor[i].href.split(window.location.origin + "/");
                        data.links.push(urls[1]);
                        // data.links.push(anchor[i].href);
                        callback(data);
                    }
                }
            }
            file.readAsText(response)
        });
    }


}

export default AmazonSearch;