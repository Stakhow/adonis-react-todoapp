/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TodosSchema extends Schema {
  up() {
    this.create('todos', table => {
      table.increments();
      table.integer('user_id').notNullable();
      table.string('body', 300).notNullable();
      table.boolean('completed').default(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('todos');
  }
}

module.exports = TodosSchema;
