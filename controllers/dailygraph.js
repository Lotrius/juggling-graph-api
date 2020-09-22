/**
 * Get number of catches for a given day
 *
 * @param {Object} req request sent in by user to delete data
 * @param {Object} res response after query is completed
 * @param {Function} db database
 */
const getGraphData = (req, res, db) => {
  // Day to be displayed
  const { newDate } = req.body;

  db.select('catches')
    .from('dailydata')
    .where(
      db.raw(
        "to_char(cast((date at time zone 'America/New_York') as date),'YYYY-MM-DD')"
      ),
      'like',
      newDate + '%'
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Error getting data'));
};

module.exports = {
  getGraphData: getGraphData
};
