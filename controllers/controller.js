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

exports.viewWarehouseReq = (req, res) => {
    const query = queries.request.getWarehouseReq;

    connection.query(query, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error get' });
        return res.render('warehouse/req_warehouse', { data })
    })
}

exports.viewWarehouseOrd = (req, res) => {
    const query = queries.orderBuy.getWarehouseOrd;

    connection.query(query, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error get' });
        return res.render('warehouse/ord_warehouse', { data })
    })
}

exports.updatedFinalReq = (req, res) => {
    /* LOGICA ACUALIZAR, CREAR UNICA PECOSA, ACTUALIZAR RESTO PRODUCTOS SOBRE ELLA */
}

exports.updatedFinalOrd = (req, res) => {
    /* LOGICA ACUALIZAR, CREAR UNICA FACTURA, ACTUALIZAR RESTO PRODUCTOS SOBRE ELLA */
}