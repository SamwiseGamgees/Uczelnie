import { useState } from 'react';
import './Login.css';
import { manageButtonState } from '../../zustand/manageButtonState';
import user from '/media/user.png';
import envelope from '/media/envelope.png';
import password from '/media/password-lock.png';
import googleIcon from '/media/google.png';
import supabase from "../../config/supabaseClient";
import { useAuthStore } from '../../zustand/useAuthStore';
import { useNavigate } from 'react-router-dom';
import StopButton from '../StopButton/StopButton';


interface LoginData {
    username: string;
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginData>({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false); // Nowy stan, aby przełączać między Sign In i Log In
    const setUsername = useAuthStore(state => state.setUsername);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));``
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true); 
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin  // lub `${window.location.origin}/login`
            }
        });

        if (error) {
            setError('Google login failed');
            setIsLoading(false);
        } else {
            if (data?.url) {
                window.location.href = data.url;
            } else {
                console.error('Brak URL w odpowiedzi, nie mogę przekierować do Google.');
                setIsLoading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let result;
            if (isSignIn) {
                // Jeśli użytkownik chce się zarejestrować
                result = await supabase.auth.signUp({
                    email: loginData.email,
                    password: loginData.password,
                    options: {
                        data: {
                            username: loginData.username
                        }
                    }
                });

                const { error: signUpError, data } = result;

                if (signUpError) {
                    setError(signUpError.message || "Błąd przy rejestracji.");
                    return;
                }

                if (data.user && !data.session) {
                    // Konto utworzone, ale trzeba potwierdzić e-mail
                    navigate('/check-email');
                    return;
                }

            
                if (data.user) {
                    const username = data.user.user_metadata?.username || loginData.username;
                    setUsername(username);
                    console.log("Zarejestrowano użytkownika:", result);
                } else {
                    setError("Wystąpił nieoczekiwany błąd.");
                }
                

            } else {
                // Jeśli użytkownik chce się zalogować
                result = await supabase.auth.signInWithPassword({
                    email: loginData.email,
                    password: loginData.password,
                });
            }


            // Sprawdzamy, co zwróciła odpowiedź
            console.log('Result data:', result.data);  // Zobacz dokładnie dane

            //konsola / errory tutaj
            if (result.error) {
                const msg = result.error.message;
                // Sprawdzamy kod odpowiedzi
                if (result.error.status === 400) {
                    setError("Niepoprawny email lub hasło.");
                } else if (msg.includes("Invalid login credentials")) {
                    setError("Niepoprawny email lub hasło.");
                } else if (msg.includes("User already registered")) {
                    setError("Konto z tym adresem już istnieje.");
                } else {
                    setError("Wystąpił błąd: " + msg);
                }
            } else {
                const username = result.data?.user?.user_metadata?.username || loginData.username;
                setUsername(username);
                navigate('/');
                console.log(isSignIn ? 'Zarejestrowano użytkownika' : 'Zalogowano użytkownika', result);
            }

        } catch (err) {
            console.error(err);
            setError('Wystąpił błąd');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn); // Przełącza formularz rejestracji i logowania
        setError(null);
    };

    return (
        <div className={`container`}>
            <div className="mini-form">
            <StopButton />
                <div className="header">
                    <div className="text_ll">{isSignIn ? 'Sign Up' : 'Log in'}</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        {isSignIn && (
                            <div className="input">
                                <img src={user} alt="" />
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="Username" 
                                    value={loginData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="input">
                            <img src={envelope} alt="" />
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={loginData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={password} alt="" />
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={loginData.password}
                                onChange={handleInputChange}
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit_l" disabled={isLoading}>
                        {isLoading ? 'Loading...' : isSignIn ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                <div className="forgot-password">
                    {!isSignIn && (
                        <>
                    Forgot Password? <span> </span>
                    <span onClick={() => navigate('/forgot-password')}>
                        Reset Password
                        </span>
                    </>
                )}
                </div>

                <div className="forgot-password">
                    ------------------------------------ or ------------------------------------
                </div>

                <button onClick={handleGoogleLogin} className="google-login-button">
                    <img src={googleIcon} alt="Google icon" />
                    Login with Google
                </button>

                <div className="forgot-password">
                    {isSignIn ? 'Already have an account? ' : 'Dont have an account? '}
                    <span onClick={toggleForm}>
                        {isSignIn ? 'Log In' : 'Sign Up'}
                    </span>
                </div>
            </div>
        </div>
    );
}
