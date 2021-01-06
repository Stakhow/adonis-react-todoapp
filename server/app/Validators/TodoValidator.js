class TodoValidator {
  get rules() {
    return {
      body: 'required|min:3|max:300',
    };
  }

  get sanitizationRules() {
    return {
      body: 'strip_tags',
    };
  }

  async fails(message) {
    return this.ctx.response.status(422).json(...message);
  }
}

module.exports = TodoValidator;
