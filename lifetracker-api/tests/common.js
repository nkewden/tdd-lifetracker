const db = require("../db.js")

async function commonBeforeAll() {
    // delete all current test data
    await db.query(`DELETE FROM`)
    await db.query(`DELETE FROM`)
    await db.query(`DELETE FROM`)
  }
  
  async function commonBeforeEach() {
    await db.query("BEGIN")
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK")
  }
  
  async function commonAfterAll() {
    await db.end()
  }
  
  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  }