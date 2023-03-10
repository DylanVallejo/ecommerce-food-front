import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.scss";
import logo from "../resources/logofood_transparente.png";
import axios from "axios";
import MyContext from '../context/MyContext';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'  



const LogIn = (props) => {

  const context = useContext(MyContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Ingresar");
  const [message, setMessage] = useState();
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


  // const [userRoleContext, setUserRoleContext] = useState({
  //   role: "",
  //   token:"",
  // })
  // usr,setUsr,login,setLogin

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setMessage();
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setMessage();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const login = {
        email: email,
        password: password,
      };

      setState("Comprobando");
      axios
        .post("http://localhost:8082/api/v1/auth/authenticate", login)
        .then((res) => {
          console.log(res)
          setState("Acceso correcto. Redirigiendo...");
          let tkn = res.data.token
          let decoded = jwt_decode(tkn)
          console.log(decoded)
          console.log("decoded")

          context.setUserContext({
            role: res.data.role,
            token: decoded
          })
          // console.log(userRoleContext)
          navigate("/");
          Toast.fire({
            icon: 'success',
            title:  `Login exitoso`,
            timer: 2000
          })

        })
        .catch((error) => {
          setState("Ingresar");
          console.log(error);
          Toast.fire({
            icon: 'error',
            title:  `Usuario o contrase??a incorrecto`
          })
        });
    } else {
      setMessage("Formulario incompleto. Intenta otra vez");
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.card} onSubmit={submitHandler}>
        {/* <div className={styles.logo}>
          <img src={logo} alt="store logo" />
        </div> */}
        <h1>Bienvenido</h1>
        <p>Inicia sesi??n para continuar con tus compras</p>
        <div className={styles.mail}>
          <input
            value={email}
            onChange={emailHandler}
            type="email"
            required='requiered'
          />
          <span>E-mail</span>
        </div>
        <div className={styles.password}>
         
          <input
            type="password"
            value={password}
            onChange={passwordHandler}
            required='requiered'
          />
           <span>Contrase??a</span>
        </div>
        <button className={styles.btn}>{state}</button>
        {!message ? (
          <p>
            ??No tienes cuenta? Reg??strate <Link to="/singin">aqu??</Link>
          </p>
        ) : (
          message
        )}
      </form>
    </main>
  );
};

export default LogIn;
