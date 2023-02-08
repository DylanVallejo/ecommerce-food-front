
import { Form, ErrorMessage, Field, Formik } from 'formik';
import axios from 'axios';
import styles from '../styles/UsersData.module.css'
function UsersData() {
    
    
    
    const validate = values => {
        const errors = {};
        if(values.password.length < 5) {
            errors.password = "Contraseña demasiado corta"
        } 
        if(values.password !== values.confirmPassWord) {
            errors.confirmPassWord = "Las contraseñas nuevas no coinciden"
        }
        return errors;
    };
    
    
    const handleSubmit = values => {
        console.log(values)
        // axios.post( "user endpoint",values)
        // .then( res => {console.log(res) })
        // .catch( errors => {console.log(errors) })
        
    }
    
    // contact = {
    //     email: String,
    //     numero: Number,
    //     adress: String
    // }
    
    
    
    return (
        <div>
            <Formik 
                initialValues={{
                    firstname:"",
                    lastname: "",
                    email:"",
                    password:"",
                    confirmPassWord: "",
                    status: true,
                    about: "",
                    objective: "",
                    history:"",
                    contact:{
                        adress:"",
                        payphone: 0,
                        email: ""
                    }
                    // role: "USER"
                }}
            onSubmit={handleSubmit}
            validate={validate}
            
            >
                <Form className={styles.formContainerUserInfo}>
                    <label>
                        First Name
                        <Field  name="firstname" type="text" />
                    </label>
                    <label>
                        Last Name
                        <Field  name="lastname" type="text" />
                    </label>
                    <label>
                        Email
                        <Field  name="email" type="text" />
                    </label>
                    <label>
                        Password
                        <Field  name="password" type="text" />
                        <ErrorMessage name="password" />
                        
                    </label>
                    <label>
                        Confirm Password
                        <Field  name="confirmPassWord" type="text" />
                        <ErrorMessage name="confirmPassWord" />
                    </label>
                    
                    <label>
                        About your Enterprise
                        <Field  name="about" type="text" />
                    </label>
                    <label>
                        What is the objective of your Enterprise
                        <Field  name="objective" type="text" />
                        
                    </label>
                    <label>
                        History of your Enterprise
                        <Field  name="history" type="text" />
                    
                    </label>
                    <label>
                        Contact information
                        <Field  name="contact" type="text" />
                    </label>
                    {/* <Field  name="status" type="checkbox" {...getFieldProps('status')}/> */}
                    <button type='submit' >Actualizar Datos</button>
                </Form> 
            </Formik>
        </div>
    )
}

export default UsersData