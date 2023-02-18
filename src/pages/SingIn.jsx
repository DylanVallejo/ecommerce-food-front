import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Singin.module.scss";
import logo from "../resources/logofood_transparente.png";
import axios from "axios";

const SingIn = () => {
  const navigate = useNavigate();

  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("");
  const [state, setState] = useState("Ingresar");
  const [message, setMessage] = useState();

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setMessage();
  };


  //   {
  //     "lastname" : "kael",
  //     "password" : "123456",
  //     "firstname": "kael",
  //     "role": "ADMIN",
  //     "email":"kael@kael.com"
  //  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setMessage();
  };


  const comparePassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {


      setState("Comprobando");

      console.log(password + ' ' + confirmPassword)
      axios
        .post("http://localhost:8082/api/v1/auth/register", {
          "lastname": lastName,
          "password": password,
          "firstname": firstName,
          "email": email,
        })
        .then((res) => {
          console.log(res.data)
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
            required
          />
          <span>e-mail</span>
        </div>
        <div className={styles.mail}>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            // placeholder="Ingresa tu primer Nombre"
            type="text"
            required
          />
          <span>Nombre</span>
        </div>
        <div className={styles.mail}>
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            // placeholder="Ingresa tu apellido"
            type="text"
            required
          />
          <span>Apellido</span>
        </div>
        <div className={styles.password}>
          <input
            value={password}
            onChange={passwordHandler}
            // placeholder="Crea una contraseña segura."
            type="password"
            required
          />
          <span>Contraseña.</span>
        </div>
        <div className={styles.password}>

          <input
            value={confirmPassword}
            onChange={comparePassword}
            // placeholder="Confirma tu contraseña."
            type="password"
            required
          />
          <span>Confirmar Contraseña</span>
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
