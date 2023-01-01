import { useState } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, AppPage } from '@/pages';

export const App = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route
            path="/sign-in"
            element={<SignInPage form="login" setUserEmail={setUserEmail} />}
          />
          <Route
            path="/register"
            element={<SignInPage form="signup" setUserEmail={setUserEmail} />}
          />
          <Route path="/app/*" element={<AppPage userEmail={userEmail} />} />
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
};
