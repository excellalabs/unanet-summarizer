window.summarizeUnanetTime = (function() {
    
    var onload = function () {
        window.summarizeUnanetTimeForReal();
    }
    
    const REDIRECT_URL = 'https://excellalabs.github.io/unanet-summarizer/unanet-summarizer-release.js';
    
    if (!window.summarizeUnanetTimeForReal) {
        var s = document.createElement('script');
        s.src = REDIRECT_URL;
        s.onload = onload;
        document.body.appendChild(s);
    }

    return function() {
        onload();
    };
})();
