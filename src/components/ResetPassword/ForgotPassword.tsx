import { useState } from 'react';
import supabase from '../../config/supabaseClient';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setIsSubmitting(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5174/reset', // <-- zamień na swoją domenę, jeśli masz
        });

        if (error) {
            setError('Nie udało się wysłać maila: ' + error.message);
        } else {
            setMessage('Sprawdź swoją skrzynkę mailową, aby zresetować hasło.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="container active">
            <div className="mini-form">
                <div className="header">
                    <div className="text_l">Forgot Password</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <input
                                type="email"
                                placeholder="Wpisz swój adres e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="error-message" style={{ color: 'green' }}>{message}</div>}

                    <button type="submit" className="submit_l" disabled={isSubmitting}>
                        {isSubmitting ? 'Wysyłam...' : 'Wyślij link resetujący'}
                    </button>
                </form>
            </div>
        </div>
    );
}
