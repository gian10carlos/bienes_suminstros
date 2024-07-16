const connection = require('../db/connection');
const queries = require('../db/queries')

exports.saveRequest = async (req, res) => {
    const data = await req.body;

    const requestParams = [
        data.number,
        data.responsable,
        data.date,
        data.meta,
    ];

    const requestQuery = queries.request.postRequest;
    const requestDescQuery = queries.request.postRequestDesc;

    connection.getConnection((err, conn) => {
        if (err) { return res.status(500).json({ message: 'Error DB connection' + err }); }

        conn.beginTransaction((err) => {
            if (err) { conn.release(); return res.status(500).json({ message: 'Error transaction' + err }); }

            conn.query(requestQuery, [requestParams[0], requestParams[1], requestParams[2], requestParams[3]], (err) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        res.status(500).json({ message: 'Error getting request' + err });
                    })
                }

                productsArray = data.products;
                const descriptionVal = productsArray.map(item => [item.unidMed, item.cantidad, requestParams[0], item.id, item.valUnit, null])

                console.log(descriptionVal)

                conn.query(requestDescQuery, [descriptionVal], (err) => {
                    if (err) {
                        return conn.rollback(() => {
                            conn.release();
                            res.status(500).json({ message: 'Error posting description: ' + err });
                        });
                    }

                    conn.commit((err) => {
                        if (err) {
                            return conn.rollback(() => {
                                conn.release();
                                res.status(500).json({ message: 'Commit Error: ' + err });
                            });
                        }

                        conn.release();
                        return res.status(200).json({ message: 'Successful register order' })
                    })
                })
            })
        })
    })
};

exports.viewRequest = (req, res) => {
    const queryP = queries.request.getProduct;
    const queryM = queries.request.getMetas;
    const queryA = queries.request.getAreas;
    const queryI = queries.request.getIdRequest;

    connection.query(queryP, (err, resultP) => {
        if (err) return res.status(500).send('Error Request');
        connection.query(queryM, (err, resultM) => {
            if (err) return res.status(500).send('Error Request');
            connection.query(queryA, (err, resultA) => {
                if (err) return res.status(500).send('Error Request');

                connection.query(queryI, (err, resultI) => {
                    if (err) return res.status(500).send('Error Request');
                    let numberId = parseInt(resultI[0].numero_solicitud.substring(2));

                    return res.render('userdepart/request', { resultP, resultM, resultA, numberId });
                })
            })
        })
    })
}

exports.viewCheckBossRequest = (req, res) => {
    const query = queries.request.getBossReq;

    connection.query(query, (err, data) => {
        if (err) return res.status(500).send('Error Request');

        const combinedData = combineData(data);
        return res.status(200).render('userdepart/check_boss', { data: combinedData })
    })
}

exports.viewCheckManagerRequest = (req, res) => {
    const queryR = queries.request.getManagerReq;

    connection.query(queryR, (err, dataR) => {
        if (err) return res.status(500).send('Error Request');

        const combinedData = combineData(dataR);
        return res.status(200).render('administration/req_manager', { data: combinedData })
    })
}

exports.updatedCheckBossRequest = async (req, res) => {
    const id = await req.body;
    const query = queries.request.putBossReq;

    connection.query(query, [id.requestId], (err) => {
        if (err) return res.status(500).send('Error Request');
        return res.status(200).json({ message: 'Successful updated' })
    })
}

exports.updateCheckManagerOrder = async (req, res) => {
    const id = await req.body;
    const date = new Date();
    const query = queries.request.putManagerReq;

    connection.query(query, [date, id.requestId], (err, r) => {
        if (err) return res.status(500).send('Error Request');
        return res.status(200).json({ message: 'Successful updated' })
    })
}

function combineData(data) {
    let combinedResult = {};

    data.forEach(row => {
        let clave = row.numero_solicitud;

        if (combinedResult[clave]) {
            combinedResult[clave].items.push({
                unidad: row.unidad,
                cantidad_solicitado: row.cantidad_solicitado,
                precio: row.precio,
                descripcion_item: row.descripcion_item
            });
        } else {
            combinedResult[clave] = {
                numero_solicitud: row.numero_solicitud,
                responsable: row.responsable,
                fecha_solicitud: row.fecha_solicitud,
                descripcion_meta: row.descripcion_meta,
                items: [{
                    unidad: row.unidad,
                    cantidad_solicitado: row.cantidad_solicitado,
                    precio: row.precio,
                    descripcion_item: row.descripcion_item
                }]
            };
        }
    });

    let combinedArray = Object.values(combinedResult);

    return combinedArray;
}