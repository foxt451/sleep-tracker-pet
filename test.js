(async () => {const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt();
console.log(salt);
const hash = await bcrypt.hash("sddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdddssjkkkkkkkkkkkkkkkkkkkkkkhjhjhjhjhjdd", salt) 
console.log(hash);
})();