const User = use('App/Models/User');

class UserController {
  async loginStore({ request, auth, response }) {
    const { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email);
        const token = await auth.withRefreshToken().generate(user);

        response.status(200).json({ user, token });
      }
    } catch (e) {
      response
        .status(401)
        .json({ status: 401, error: true, message: e.message });
    }

    return response;
  }

  async logoutStore({ request, auth, response }) {
    try {
      await auth
        .authenticator('jwt')
        .revokeTokens([request.input('refresh_token')]);

      response.status(200).json({ status: 200, message: 'success' });
    } catch (e) {
      response.status(401).json({ status: 401, message: 'not authorized' });
    }

    return response;
  }

  async userStore({ request, auth, response }) {
    const { email, password } = request.all();
    try {
      const user = await User.create({ email, password });
      const token = await auth.withRefreshToken().generate(user);

      response.status(201).json({ status: 201, user, token });
    } catch (e) {
      response.status(409).json({
        status: 409,
        error: true,
        message: `Sorry, ${email} email already exists`,
      });
    }
    return response;
  }

  async show({ auth, params }) {
    if ((await auth.user.id) !== Number(params.id)) {
      return "You cannot see someone else's profile";
    }
    return auth.user;
  }

  async getUser({ auth, response }) {
    const user = await auth.getUser();

    return response.json(user);
  }

  async refreshToken({ request, auth, response }) {
    return response.json(
      await auth.generateForRefreshToken(request.input('refresh_token')),
    );
  }
}

module.exports = UserController;
