import axios from 'axios';
import React, {useState} from 'react'
// import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = ( ) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    
    // "email":"william@gmail.com",
    // "password" : "123456"
    
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

    const onSubmitHandler = ( e ) => {
        e.preventDefault();
        const login = {
            'email': email,
            'password': password 
        }
        console.log(login)
        
        
        axios.post('http://localhost:8082/api/v1/auth/authenticate', login)
        .then(res=>{
            console.log("hola respuesta")
            console.log(res)
        })
        .catch(error=>{
            console.log("hola error")
            console.log(error)
        })
        
    }

    return (
        <div>
            <h2>Login</h2>
            <form id="formlogin" onSubmit={onSubmitHandler}>
            {/* { error !== "" && <p>{error}</p>} */}
                <div >
                    <label>Email</label><br/>
                    <input type="email" onChange = {(e)=>setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label>Contraseña</label><br/>
                    <input type="password" onChange = {(e)=>setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" >
                    Login
                </button>
                {/* <button onClick={navigate("/")}>
                    Home
                </button> */}
            </form>
        </div>
    )
}

export default LoginForm;