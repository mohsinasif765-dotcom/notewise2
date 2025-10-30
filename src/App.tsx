import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LoginScreen } from './components/Auth/LoginScreen';
import { SignupScreen } from './components/Auth/SignupScreen';
import { MobileApp } from './components/MobileApp';

type AppState = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'app';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (hasSeenOnboarding && isLoggedIn) {
      // Skip straight to app
      setTimeout(() => {
        setAppState('app');
      }, 2000);
    }
  }, []);

  const handleSplashComplete = () => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (hasSeenOnboarding && isLoggedIn) {
      setAppState('app');
    } else if (hasSeenOnboarding) {
      setAppState('login');
    } else {
      setAppState('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setAppState('login');
  };

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setAppState('app');
  };

  const handleSignup = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setAppState('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setAppState('login');
  };

  const handleGoToSignup = () => {
    setAppState('signup');
  };

  const handleGoToLogin = () => {
    setAppState('login');
  };

  return (
    <ThemeProvider>
      <div className="size-full">
        {appState === 'splash' && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
        {appState === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        {appState === 'login' && (
          <LoginScreen
            onLogin={handleLogin}
            onSignup={handleGoToSignup}
          />
        )}
        {appState === 'signup' && (
          <SignupScreen
            onSignup={handleSignup}
            onLogin={handleGoToLogin}
          />
        )}
        {appState === 'app' && (
          <MobileApp onLogout={handleLogout} />
        )}
      </div>
    </ThemeProvider>
  );
}
