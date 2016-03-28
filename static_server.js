var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs"),
    qs   = require("querystring"),
    dir  = process.argv[2] || process.cwd(),
    port = process.argv[3] || 5555;

var mimeData = {
    ".html": "text/html",
    ".htm": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".svg": "image/svg+xml",
    ".xml": "application/xml",
    ".ttf": "application/x-font-ttf",
    ".woff": "application/x-font-woff",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".ogg": "application/ogg", 
    ".ogv": "video/ogg", 
    ".oga": "audio/ogg",
    ".avi": "video/avi", 
    ".wav": "audio/x-wav",
    ".webm": "video/webm",
    ".zip": "application/x-compressed",
    ".bin": "application/octet-stream",
};

function get_mime(filename)
{
    return mimeData[path.extname(filename)] || "application/octet-stream";
}

function parse_range(headers, total)
{
    var match;
    var start;
    var end;
    if (headers && headers.range && typeof headers.range === "string" && total) {
        match = headers.range.match(/bytes=(\d+)(?:-(\d+))?/) || [];
        start = match[1] && match[1] >= 0 ? Number(match[1]) : 0;
        end = match[2] && match[2] > start && match[2] < total ? Number(match[2]) : total - 1;
        return {
            start: start,
            end: end
        };
    }
}

http.createServer(function(request, response)
{
    var filename,
        uri = qs.unescape(url.parse(request.url).pathname);
    
    filename = path.join(dir, uri);
    
    if (uri.substr(0,4) === "/../" || uri.substr(0, 1) !== "/" || path.relative(dir, filename).substr(0, 3) === "../") {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }
    
    fs.stat(filename, function (err, stats)
    {
        var responseHeaders = {};
        var range;
        var streamOptions = {"bufferSize": 4096};
        var code = 200;
        
        if (!err && stats.isDirectory()) {
            filename += "/index.html";
        }
        
        fs.exists(filename, function(exists) {
            if (!exists) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }
            
            responseHeaders["Content-Type"] = get_mime(filename);
            responseHeaders["Content-Length"] = stats.size;
            responseHeaders["Accept-Ranges"] = "bytes";
            
            range = parse_range(request.headers, stats.size);
            
            if (range) {
                if (range.end <= range.start) {
                    /// Range not satisfiable.
                    response.writeHead(416);
                    response.end();
                    return;
                }
                streamOptions.start = range.start;
                streamOptions.end = range.end;
                responseHeaders["Content-Range"] = "bytes " + range.start + '-' + range.end + '/' + stats.size;
                code = 206;
            }
            
            response.writeHead(code, responseHeaders);
            
            /// Stream the data out to prevent massive buffers on large files.
            fs.createReadStream(filename, streamOptions).pipe(response);
        });
    });
}).listen(parseInt(port, 10));

console.log("http://localhost" + (port != 80 ? ":" + port : ""));
