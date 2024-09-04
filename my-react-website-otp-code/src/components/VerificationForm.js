import React, { useState } from 'react';
import axios from 'axios';
import '../styles/VerificationForm.css';


function VerificationForm() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState(null);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                document.getElementById(`digit-${index + 1}`).focus();
            }
            setError(null);
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').split('');
        if (paste.length === 6 && paste.every(char => /^\d$/.test(char))) {
            setCode(paste);
            document.getElementById('digit-5').focus();
        } else {
            setError('Invalid code format');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.includes('')) {
            setError('All fields must be filled.');
            return;
        }

        const fullCode = code.join('');

        try {
            const response = await axios.post('http://localhost:5000/verify-code', { code: fullCode });
            if (response.status === 200) {
                window.location.href = '/success';
            }
        } catch (err) {
            setError('Verification Error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="verification-form">
            <label className="verification-label">Verification code:</label>
            <div className="input-container" onPaste={handlePaste}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`digit-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        className={`digit-input ${digit === '' ? 'input-error' : ''}`}
                        aria-label={`Digit ${index + 1}`}
                    />
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">SUBMIT</button>
        </form>
    );
}

export default VerificationForm;
