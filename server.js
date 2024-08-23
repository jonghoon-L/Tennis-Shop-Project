const http = require('http');
const url = require('url');

function start(route, handle) {
    function OnRequest(request, response) {
        const baseURL = `http://${request.headers.host}`;

        if (!request.url) {
            console.error('Invalid request.url:', request.url);
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.write('400 Bad Request');
            response.end();
            return;
        }

        let reqUrl;
        try {
            reqUrl = new URL(request.url, baseURL);
        } catch (error) {
            console.error('URL Parsing Error:', error.message);
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.write('400 Bad Request');
            response.end();
            return;
        }

        let pathname = reqUrl.pathname;
        let queryData = Object.fromEntries(reqUrl.searchParams.entries());

        console.log(`Request for ${pathname} received with query data:`, queryData);

        if (typeof route === 'function') {
            route(pathname, handle, response, queryData);
        } else {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
            response.end();
        }
    }

    http.createServer(OnRequest).listen(8888, () => {
        console.log('Server is listening on port 8888');
    });
}

exports.start = start;
