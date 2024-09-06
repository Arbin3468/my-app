const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
    origin: '*', // Adjust this to your frontend's origin
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], 
}
app.use(cors(corsOptions));

app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    // Check if the code is a string of exactly 6 digits
    if (typeof code !== 'string' || code.length !== 6 || !/^\d{6}$/.test(code)) {
        return res.status(400).json({ message: 'Verification Error: Code must be a 6-digit number.' });
    }

    if (code[5] === '7') {
        return res.status(400).json({ message: 'Verification Error: Code cannot end with 7.' });
    }

    return res.status(200).json({ message: 'Success' });
});

const PORT = process.env.PORT || 5000;

(async () => {
    const ora = (await import('ora')).default;
    const spinner = ora(`Starting server on port ${PORT}`).start();

    app.listen(PORT, () => {
        spinner.succeed(`Server running on port ${PORT}`);
    });
})();