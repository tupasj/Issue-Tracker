import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, AppPage } from '@/pages';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};
