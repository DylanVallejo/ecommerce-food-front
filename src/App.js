import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedRoutes from "./components/AnimatedRoutes";
import MyContext from './context/MyContext';
import { useState } from "react";


function App() {
  
  const [userContext, setUserContext] = useState({
    token:"",
    role:""
    
  })
  
  // value={{token,role}}
  
  return (
    <div className="App">
      <MyContext.Provider value={{userContext,setUserContext}}>
        <BrowserRouter>
          <NavBar />
          <AnimatedRoutes />
          <Footer />
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
