class UserValidator {
  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:5|max:40',
    };
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email|strip_tags',
      password: 'strip_tags',
    };
  }

  async fails(message) {
    return this.ctx.response.status(422).json(...message);
  }
}

module.exports = UserValidator;
