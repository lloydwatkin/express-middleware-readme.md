express-middleware-readme.md
============================

Express middleware which parses your project root's README.md to HTML and exposes on a specified URL.


== Usage ==

=== Default Options ===

```javaScript
app.use(require('express-middleware-readme.md').run)
```

This will expose your README.md at the the path '/readme.md'.

=== Set options ===

```javaScript
var readme = require('express-middleware-readme.md')
readme.setOptions({
    endpoint: [ '/readme.md', '/README.html' ],
    htmlWrap: {
        scripts: '/js/main.js',
        styles: '/css/style.css',
        meta: [
            { charset: 'utf-8' }
        ]
    }
})
app.use(readme.run)
```

Notes: 

* Each of 'endpoint', 'scripts', and 'styles' can be string values or arrays
* An empty object as 'htmlWrap' results in doctype, html, head, and body tags added
* 'meta' can be made up of 'content', 'charset', 'http-equiv', and 'name' attributes
* 'filename' is the location of your README.md relative to project root (defaults to /README.md)
* 'endpoint' defaults to '/readme.html' 