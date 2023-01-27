
import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import OfertasPage from './pages/OfertasPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <NavBar/>
            <Routes>
              <Route   path="/" element={<HomePage/>} />
              <Route   path="/ofertas" element={<OfertasPage/>} />
              <Route   path="/about" element={<AboutUsPage/>} />
              <Route   path="/contact" element={<ContactUsPage/>} />
              
              {/* <Route path="/agregar" element={<Agregarpage />} /> */}
            </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
