var content        = null
var options        = null
var defaultOptions = {
    endpoint: '/readme.html',
    filename: 'README.md',
    htmlWrap: {}
}

exports.setOptions = setOptions = function(opts, callback) {
	content = ""
	options = opts
	
	var addHead = function() {
	    content += "<!DOCTYPE html>\n<html>\n<head>\n"
	    if (options.htmlWrap.scripts) options.htmlWrap.scripts.forEach(function(script) {
	        content += '<script type="text/javascript" src="' + script + '"></script>' + "\n"
	    })
	    if (options.htmlWrap.styles) options.htmlWrap.styles.forEach(function(style) {
	        content += '<link href="' + style + '" rel="stylesheet" type="text/css" />' + "\n"
	    })
	    if (options.htmlWrap.meta) options.htmlWrap.meta.forEach(function(meta) {
	    	content += '<meta ' 
	    	if (meta.name) content += 'name="' + meta.name + '" '
	    	if (meta.content) content += 'content="' + meta.content + '" '
	    	if (meta['http-equiv']) content += 'http-equiv="' + meta['http-equiv'] + '" '
	    	if (meta.charset) content += 'charset="' + meta.charset + '" '
	    	content += ' />' + "\n"
	    })
	    if (options.htmlWrap.title) content += '<title>' + options.htmlWrap.title + "</title>\n"
	    content += "</head>\n<body>\n"
	}
	
	var addFoot = function() {
		if (!options.htmlWrap) return
		content += "\n</body>\n</html>"
	}

    var checkValues = function() {
    	if (!options.filename) options.filename = defaultOptions.filename
    	var endpoints = options.endpoint || defaultOptions.endpoint
        if (typeof endpoints == 'string') endpoints = [ endpoints ]
        options.endpoint = []
        endpoints.forEach(function(endpoint) {
        	options.endpoint[endpoint] = true
        })
    	if (options.htmlWrap) {
    		['scripts', 'styles', 'meta'].forEach(function(i) {
    			if (options.htmlWrap[i]) {
    		        if (options.htmlWrap[i] && typeof options.htmlWrap[i] == 'string')
    			        options.htmlWrap[i] = [ options.htmlWrap[i] ]
    			}
    	    })
        }
    }
    checkValues()
    
	var readmeLocation = require('path').resolve(process.cwd(), options.filename)
	require('fs').readFile(readmeLocation, 'utf8', function(error, data) {
		if (error) throw(error)
		content = ""
		addHead()
		content += require('github-flavored-markdown').parse(data)
		addFoot()
		if (callback) callback()
	})
}

exports.run = function(req, res, next) {
	var handleRequest = function() {
	    if (options.endpoint[req.path]) return res.send(content)
	    next()
    }
	if (!options) return setOptions(defaultOptions, handleRequest)
	handleRequest()
}