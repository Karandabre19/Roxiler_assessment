import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import './index.scss';
import store, { persister } from './Redux/Store/Store';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <ToastContainer/>
            <App/>
        </PersistGate>
    </Provider>
)
