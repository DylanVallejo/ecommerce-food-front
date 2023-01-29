import React, {useState} from 'react'
// import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = ( ) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    // const loginUser = user => {
    //     axios.post('http://localhost:8000/api/login', user,{
    //         withCredentials: true
    //     })
    //         .then(res=>{
    //             if(res.data.msg.includes('invalid login attempt')){
    //                 setError('Login inválido');
    //             }else{
    //                 context.setUsr({
    //                     id:res.data.userid,
    //                     nombre:res.data.nombre,
    //                     apellido:res.data.apellido,
    //                     rol:res.data.rol
    //                 });
    //                 context.setLogin(true);
    //                 navigate("/");
    //             }
    //         })
    //         .catch(err=>{console.log(err)})
    // }

    const onSubmitHandler = e => {
        e.preventDefault();
        // loginUser({email,password});
    }

    return (
        <div>
            <h2>Login</h2>
            <form id="formlogin" onSubmit={onSubmitHandler}>
            {/* { error !== "" && <p>{error}</p>} */}
                <div >
                    <label>Email</label><br/>
                    <input type="email" onChange = {(e)=>setEmail(e.target.value)} value={email} required/>
                </div>
                <div>
                    <label>Contraseña</label><br/>
                    <input type="password" onChange = {(e)=>setPassword(e.target.value)} value={password} required/>
                </div>
                <button type="submit" >
                    Login
                </button>
                <button onClick={navigate("/")}>
                    Home
                </button>
            </form>
        </div>
    )
}

export default LoginForm;