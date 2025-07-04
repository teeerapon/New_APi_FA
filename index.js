'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./middleware/logger');

const PTEC_USERSRIGHT_Routes = require('./routes/PTEC_USERSRIGHT_Routes');
const PTEC_FA_Routes = require('./routes/PTEC_FA_Rotes');
const PTEC_FA_PERIOD_Routes = require('./routes/PTEC_FA_PERIOD_Routes');
const TEST_PDPA_Routes = require('./routes/TEST_PDPA_Routes');
const TEST_NewNTI_Routes = require('./routes/TEST_NewNTI_Routes');
const PTEC_OPS_Mobile = require('./routes/PTEC_OPS_Mobile_Routes');
const SmartBill = require('./routes/PTEC_SMART_BILL_Routes');

const app = express();

const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(cors(corsConfig));

app.use('/NEW_NAC',cors(corsConfig),express.static('D:/files/NEW_NAC'));
app.use('/smartBill', cors(corsConfig), express.static('D:/files/smartBill'));
app.use('/files', cors(corsConfig), express.static('D:/files'));

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());
app.set('trust proxy', true);


app.use('/api', PTEC_USERSRIGHT_Routes.routes);
app.use('/api', PTEC_FA_Routes.routes);
app.use('/api', PTEC_FA_PERIOD_Routes.routes);
app.use('/api', TEST_PDPA_Routes.routes);
app.use('/api', TEST_NewNTI_Routes.routes);
app.use('/api', PTEC_OPS_Mobile.routes);
app.use('/api', SmartBill.routes);

app.get('/', (req, res) => {
    res.send('? Node.js is working via IIS Reverse Proxy');
});


app.listen(config.PTEC.port, () =>
    console.log(`Server is listening on http://localhost:${config.PTEC.port}`)
);
