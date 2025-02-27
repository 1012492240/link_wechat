const http = require('http');
const https = require('https');
const querystring = require('querystring');

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/get-token') {
        // 定义微信 API 的请求参数
        const params = querystring.stringify({
            grant_type: 'client_credential',
            appid: 'wxb0347b3e0743b0eb',
            secret: '392dae7139f618cc25784c70151169c4'
        });

        // 请求的微信 API 地址
        const url = `https://api.weixin.qq.com/cgi-bin/token?${params}`;

        // 发起 HTTPS 请求
        https.get(url, (apiRes) => {
            let data = '';

            // 接收响应数据
            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            // 响应结束时处理数据
            apiRes.on('end', () => {
                try {
                    // 返回微信 API 的响应数据
                    const jsonResponse = JSON.parse(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(jsonResponse));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Failed to parse response data');
                }
            });
        }).on('error', (e) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching token');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// 启动服务器
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
