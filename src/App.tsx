import React, { useState, useEffect } from 'react';
import { checkSubscription } from './services/mercadopago';
import { UserRegistration } from './components/UserRegistration';

function App() {
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  useEffect(() => {
    const checkUserSubscription = async () => {
      if (userData?.email) {
        const subscribed = await checkSubscription(userData.email);
        setIsSubscribed(subscribed);
      }
      setCheckingSubscription(false);
    };
    checkUserSubscription();
  }, [userData]);

  const handleUserRegistration = async (data) => {
    setUserData(data);
    const subscribed = await checkSubscription(data.email);
    setIsSubscribed(subscribed);
  };

  if (checkingSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Verificando assinatura...</p>
      </div>
    );
  }

  if (!userData || !isSubscribed) {
    return <UserRegistration onComplete={handleUserRegistration} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <a
        href="https://molina-ride.vercel.app"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Fazer Locação
      </a>
    </div>
  );
}

export default App;
