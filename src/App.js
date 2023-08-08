import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/UI/Navbar/MyNavbar';
import AppRouter from './components/AppRouter';
import MyFooter from './components/UI/Footer/MyFooter';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
