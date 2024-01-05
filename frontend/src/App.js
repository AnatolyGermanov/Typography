import { RouterProvider } from 'react-router-dom';
import './App.css';

import router from './utils/router/router'
import AuthProvider from './hoc/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
