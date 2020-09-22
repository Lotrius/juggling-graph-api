/**
 * Get and validate sign in information
 *
 * @param {Object} req request sent in by user to delete data
 * @param {Object} res response after query is completed
 * @param {Function} db database
 * @param {*} bcrypt
 */
const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  // Back end should do its own validation. Don't trust front end
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return res.json('success');
      } else {
        res.status(400).json('Wrong credentials');
      }
    })
    .catch((err) => res.status(400).json('Wrong credentials'));
};

module.exports = {
  handleSignIn: handleSignIn
};
