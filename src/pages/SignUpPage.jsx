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
import { checkPermission, register } from 'api/auth';
import Swal from 'sweetalert2';
=======
import Swal from 'sweetalert2';
import { useAuth } from 'Context/authContext';
>>>>>>> 23892ba (last commit)

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const { register, isAuthenticated }= useAuth()

>>>>>>> 23892ba (last commit)
  const handleClick = async () => {
    if (username.length === 0 || password.length === 0 || email.length === 0) {
      return;
    }
    try {
<<<<<<< HEAD
      const { success, authToken } = await register({
=======
      const success = await register({
>>>>>>> 23892ba (last commit)
        username,
        email,
        password,
      });

      if (success) {
<<<<<<< HEAD
        localStorage.setItem('authToken', authToken);
=======
>>>>>>> 23892ba (last commit)
        Swal.fire({
          position: 'top',
          title: '註冊成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });
<<<<<<< HEAD
        navigate('/todos');
=======
>>>>>>> 23892ba (last commit)
        return;
      }
      Swal.fire({
        position: 'top',
        title: '註冊失敗！',
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
      <h1>建立您的帳號</h1>

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
          type="email"
          label="Email"
          placeholder="請輸入信箱"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>

      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
