exports.login = {
    checkUser: `SELECT DNI AS dni, id_area AS area, id_cargo AS cargo
    FROM contrato WHERE dni = ? AND dni = ?`,
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

    getWarehouseReq: `SELECT s.numero_solicitud AS num_sol, i.id_item,i.descripcion_item, um.abreviatura, i.precio, sd.cantidad_solicitado
    FROM solicitud AS s
    RIGHT JOIN solicitud_detalle AS sd
    ON s.numero_solicitud = sd.numero_solicitud
    INNER JOIN item AS i ON sd.id_item = i.id_item
    INNER JOIN unidad_medida AS um ON i.id_unidad_medida = um.id_unidad_medida
    WHERE s.autorizacion_administracion = 1 AND s.autorizacion_jefe_area = 1 AND sd.cantidad_entregado IS NULL
    ORDER BY s.numero_solicitud ASC`,

    getExistPec: `SELECT CASE WHEN s.numero_pecosa IS NULL THEN 0 ELSE 1 END AS val 
    FROM solicitud AS s WHERE s.numero_solicitud = ?`,

    getEndPec: `SELECT s.numero_pecosa AS id FROM solicitud AS s ORDER BY s.numero_pecosa DESC LIMIT 1`,

    postRequest: `INSERT INTO solicitud (numero_solicitud, responsable, fecha_solicitud, id_meta)
    VALUES (?, ?, ?, ?)`,

    postRequestDesc: `INSERT INTO solicitud_detalle 
    (unidad, cantidad_solicitado, numero_solicitud, id_item, precio, cantidad_entregado)
    VALUES ?`,

    putBossReq: `UPDATE solicitud SET solicitud.autorizacion_jefe_area = 1 
    WHERE solicitud.numero_solicitud = ?`,

    putManagerReq: `UPDATE solicitud SET solicitud.autorizacion_administracion = 1, solicitud.fecha_salida = ? 
    WHERE solicitud.numero_solicitud = ?`,

    putFinalReq: `UPDATE solicitud AS s SET s.numero_pecosa = ?, s.fecha_entrega = ? WHERE s.numero_solicitud = ?  AND s.autorizacion_administracion = 1`,

    putFinalSdReq: `UPDATE solicitud_detalle AS sd SET sd.cantidad_entregado = ? WHERE sd.id_item = ? AND sd.numero_solicitud = ?`,
}

exports.orderBuy = {
    getLogistOrd: `SELECT s.numero_solicitud AS num_sol, i.id_item, i.descripcion_item, um.abreviatura, i.precio, sd.cantidad_solicitado
    FROM solicitud AS s
    RIGHT JOIN solicitud_detalle AS sd
    ON s.numero_solicitud = sd.numero_solicitud
    INNER JOIN item AS i ON sd.id_item = i.id_item
    INNER JOIN unidad_medida AS um ON i.id_unidad_medida = um.id_unidad_medida
    WHERE s.autorizacion_administracion = 1 AND s.autorizacion_jefe_area = 1
    ORDER BY s.numero_solicitud ASC`,

    getOrderBuy: `SELECT * FROM orden_compra AS oc WHERE oc.autoriza_administracion IS NULL`,

    getProvOrd: `SELECT p.RUC AS ruc, p.nombre_proveedor as nombre FROM proveedor AS p`,

    getEndId: `SELECT oc.numero_orden_compra AS id_oc
    FROM orden_compra AS oc
    ORDER BY oc.numero_orden_compra DESC LIMIT 1`,

    getItemsOrd: `SELECT s.numero_solicitud, sd.unidad, i.id_item, sd.cantidad_solicitado, sd.precio
    FROM solicitud AS s
    RIGHT JOIN solicitud_detalle AS sd ON sd.numero_solicitud = s.numero_solicitud
    INNER JOIN item AS i ON i.id_item = sd.id_item
    WHERE s.numero_solicitud = ?`,

    getWarehouseOrd: `SELECT oc.numero_orden_compra AS num_oc, i.id_item, i.descripcion_item AS descr, um.abreviatura AS abrev, ocd.precio AS price, ocd.cantidad_solicitado AS amount_req
    FROM orden_compra AS oc 
    RIGHT JOIN orden_compra_detalle AS ocd ON oc.numero_orden_compra = ocd.numero_orden_compra 
    INNER JOIN item AS i ON i.id_item = ocd.id_item 
    INNER JOIN unidad_medida AS um ON um.id_unidad_medida = i.id_unidad_medida 
    WHERE oc.autoriza_administracion = 1 AND ocd.cantidad_entregado IS NULL`,

    getExistFactOrd: `SELECT CASE WHEN oc.numero_facura_entrega IS NULL THEN 0 ELSE 1 END AS val FROM orden_compra AS oc WHERE oc.numero_orden_compra=?`,

    getEndFactOrd: `SELECT oc.numero_facura_entrega AS id FROM orden_compra AS oc GROUP BY oc.numero_facura_entrega DESC LIMIT 1`,

    postLogistOrd: `INSERT INTO orden_compra (numero_orden_compra, fecha_orden_compra, fecha_entrega, RUC) 
    VALUES (?,?,?,?)`,

    postLogistOrD: `INSERT INTO orden_compra_detalle(unidad, cantidad_solicitado, precio, numero_orden_compra, id_item) 
    VALUES ?`,

    putManagerOrd: `UPDATE orden_compra AS oc SET oc.autoriza_administracion = 1 
    WHERE oc.numero_orden_compra = ?`,

    putOcFinalOrd: `UPDATE orden_compra AS oc SET oc.fecha_entregado = ?, oc.numero_facura_entrega = ? WHERE oc.numero_orden_compra = ? AND oc.autoriza_administracion = 1`,

    putOcdFinalOrd: `UPDATE orden_compra_detalle AS ocd SET ocd.cantidad_entregado = ? WHERE ocd.numero_orden_compra = ? AND ocd.id_item = ?`,
}