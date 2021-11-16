function buildItem(itemElements) {
	const itemObj = {};
	itemElements.forEach((element) => {
		if (element.name === "enclosure") {
			itemObj.media = element.attributes;
        } else {
        	if ( element.children.length > 0) {
				itemObj[element.name] = element.children[0].text;
        	}
        }
	});
	return itemObj;
};

function buildImage(inputElement) {
	const image = {};
	inputElement.children.filter((child)=>child.type=="element").forEach((element) => {
		if ( element.name == "title" ){
			image.title = element.children[0].text;
		} else if ( element.name == "url" ){
			image.url = element.children[0].text;
		} else if ( element.name == "link" ){
			image.link = element.children[0].text;
		}
	});

	return image;
}

function processChannel(channel) {
	const feed = {};
	feed.media = new Array();

	channel.children.filter((child)=>child.type=="element").forEach((element) => {
			if ( element.name == "title" ){
				feed.title = element.children[0].text;
		    } else if ( element.name == "link" ){
		    	if (element.children[0] != undefined) {
					feed.link = element.children[0].text;
				}
		    } else if ( element.name == "description" ){
				feed.description = element.children[0].text;
		    } else if ( element.name == "copyright" ){
		    	if (element.children[0] != undefined) {
					feed.copyright = element.children[0].text;
		    	}
		    } else if ( element.name == "generator" ){
				feed.generator = element.children[0].text;
		    } else if ( element.name == "language" ){
				feed.language = element.children[0].text;
		    } else if ( element.name == "itunes:summary" ){
				feed.summary = element.children[0].text;
		    } else if ( element.name == "itunes:author" ){
				feed.author = element.children[0].text;
		    } else if ( element.name == "lastbuilddate" ){
				feed.lastbuilddate = element.children[0].text;
		    } else if ( element.name == "image" ){
				feed.image = buildImage(element);
		    } else if ( element.name == "item" ){
				itemElements = element.children.filter((child)=>child.type=="element");
				feed.media.push(buildItem(itemElements));
		    }
	});

	return feed;
}

function processRSS(rss) {
	return rss.children.filter((child)=>child.type=="element").map((child) => processChannel(child));
}

function assignIds(object_list) {
	return object_list.map((item, index) => Object.assign({}, item, {id: index}))
}

function fileNameFromUrl(url) {
   var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
   if (matches.length > 1) {
     return matches[1];
   }
   return null;
}

function getMediafilename (media) {
    let filename;
    let titleBaseFilename = "";

    // Try to generate the filename by the item title
    if (media != null && media.title != null) {
        const title = media.title;
        titleBaseFilename = Array.from(title).map(letter => validCharSet.has(letter) ? letter : "_").join("").trim();

        if (titleBaseFilename.length == 0) {
          titleBaseFilename = Array.from(new Array(12)).map(_ => Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)).map(code => String.fromCharCode(code)).join('');
        }
    }

    const URLBaseFilename = fileNameFromUrl(media.media.url);

    if (!titleBaseFilename == "") {
        // Append extension
        const FILENAME_MAX_LENGTH = 220;
        if (titleBaseFilename.length > FILENAME_MAX_LENGTH) {
            titleBaseFilename = titleBaseFilename.substring(0, FILENAME_MAX_LENGTH);
        }
        filename = titleBaseFilename + URLBaseFilename.match(/(\.\w{3,4})$/g)[0];
    } else {
        // Fall back on URL file name
        filename = URLBaseFilename;
    }
    return filename;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports =  { buildItem, processChannel, processRSS, assignIds, fileNameFromUrl, getMediafilename };
}