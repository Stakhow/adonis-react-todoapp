const Todo = use('App/Models/Todo');

class TodoController {
  async index({ auth, response }) {
    try {
      if (await auth.check()) {
        const todos = await Todo.query()
          .where('user_id', auth.user.id)
          .orderBy('created_at', 'desc')
          // .offset(1)
          // .limit(3)
          .fetch();

        const total = await Todo.query().where('user_id', auth.user.id).count();

        response.status(200).json({ status: 200, todos, total });
      }
    } catch (e) {
      response
        .status(401)
        .json({ status: 401, error: true, message: e.message });
    }

    return response;
  }

  async create({ request, auth, response }) {
    try {
      const todo = await Todo.create({
        user_id: auth.user.id,
        body: request.input('body'),
        completed: false,
      });

      response.status(201).json({ status: 201, todo });
    } catch (e) {
      response
        .status(400)
        .json({ status: 400, error: true, message: e.message });
    }

    return response;
  }

  async update({ request, auth, response }) {
    try {
      const todo = await Todo.query()
        .where({ user_id: auth.user.id, id: request.params.id })
        .update({
          body: request.input('body'),
          completed: request.input('completed'),
        })
        .returning('*');

      response.status(200).json({ status: 200, todo: todo[0] });
    } catch (e) {
      response
        .status(400)
        .json({ status: 400, error: true, message: e.message });
    }

    return response;
  }

  async delete({ request, auth, response }) {
    try {
      const { id } = request.params;
      await Todo.query().where({ user_id: auth.user.id, id }).delete();

      response.status(202).json({ status: 202, id });
    } catch (e) {
      response
        .status(404)
        .json({ status: 404, error: true, message: e.message });
    }

    return response;
  }
}

module.exports = TodoController;
