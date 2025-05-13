import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('Hasła nie są takie same.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Hasło musi mieć co najmniej 8 znaków.');
            return;
        }

        setIsSubmitting(true);

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setError('Błąd przy zmianie hasła: ' + error.message);
        } else {
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000); // przekieruj po 3 sek.
        }

        setIsSubmitting(false);
    };

    return (
        <div className="container active">
            <div className="mini-form">
                <div className="header">
                    <div className="text_l">Zmień Hasło</div>
                </div>

                <form onSubmit={handleResetPassword}>
                    <div className="inputs">
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Nowe hasło"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Potwierdź nowe hasło"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && (
                        <div className="error-message" style={{ color: 'green' }}>
                            Hasło zmienione! Przekierowanie...
                        </div>
                    )}

                    <button type="submit" className="submit_l" disabled={isSubmitting}>
                        {isSubmitting ? 'Resetuję...' : 'Resetuj hasło'}
                    </button>
                </form>
            </div>
        </div>
    );
}
