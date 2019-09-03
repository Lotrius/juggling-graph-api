const getGraphData = (req, res, db) => {
    
    // Get average catches for each day
    db.select(db.raw('to_char(cast((date at time zone \'America/New_York\') as date),\'YYYY-MM-DD\'), avg(catches)')).from('dailydata')
        .groupBy(db.raw('to_char(cast((date at time zone \'America/New_York\') as date),\'YYYY-MM-DD\')'))
        .orderBy(db.raw('to_char(cast((date at time zone \'America/New_York\') as date),\'YYYY-MM-DD\')'))
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Error getting data'))
}

module.exports = {
    getGraphData: getGraphData
};