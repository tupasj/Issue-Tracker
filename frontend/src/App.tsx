import { GlobalStyles } from './GlobalStyles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, AppPage } from '@/pages';

export const App = () => {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<SignInPage form="login" />} />
          <Route path="/register" element={<SignInPage form="signup" />} />
          <Route path="/app/*" element={<AppPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
};
