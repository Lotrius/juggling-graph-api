/**
 * Get average catches for each day
 *
 * @param {Object} req request sent in by user to delete data
 * @param {Object} res response after query is completed
 * @param {Function} db database
 */
const getGraphData = (req, res, db) => {
  // Month selected by user
  const { selectedMonth } = req.body;

  db.select(
    db.raw(
      "to_char(cast((date at time zone 'America/New_York') as date),'YYYY-MM-DD'), avg(catches)"
    )
  )
    .from('dailydata')
    .where(
      db.raw(
        "to_char(cast((date at time zone 'America/New_York') as date),'YYYY-MM-DD')"
      ),
      'like',
      selectedMonth + '%'
    )
    .groupBy(
      db.raw(
        "to_char(cast((date at time zone 'America/New_York') as date),'YYYY-MM-DD')"
      )
    )
    .orderBy(
      db.raw(
        "to_char(cast((date at time zone 'America/New_York') as date),'YYYY-MM-DD')"
      )
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Error getting average data'));
};

module.exports = {
  getGraphData: getGraphData
};
