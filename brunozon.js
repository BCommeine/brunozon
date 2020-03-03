function walk(rootNode){
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
      handleText(node);
    }

}

function handleText(textNode){
    var v = textNode.wholeText;

    v = v.replace(/\bAmazon\b/g, "Brunozon");
    v = v.replace(/\bamazon\b/g, "brunozon");
    textNode.nodeValue = v;

}

// The callback used for the document body and title observers
function observerCallback(mutations) {

    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else if (mutation.addedNodes[i].nodeType === 1) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
                walk(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {

    let logos = document.querySelectorAll(".a-icon");
    for (let l of logos) {
        if (! (l.classList.contains("a-icon-next-rounded") || l.classList.contains('a-icon-previous-rounded'))) {
            l.style.backgroundImage = 'url("' + browser.extension.getURL("icons/brunozon-logo.png") + '")';
            l.style.backgroundSize =  'cover';
            l.style.backgroundPosition =  '0px 0px';
            l.style.height =  '38px';
        }
    }

    logos = document.querySelectorAll(".nav-logo-base");
    for (let l of logos) {
        l.style.backgroundImage = 'url("' + browser.extension.getURL("icons/brunozon-logo-inverted.png") + '")';
        l.style.backgroundSize =  'cover';
        l.style.backgroundPosition =  '0px 0px';
        l.style.height =  '38px';
        l.style.width =  '100px';
    }

    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
