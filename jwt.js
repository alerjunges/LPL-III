const jwt = require("jsonwebtoken");
const fs = require('fs');

const payload = { userId: 123, permissions: ["read", "write"]};

const privateKey = fs.readFileSync("./private_key.pem");

const publictKey = fs.readFileSync("./public_key.pem");
// const token = jwt.sign(payload, privateKey, { algorithm: "RS256"})
// console.log(token)

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicGVybWlzc2lvbnMiOlsicmVhZCIsIndyaXRlIl0sImlhdCI6MTcxMTA2NjkzOH0.UFsBH-IxEeOEkTwKF5AlIco_PfnMdpnxDsj18A1upEIvEopfj-wvbppsSJlv96CxxLEEJsGSTe3-HFB-9oyEpo4X2grA-DZ8WAOB-UcKJu9YhnUajt06PR4l6iUIkK7jCS6YDfvGNGFByi5UJBM4DEUeh8HIf0Y4Ub3G_-3yLKTshVWXFpUSzap8Apw38HrgxDREgGq776ZuYN8ThhaXoUbipSmSkfvCiUTpQJDBOVngng8ZzgSFf5onBXJwwkHbxwThOI6AMNKMwLH_VIP038K1kKib8Fme0_icLECQtHrQHsyE8xMi19sWUCn5a9-tB60BefWuKIlBxvL_5cRqcg'

try {
    const decoded = jwt.verify(token, publictKey, { algorithms: ["RS256"]});
    console.log("Decoded", decoded)
} catch (err) {
    console.error("Verification failed", err)
}