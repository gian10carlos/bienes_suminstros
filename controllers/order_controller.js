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
    const data = await req.body;

    console.log(data)

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
}

