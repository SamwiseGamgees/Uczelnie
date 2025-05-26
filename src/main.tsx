// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import supabase from './config/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase} initialSession={null}>
      <App />
    </SessionContextProvider>
  </StrictMode>,
);
