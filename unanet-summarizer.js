
/* 
    NOTE: The reason this file uses a redirect is that it was originally served raw from GitHub pages.
    We wanted to move to a build system, the contents of which would live elsewhere, but that would have broken things for existing users.
    Rather than force people to update their bookmarks, we creatd a redirect to the files while they were on GitHub pages.
    Once the build process was completed, we switched the URL to the new outputted location, and voila!

    So, this file remains for backwards compatibility, rather than having bookmarklet users be confused as to why something stopped loading.
*/

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
