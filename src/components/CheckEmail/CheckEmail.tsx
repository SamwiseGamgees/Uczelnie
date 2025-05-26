import './CheckEmail.css';
import LockIcon from '../LockIcon/LockIcon';
import { useNavigate } from 'react-router-dom';


export default function CheckEmail() {
    const navigate = useNavigate();
  return (
    <div className="check-email-page">
      <div className="check-email-container">
        <LockIcon />
        <h1>Sprawdź swoją pocztę</h1>
        <p>
          Na podany adres e-mail wysłaliśmy wiadomość, w której znajdziesz instrukcję zmiany hasła.
        </p>
        <button className="check-email-button" onClick={() => navigate('/login')}>OK</button>
        <p className="check-email-help">
          Coś poszło nie tak? Skorzystaj z <a href="#">pomocy</a> lub skontaktuj się z nami pod adresem{' '}
          <a href="mailto:uczelnie@gmail.pl">uczelnie@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
