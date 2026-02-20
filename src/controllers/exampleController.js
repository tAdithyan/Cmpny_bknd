exports.getExamples = (req, res) => {
    res.status(200).json({
        message: 'Success',
        data: ['Example 1', 'Example 2', 'Example 3']
    });
};

exports.createExample = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        });
    }

    res.status(201).json({
        message: 'Example created',
        data: {
            id: Math.floor(Math.random() * 1000),
            name
        }
    });
};
