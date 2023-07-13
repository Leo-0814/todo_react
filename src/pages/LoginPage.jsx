import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { checkPermission, login } from 'api/auth';
import Swal from 'sweetalert2';
=======
import Swal from 'sweetalert2';
import { useAuth } from 'Context/authContext';
>>>>>>> 23892ba (last commit)

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const { login, isAuthenticated } = useAuth()

>>>>>>> 23892ba (last commit)
  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    try {
<<<<<<< HEAD
      const { authToken, success } = await login({
=======
      const success = await login({
>>>>>>> 23892ba (last commit)
        username,
        password,
      });

      if (success) {
<<<<<<< HEAD
        localStorage.setItem('authToken', authToken);
=======
>>>>>>> 23892ba (last commit)
        Swal.fire({
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 1000,
          position: 'top',
        });
<<<<<<< HEAD
        navigate('/todos');
=======
>>>>>>> 23892ba (last commit)
        return;
      }
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        return;
      }

      const result = await checkPermission(authToken);
      if (result) {
        navigate('/todos');
      }
    };

    checkTokenIsValid();
  }, [navigate]);
=======
    if (isAuthenticated) {
      navigate('/todos')
    }
  }, [navigate, isAuthenticated]);
>>>>>>> 23892ba (last commit)

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(usernameInputValue) => setUsername(usernameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="number"
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>

      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
