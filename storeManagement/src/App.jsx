import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainDashboard from './Pages/Dashboards/MainDashboard';
import RegisterScreen from './Pages/RegisterScreen';
import LoginScreen from './Pages/LoginScreen';

const router = createBrowserRouter ([
  
  {
    path:"/",
    element:<MainDashboard/>
    },
    {
      path:"/login",
      element:<LoginScreen/>
    },
    {
      path:"/registration",
      element:<RegisterScreen/>
    },
    {
      path:"/user",
    }
]
)


const App = () => {
  return <RouterProvider router={router} />;
};

export default App
