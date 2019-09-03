const getGraphData = (req, res, db) => {
    const { newDate } = req.body; // Day to be displayed

    // Get number of catches for a given day
    db.select('catches').from('dailydata')
        .where(db.raw('to_char(cast((date at time zone \'America/New_York\') as date),\'YYYY-MM-DD\')'), 'like', newDate + '%')
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Error getting data'))
        
}

module.exports = {
    getGraphData: getGraphData
};