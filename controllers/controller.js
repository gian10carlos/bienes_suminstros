const connection = require('../db/connection');
const queries = require('../db/queries')

exports.viewLogin = (req, res) => {
    return res.render('login/login')
}

/**
 * USER: 12345678 : admin
 * USER: 87654321 : logistic
 * USER: 12345677 : warehouse
 * USER: 12345666 : request
 * USER: 12345555 : boss-area
 */

exports.checkUser = (req, res) => {
    const { username, password } = req.body;

    const query = queries.login.checkUser;
    connection.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).send('Error check user');

        if (results.length > 0) {

            results = results[0];
            switch (results.area) {
                // ADMIN
                case 1: return res.redirect('/request/validate/manager');
                // LOGISTIC
                case 2: return res.redirect('/order/create/logistic');
                // WAREHOUSE
                case 3: return res.redirect('/request/final/warehouse');
                // AREAS
                case 5: return (results.cargo == 2) ? res.redirect('/request') : res.redirect('/request/validate/boss');

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

exports.updatedFinalReq = async (req, res) => {
    const dataForm = await req.body;

    const pecExistQuery = queries.request.getExistPec;
    const pecQuery = queries.request.getEndPec;
    const sUpQuery = queries.request.putFinalReq;
    const sdUpdQuery = queries.request.putFinalSdReq;

    connection.query(pecExistQuery, [dataForm.num_req], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error Internal' });

        if (result[0].val == 0) {
            connection.query(pecQuery, (err, id_pc) => {
                if (err) return res.status(500).json({ message: 'Error Internal' });
                const id = parseInt(id_pc[0].id.substring(1))
                var reqId = ``;

                if (id < 9) {
                    reqId = `P00${id + 1}`
                } else if (id >= 9 && id < 100) {
                    reqId = `P0${id + 1}`
                } else {
                    reqId = `P${id + 1}`
                }

                const date = new Date();

                connection.query(sUpQuery, [reqId, date, dataForm.num_req], (err) => {
                    if (err) return res.status(500).json({ message: 'Error Internal' });
                    result = 1;
                })
            })
        } else if (result[0].val == 1) {
            connection.query(sdUpdQuery, [dataForm.amount_req, dataForm.id_item, dataForm.num_req], (err) => {
                if (err) return res.status(500).json({ message: 'Error Internal' });
                return res.status(200).json({ message: 'Successful updated' })
            })
        }
    })
}

exports.updatedFinalOrd = async (req, res) => {
    const dataForm = await req.body;

    const factExQuery = queries.orderBuy.getExistFactOrd;
    const factQuery = queries.orderBuy.getEndFactOrd;
    const ocUpQuery = queries.orderBuy.putOcFinalOrd;
    const ocdUpQuery = queries.orderBuy.putOcdFinalOrd;

    connection.query(factExQuery, [dataForm.num_ord], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error Internal' });

        if (result[0].val == 0) {
            connection.query(factQuery, (err, id_pc) => {
                if (err) return res.status(500).json({ message: 'Error Internal' });
                const id = parseInt(id_pc[0].id.substring(1))
                var reqId = ``;

                if (id < 9) {
                    reqId = `F00${id + 1}`
                } else if (id >= 9 && id < 100) {
                    reqId = `F0${id + 1}`
                } else {
                    reqId = `F${id + 1}`
                }

                const date = new Date();

                connection.query(ocUpQuery, [date, reqId, dataForm.num_ord], (err, rr) => {
                    if (err) return res.status(500).json({ message: 'Error Internal' });
                    result = 1;
                })
            })
        } else if (result[0].val == 1) {
            connection.query(ocdUpQuery, [dataForm.amount_ord, dataForm.num_ord, dataForm.id_item], (err) => {
                if (err) return res.status(500).json({ message: 'Error Internal' });
                return res.status(200).json({ message: 'Successful updated' })
            })
        }
    })
}