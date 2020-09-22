/**
 * Insert new catches and date into DB
 *
 * @param {Object} req request sent in by user to delete data
 * @param {Object} res response after query is completed
 * @param {Function} db database
 */
const updateData = (req, res, db) => {
  const { catches } = req.body; // Destructure catches

  db('dailydata')
    .returning('*')
    .insert({
      date: new Date(),
      catches: catches
    })
    .then((catches) => {
      res.json(catches[0]);
    })
    .catch((err) => res.status(400).json('Unable to update'));
};

module.exports = {
  updateData: updateData
};
