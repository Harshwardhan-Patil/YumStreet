import bcrypt from 'bcrypt';

class Password {
  static async #genSalt(saltRounds) {
    return bcrypt.genSalt(saltRounds);
  }

  static async hash(password) {
    const saltRounds = 10;
    const genSalt = await this.#genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    return hashedPassword;
  }

  static async compare(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default Password;
