exports.login = {
    checkUser: `SELECT DNI AS dni, id_area AS area, id_cargo AS cargo
    FROM contrato WHERE dni = ?`,
}

exports.request = {
    getProduct: `SELECT id_item AS id, descripcion_item AS descripcion, um.abreviatura AS unidad_medida, item.precio AS precio
    FROM item INNER JOIN unidad_medida AS um
    ON item.id_unidad_medida = um.id_unidad_medida`,

    getMetas: `SELECT id_meta AS id, descripcion_meta AS descripcion FROM metas`,

    getAreas: `SELECT id_area AS id, nombre AS descripcion FROM area`,

    getIdRequest: `SELECT numero_solicitud FROM solicitud ORDER BY numero_solicitud DESC LIMIT 1`,

    getBossReq: `SELECT s.numero_solicitud, s.responsable, s.fecha_solicitud, m.descripcion_meta, sd.unidad, sd.cantidad_solicitado, sd.precio, i.descripcion_item
    FROM solicitud AS s
    INNER JOIN metas AS m ON s.id_meta = m.id_meta
    RIGHT JOIN solicitud_detalle AS sd ON s.numero_solicitud = sd.numero_solicitud
    INNER JOIN item as i ON sd.id_item = i.id_item
    WHERE s.autorizacion_jefe_area IS NULL`,

    getManagerReq: `SELECT s.numero_solicitud, s.responsable, s.fecha_solicitud, m.descripcion_meta, sd.unidad, sd.cantidad_solicitado, sd.precio, i.descripcion_item
    FROM solicitud AS s
    INNER JOIN metas AS m ON s.id_meta = m.id_meta
    RIGHT JOIN solicitud_detalle AS sd ON s.numero_solicitud = sd.numero_solicitud
    INNER JOIN item as i ON sd.id_item = i.id_item
    WHERE s.autorizacion_administracion IS NULL AND s.autorizacion_jefe_area = 1`,

    postRequest: `INSERT INTO solicitud (numero_solicitud, responsable, fecha_solicitud, id_meta)
    VALUES (?, ?, ?, ?)`,

    postRequestDesc: `INSERT INTO solicitud_detalle 
    (unidad, cantidad_solicitado, numero_solicitud, id_item, precio, cantidad_entregado)
    VALUES ?`,

    putBossReq: `UPDATE solicitud SET solicitud.autorizacion_jefe_area = 1 
    WHERE solicitud.numero_solicitud = ?`,
}

exports.orderBuy = {
    getOrderBuy: `SELECT * FROM orden_compra`
}