module.exports = {
    insertNewAdmin: `INSERT INTO admins (fullname, user_id, password, email) values ($1, $2, $3, $4)`,
    getAdminPassword: `SELECT password FROM admins WHERE user_id = $1`,
}