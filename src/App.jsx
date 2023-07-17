import { AuthProvider } from 'Context/authContext';
import './App.scss';
import { HomePage, TodoPage, LoginPage, SignUpPage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="todos" element={<TodoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
