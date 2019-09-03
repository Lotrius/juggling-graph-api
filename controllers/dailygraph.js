const getGraphData = (req, res, db) => {
    const { newDate } = req.body;

    db.select('catches').from('dailydata')
        .where(db.raw('to_char(date, \'YYYY-MM-DD\')'), 'like', newDate + '%')
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Error getting data'))
}

module.exports = {
    getGraphData: getGraphData
};