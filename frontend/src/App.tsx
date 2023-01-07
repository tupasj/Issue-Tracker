import { useState } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, AppPage } from '@/pages';

export const App = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<any | null>(null);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route
            path="/sign-in"
            element={
              <SignInPage
                form="login"
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                setCurrentProject={setCurrentProject}
              />
            }
          />
          <Route
            path="/register"
            element={
              <SignInPage
                form="signup"
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                setCurrentProject={setCurrentProject}
              />
            }
          />
          <Route
            path="/app/*"
            element={
              <AppPage
                userEmail={userEmail}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
};
