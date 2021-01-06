/*
|--------------------------------------------------------------------------
| TodoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
/* eslint-disable-next-line no-unused-vars */
use('Factory');
const Database = use('Database');

class TodoSeeder {
  async run() {
    return Database.table('todos');
  }
}

module.exports = TodoSeeder;
