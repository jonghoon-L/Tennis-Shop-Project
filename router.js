function route(pathname, handle, response, queryData) {
    console.log('pathname: ' + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, queryData); // queryData를 전달
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('Page Not Found.');
        response.end();
    }
}

exports.route = route;
