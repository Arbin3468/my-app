const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (code.length !== 6 || code[5] === '7') {
        return res.status(400).json({ message: 'Verification Error' });
    }

    return res.status(200).json({ message: 'Success' });
});

const PORT = process.env.PORT || 5000;

(async () => {
    const ora = (await import('ora')).default;  // Dynamically import ora
    const spinner = ora(`Starting server on port ${PORT}`).start();

    app.listen(PORT, () => {
        spinner.succeed(`Server running on port ${PORT}`);
    });
})();
