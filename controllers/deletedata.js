/**
 * Delete latest entry in database
 *
 * @param {Object} req request sent in by user to delete data
 * @param {Object} res response after query is completed
 * @param {Function} db database
 */
const handledelete = (req, res, db) => {
  //   db.select('*')
  //     .from('dailydata')
  //     .where('id', '=', function () {
  //       this.max('id').from('dailydata');
  //     })
  //     .del()
  //     .then((r) => res.json('Deleted ' + r + ' row'))
  //     .catch((err) => res.status(400).json('Could not delete row'));

  // It's pretty much a completely static function anyway might
  // as well make it easy to understand
  db.raw('delete from dailydata where id in (select max(id) from dailydata)')
    .then((r) => res.json('Deleted ' + r.rowCount + ' row'))
    .catch((err) => res.status(400).json('Could not delete row'));
};

module.exports = {
  handledelete: handledelete
};
