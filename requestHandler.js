const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        if (err) {
            console.error("Database query error: ", err);
        } else {
            console.log(rows);
        }
    });

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main_view);
    response.end();
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(data);
        }
        response.end();
    });
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(data);
        }
        response.end();
    });
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(data);
        }
        response.end();
    });
}

function order(response, queryData) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    const productId = queryData.productId;
    const date = new Date().toLocaleDateString();

    if (!productId) {
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write('400 Bad Request: Missing productId');
        response.end();
        return;
    }

    const query = `INSERT INTO orderlist (product_id, order_date) VALUES (?, ?)`;

    mariadb.query(query, [productId, date], function(err, rows) {
        if (err) {
            console.error("Database query error: ", err);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write('500 Internal Server Error');
        } else {
            console.log(rows);
            response.write('Order placed successfully');
        }
        response.end();
    });
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;
