module.exports = {
    insertNewAdmin: `INSERT INTO admins (fullname, user_id, password, email) values ($1, $2, $3, $4)`,
    getAdminInfoByUserId: `SELECT admin_id, fullname, password FROM admins WHERE user_id = $1`,
    insertNewStore: `INSERT INTO stores (admin_id, name, address, phone, tax_rate) values ($1, $2, $3, $4, $5)`,

}