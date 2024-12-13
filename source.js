const InAppSpy = require("inapp-spy").default;

const $ = require("jquery");

const Bowser = require("bowser");
const browser = Bowser.getParser(window.navigator.userAgent);
const platform = browser.getPlatform();
let inApp = InAppSpy();

if ((platform.type === "mobile" || platform.type === "tablet") && inApp.isInApp) {
    const  OS = browser.getOS().name;

    if ('iOS' === OS) {
        let version = parseFloat(browser.getOS().version);
        if (version < 17) {
            $(document).ready(function() {
                $('a').each(function() {
                    let href = $(this).attr('href');
                    if (href.includes('fridayplans.com')) {
                        href = 'x-safari-' + href;
                        $(this).attr('href', href);
                    }
                });
            });
        }
    } else if ('Android' === OS) {
        $(document).ready(function() {
            $('a').each(function() {
                let href = $(this).attr('href');
                if (href.includes('fridayplans.com')) {
                    href = href.replace('https://', 'intent://');
                    href += "#Intent;scheme=https;end";
                    $(this).attr('href', href);
                }
            });
        });
    }
}
