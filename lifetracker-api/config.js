require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev"
const IS_TESTING = process.env.NODE_ENV === "test"

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "nasradin"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "nasradin"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbProdName = process.env.DATABASE_NAME || "lifetracker"
    const dbTestName = process.env.DATABASE_TEST_NAME|| "lifetracker_test"
    const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR = 13

console.log("lifetracker".green)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("---")

module.exports = {
  PORT,
  SECRET_KEY,
  IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}
