function get_crx() {
			chrome.tabs.getSelected(null,function(tab){
			var filename = tab.title.split(" - Chrome Web Store")[0]+".zip";
			filename = filename.replace(/[&\/\\:"*<>|?]/g, '');
			var tab_url = tab.url.split("/")[6].split('?')[0];
			chrome.tabs.create({'url': chrome.extension.getURL('View.html?UID='+tab_url+'&filename='+filename)});
				});
				
			
			
			 

}
chrome.contextMenus.create({
	'title': 'View Permission and modify',
	'contexts': ['all'],
	'onclick': get_crx,
	'documentUrlPatterns': ['https://chrome.google.com/webstore/detail/*']
});





