
import Header from './components/Header'
import Singlepost from './components/Singlepost';
import {Route,Routes} from 'react-router-dom'
import './index.css';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={
       <IndexPage />
      }/>

      <Route path={'/login'} element={
        <LoginPage />
      }/>
      <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
    
  );
}

export default App;
