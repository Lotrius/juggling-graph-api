const updateData = (req, res, db) => {
    const { catches } = req.body; // Destructure catches

    // Insert data into db
    db('dailydata')
        .returning('*')
        .insert({
            date: new Date(),
            catches: catches
        })
        .then(catches => {
            res.json(catches[0]);
        })
        .catch(err => res.status(400).json('Unable to update'));
}

module.exports = {
    updateData: updateData
};