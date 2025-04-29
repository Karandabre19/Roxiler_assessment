import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import AdminDashboard from './Pages/Dashboards/AdminDashboard';
import MainDashboard from './Pages/Dashboards/MainDashboard';
import OwnerDashboard from './Pages/Dashboards/OwnerDashboard';
import UserDashBoard from './Pages/Dashboards/UserDashBoard';
import LoginScreen from './Pages/LoginScreen';
import RegisterScreen from './Pages/RegisterScreen';
import ProtectedRoute from './Route/ProtectedRoute';

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
      element:(<ProtectedRoute allowedRoles="user">
        <UserDashBoard/>
      </ProtectedRoute>),
    },
    {
      path:"/admin",
      element:<ProtectedRoute allowedRoles="admin">
        <AdminDashboard/>
      </ProtectedRoute>
    },
    {
      path:"/owner",
      element:(
        <ProtectedRoute allowedRoles="owner">
          <OwnerDashboard/>
        </ProtectedRoute>
      )
    }
]
)


const App = () => {
  return <RouterProvider router={router} />;
};

export default App
