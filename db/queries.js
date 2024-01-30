module.exports = {
    insertNewAdmin: `INSERT INTO admins (fullname, user_id, password, email) values ($1, $2, $3, $4)`,
    getAdminInfoByUserId: `SELECT admin_id, fullname, password FROM admins WHERE user_id = $1`,
    create_store: `INSERT INTO stores (admin_id, name, address, phone, tax_rate) values ($1, $2, $3, $4, $5)`,
    delete_store: `DELETE FROM stores WHERE admin_id = $1 AND store_id = $2`,
    update_store: `UPDATE stores SET name = $3, phone = $4, address = $5, tax = $6 WHERE admin_id = $1 AND store_id = $2`,
    get_all_stores: `SELECT * FROM stores WHERE admin_id = $1`
}