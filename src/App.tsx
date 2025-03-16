import React, { useState, useEffect } from 'react';
import { checkSubscription } from './services/mercadopago';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  useEffect(() => {
    const verifySubscription = async () => {
      if (email) {
        const subscribed = await checkSubscription(email);
        setIsSubscribed(subscribed);
      }
      setCheckingSubscription(false);
    };
    verifySubscription();
  }, [email]);

  const handleLogin = () => {
    if (isSubscribed) {
      onLogin(email);
    } else {
      alert('Assinatura necessária para continuar.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Login onLogin={() => window.location.href = "https://www.radiotatuapefm.com.br"} />
      <a
        href="https://www.radiotatuapefm.com.br"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Fazer Locação
      </a>
    </div>
  );
}

export default App;
