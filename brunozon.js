walk(document.body);
switchImages();

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/\bAmazon\b/g, "Brunozon");
	v = v.replace(/\bamazon\b/g, "brunozon");
	
	textNode.nodeValue = v;
}

function switchImages() {
    let logos = document.querySelectorAll(".a-icon");
    for (let l of logos) {
        if (! (l.classList.contains("a-icon-next-rounded") || l.classList.contains('a-icon-previous-rounded'))) {
//            l.style.backgroundImage = 'url("' + browser.extension.getURL("icons/brunozon-logo.png") + '")';
            l.style.backgroundSize =  'cover';
            l.style.backgroundPosition =  '0px 0px';
            l.style.height =  '38px';
        }
    }

    logos = document.querySelectorAll(".nav-logo-base");
    for (let l of logos) {
        l.style.backgroundImage = 'url("' + chrome.extension.getURL("icons/brunozon-logo-inverted.png") + '")';
        l.style.backgroundSize =  'cover';
        l.style.backgroundPosition =  '0px 0px';
        l.style.height =  '38px';
        l.style.width =  '100px';
    }
}
