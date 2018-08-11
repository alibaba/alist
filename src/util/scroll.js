/* ref: https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery */
if ('performance' in window === false) {
    window.performance = {};
}

Date.now = (Date.now || function getTime() { // thanks IE8
    return new Date().getTime();
});

if ('now' in window.performance === false) {
    let nowOffset = Date.now();
    if (window.performance.timing && window.performance.timing.navigationStart) {
        nowOffset = window.performance.timing.navigationStart;
    }

    window.performance.now = () => Date.now() - nowOffset;
}

function scrollToTop(scrollTo, scrollDuration = 300) {
    if (typeof scrollTo === 'string') {
        const scrollToObj = document.querySelector(scrollTo);
        if (scrollToObj && typeof scrollToObj.getBoundingClientRect === 'function') {
            scrollTo = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
        } else {
            scrollTo = 0;
            return;
        }
    } else if (typeof scrollTo !== 'number') {
        scrollTo = 0;
    }

    const anchorHeightAdjust = 30;
    if (scrollTo > anchorHeightAdjust) {
        scrollTo -= anchorHeightAdjust;
    }

    const cosParameter = (window.scrollY - scrollTo) / 2;
    let scrollCount = 0;
    let oldTimestamp = window.performance.now();

    function step(newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) {
            window.scrollTo(0, scrollTo);
            return;
        }

        const stepDiff = scrollTo + cosParameter + (cosParameter * Math.cos(scrollCount));
        window.scrollTo(0, Math.round(stepDiff));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

export default scrollToTop;
