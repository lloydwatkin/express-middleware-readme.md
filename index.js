var content        = null
var options        = null
var defaultOptions = {
    endpoint: '/readme.md',
    filename: 'README.md',
}

exports.setOptions = setOptions = function(opts, callback) {
	content            = null
	options            = opts
	var readmeLocation = require('path').resolve(process.cwd(), options.filename)
	require('fs').readFile(readmeLocation, 'utf8', function(error, data) {
		if (error) return console.error(error)
		content = require('github-flavored-markdown').parse(data)
		if (callback) callback()
	})
}

exports.run = function(req, res, next) {
	
	var handleRequest = function() {
	    if (true) 
	        console.log("responding with content")
	        return res.send(content)
	    next()
    }
    console.log(options)
	if (!options) return setOptions(defaultOptions, handleRequest)
	handleRequest()
}
