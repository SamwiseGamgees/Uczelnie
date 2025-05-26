import { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import LockIcon from '../LockIcon/LockIcon';
import StopButton from '../StopButton/StopButton';
import './ForgotPassword.css';



export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5174/reset-password',
    });

    if (error) {
      setError('Nie udało się wysłać maila: ' + error.message);
    } else {
      navigate('/check-email');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container active">
      <div className="mini-form">
        <div className="header">
          <LockIcon />
          <div className="text_l">Nie pamiętasz hasła?</div>
          <div className="description">
            W poniższe pole wpisz adres e-mail podany podczas rejestracji konta
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && (
            <div className="error-message" style={{ color: '#4caf50' }}>
              {message}
            </div>
          )}

          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/login')}
            >
              Anuluj
            </button>
            <button type="submit" className="submit_l" disabled={isSubmitting}>
              {isSubmitting ? 'Wysyłam...' : 'Dalej'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
