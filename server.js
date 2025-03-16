const app = require('./src/app');
const { port } = require('./src/config/env');

const publicIp = require('public-ip');

(async () => {
  console.log("Public IPv4:", await publicIp.publicIpv4());
  console.log("Public IPv6:", await publicIp.publicIpv6());
})();

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
