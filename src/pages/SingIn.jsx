import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Singin.module.scss";
import logo from "../resources/logofood_transparente.png";
import axios from "axios";

const SingIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Ingresar");
  const [message, setMessage] = useState();

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
          setState("Acceso correcto. Redirigiendo...");
          navigate("/");
        })
        .catch((error) => {
          setState("Ingresar");
          console.log(error);
        });
    } else {
      setMessage("Formulario incompleto. Intenta otra vez");
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.card} onSubmit={submitHandler}>
        <div className={styles.logo}>
          <img src={logo} alt="store logo" />
        </div>
        <h1>Regístrate</h1>
        <p>
          Crea una cuenta para continuar con tus compras, gestionar órdenes y
          ser parte de nuestra red de krugerianos.
        </p>
        <div className={styles.mail}>
          <input
            value={email}
            onChange={emailHandler}
            type="email"
            required='required'
          />
          <span>e-mail</span>
        </div>
        <div className={styles.password}>
          <input
            value={password}
            onChange={passwordHandler}
            required='required'
          />
          <span>Contraseña</span>
        </div>
        <button className={styles.btn}>{state}</button>
        {!message ? (
          <p>
            Si ya tienes cuenta, accede <Link to="/login">aquí</Link>
          </p>
        ) : (
          message
        )}
      </form>
    </main>
  );
};

export default SingIn;
