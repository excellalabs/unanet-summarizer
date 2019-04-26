window.summarizeUnanetTime = (function() {    
    const REDIRECT_URL = 'https://excellalabs.github.io/unanet-summarizer/unanet-summarizer-release.js';

    var onload = function () {
        window.summarizeUnanetTimeForReal();
    };
      
    return function() {
        if (!window.summarizeUnanetTimeForReal) {
            var s = document.createElement('script');
            s.src = REDIRECT_URL;
            s.onload = onload;
            document.body.appendChild(s);
        } else {
            onload();
        }
    };
})();
