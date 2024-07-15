const connection = require('../db/connection');
const queries = require('../db/queries')

exports.viewLogin = (req, res) => {
    return res.render('login/login')
}

exports.checkUser = (req, res) => {
    const { username, password } = req.body;

    const query = queries.login.checkUser;
    connection.query(query, [username], (err, results) => {
        if (err) return res.status(500).send('Error check user');

        if (results.length > 0) {

            results = results[0];
            switch (results.area) {
                case 1: return res.redirect('/request'); break;
                case 2: return res.render('asset/asset'); break;
                case 3: return res.render('logistics/logistics'); break;
                case 4: return res.render('userdepart/userdepart'); break;
                case 5: return res.render('warehouse/warehouse'); break;

                default:
                    console.log('Not found departament')
                    break;
            }
        }
    })
}

exports.viewAsset = (req, res) => {
    console.log('From asset')
    return res.render('asset/asset')
}

exports.viewLogistics = (req, res) => {
    console.log('From Logistics')
    return res.render('logistics/logistics')
}

exports.viewUserdepart = (req, res) => {
    console.log('From userdepart')
    return res.render('userdepart/userdepart')
}

exports.viewWarehouse = (req, res) => {
    console.log('From warehouse')
    return res.render('warehouse/warehouse')
}