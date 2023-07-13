<<<<<<< HEAD
const HomePage = () => {
  return <div>HomePage</div>;
=======
import { useAuth } from "Context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated }= useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos')
    } else {
      navigate('/login')
    }
  },[navigate, isAuthenticated])
>>>>>>> 23892ba (last commit)
};

export default HomePage;
