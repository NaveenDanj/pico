import { Navigate } from 'react-router-dom';


type ProtectedRotueProp = {
    element: React.ReactNode,
    isAuth: boolean
}

const PrivateRoute = ({ element, isAuth }: ProtectedRotueProp) => {

  if (isAuth) {
    return element;
  } else {
    return <Navigate to={{ pathname: '/auth' }} />;
  }

};

export default PrivateRoute;