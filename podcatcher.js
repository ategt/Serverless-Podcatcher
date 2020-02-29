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
		try {
			if ( element.name == "title" ){
				feed.title = element.children[0].text;
		    } else if ( element.name == "link" ){
				feed.link = element.children[0].text;
		    } else if ( element.name == "description" ){
				feed.description = element.children[0].text;
		    } else if ( element.name == "copyright" ){
				feed.copyright = element.children[0].text;
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
		} catch (error) {
			console.error(error);
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports =  { buildItem, processChannel, processRSS, assignIds, fileNameFromUrl };
}