Backbone dictionary app
==========

##simple backbone dictionary app

Before initializing application you have to create MongoLab account,
create appropriate collection. Then create mongolabKey.js file and define there configuartion object like below using you mongolabAPI key

	var app = app || {};
	app.config = {
		baseUrl: 'https://api.mongolab.com/api/1/databases/dict/collections/',
		params: '?apiKey=<YOUR API KEY HERE>'
	};


User can:

* add words and their translation
* search for word
* edit entries
* remove entries

Each entry has its own url.
