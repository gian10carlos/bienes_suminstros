const connection = require('../db/connection');
const queries = require('../db/queries')

exports.viewCheckLogistic = (req, res) => {
    const queryR = queries.orderBuy.getLogistOrd;
    const queryP = queries.orderBuy.getProvOrd;

    connection.query(queryR, (err, dataR) => {
        if (err) return res.status(500).send('Error Request');

        connection.query(queryP, (err, dataP) => {
            if (err) return res.status(500).send('Error Request');

            const agruparPorSolicitud = (data) => {
                const agrupado = data.reduce((acc, item) => {
                    const { num_sol, id_item, descripcion_item, abreviatura, precio, cantidad_solicitado } = item;

                    if (!acc[num_sol]) {
                        acc[num_sol] = {
                            num_sol,
                            items: []
                        };
                    }

                    acc[num_sol].items.push({
                        id_item,
                        descripcion_item,
                        abreviatura,
                        precio,
                        cantidad_solicitado
                    });

                    return acc;
                }, {});

                return Object.values(agrupado);
            };

            const dataRAgrupada = agruparPorSolicitud(dataR);
            return res.status(200).render('logistics/logistics', { dataR: dataRAgrupada, dataP });
        });
    });
};


exports.saveOrderBuy = async (req, res) => {
    const dataForm = await req.body;

    const idQuery = queries.orderBuy.getEndId;
    const itemsQuery = queries.orderBuy.getItemsOrd;
    const ocQuery = queries.orderBuy.postLogistOrd;
    const ocdQuery = queries.orderBuy.postLogistOrD;

    connection.getConnection((err, conn) => {
        if (err) { return res.status(500).json({ message: 'Error DB connection' + err }); }

        conn.beginTransaction((err) => {
            if (err) { conn.release(); return res.status(500).json({ message: 'Error transaction' + err }); }

            conn.query(idQuery, (err, id_oc_stg) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        res.status(500).json({ message: 'Error getting request' + err });
                    })
                }

                const id_oc = parseInt(id_oc_stg[0].id_oc.substring(2));
                var orderId = 0;

                if (id_oc < 9) {
                    orderId = `OC00${id_oc + 1}`
                } else if (id_oc >= 9 && id_oc < 100) {
                    orderId = `OC0${id_oc + 1}`
                } else {
                    orderId = `OC${id_oc + 1}`
                }

                conn.query(itemsQuery, [dataForm.num_sol], (err, dataItems) => {
                    if (err) {
                        return conn.rollback(() => {
                            conn.release();
                            res.status(500).json({ message: 'Error posting description: ' + err });
                        });
                    }

                    const groupedData = dataItems.reduce((acc, item) => {
                        const { numero_solicitud, ...rest } = item;
                        if (!acc[numero_solicitud]) {
                            acc[numero_solicitud] = {
                                numero_solicitud,
                                items: []
                            };
                        }
                        acc[numero_solicitud].items.push(rest);
                        return acc;
                    }, {});

                    const finalData = Object.values(groupedData);
                    const dataProducts = finalData[0].items;

                    const data = {
                        num_oc: orderId,
                        date: new Date(),
                        date_entr: dataForm.date_entr,
                        ruc: dataForm.proveedor,
                        dataProducts
                    }

                    conn.query(ocQuery, [data.num_oc, data.date, data.date_entr, data.ruc], (err) => {
                        if (err) {
                            return conn.rollback(() => {
                                conn.release();
                                res.status(500).json({ message: 'Commit Error' + err });
                            })
                        }

                        const ocDescription = data.dataProducts.map(item => [item.unidad, item.cantidad_solicitado, item.precio, data.num_oc, item.id_item])

                        conn.query(ocdQuery, [ocDescription], (err, results) => {
                            if (err) {
                                return conn.rollback(() => {
                                    conn.release();
                                    res.status(500).json({ message: 'Commit Error' + err });
                                })
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
        })
    })
}

exports.viewCheckManager = (req, res) => {
    const queryO = queries.orderBuy.getOrderBuy;
    connection.query(queryO, (err, result) => {
        if (err) return res.status(500).send('Error Request');

        return res.status(200).render('administration/ord_manager', { data: result })
    })
}

exports.updateCheckManagerOrder = async (req, res) => {
    const id = await req.body;
    const query = queries.orderBuy.putManagerOrd;

    connection.query(query, [id.orderId], (err) => {
        if (err) return res.status(500).send('Error Request');
        return res.status(200).json({ message: 'Successful updated' })
    })
}