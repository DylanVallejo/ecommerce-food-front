
import { Form, ErrorMessage, Field, Formik } from 'formik';
import axios from 'axios';
import styles from '../styles/UsersData.module.scss'
import MyContext from "../context/MyContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import SingIn from '../pages/SingIn';
import LogIn from '../pages/LogIn';
function UsersData() {
    
    const context = useContext(MyContext)
    // console.log(context.userContext.role)
    const navigate  = useNavigate();
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
    
    const handleNavigation = () => {
        navigate("/singin")
    }
    
    
    
    return (
        <>
        { context.userContext.role ?
            
            <div className={styles.containerUserForm}>
                <Formik 
                    initialValues={{
                        firstname:"",
                        img:"",
                        lastname: "",
                        email:"",
                        password:"",
                        confirmPassWord: "",
                        status: true,
                        // about: "",
                        // objective: "",
                        // history:"",
                        // contact: ""
                        // contact:{
                        //     adress:"",
                        //     payphone: 0,
                        //     email: ""
                        // }
                        // role: "USER"
                    }}
                onSubmit={handleSubmit}
                validate={validate}
                
                >
                    <Form className={styles.formContainerUserInfo}>
                        <div className={styles.imageSection}>
                            <section className={styles.sectionUserData}> 
                                
                                <label className={styles.labelUserData}>
                                    Image
                                    {/* <Field  name="img" type="text" className={styles.inputUserData} /> */}
                                </label>
                            </section>
                        </div>
                        <div className={styles.dataSection}>
                            <section className={styles.sectionUserData}> 
                            
                                <label className={styles.labelUserData}>
                                    First Name
                                </label>
                                <Field  name="firstname" type="text" className={styles.inputUserData} />
                            </section>
                            
                            <section className={styles.sectionUserData}>
                                <label  className={styles.labelUserData}>
                                    Last Name
                                </label>
                                    <Field  name="lastname" type="text" className={styles.inputUserData} />
                            </section>
                                
                            <section className={styles.sectionUserData}>
                                
                                <label className={styles.labelUserData}>
                                    Email
                                </label>
                                    <Field  name="email" type="text" className={styles.inputUserData} />
                            </section>
                                    
                            <section className={styles.sectionUserData}>
                                <label className={styles.labelUserData}>
                                    Password
                                    
                                </label>
                                    <Field  name="password" type="password" className={styles.inputUserData} />
                                    <ErrorMessage name="password" />
                            
                            </section>
                                
                            <section className={styles.sectionUserData}>
                                <label className={styles.labelUserData}>
                                    Confirm Password
                                </label>
                                    <Field  name="confirmPassWord" type="password" className={styles.inputUserData} />
                                    <ErrorMessage name="confirmPassWord" />
                            </section>
                            
                            {/* <section className={styles.sectionUserData}>
                                
                                <label className={styles.labelUserData}>
                                    About your Enterprise
                                </label>
                                    <Field  name="about" type="text" className={styles.inputUserData} />
                                
                            </section>
                                
                                
                            <section className={styles.sectionUserData}>
                                <label className={styles.labelUserData}>
                                    What is the objective of your Enterprise
                                    
                                </label>
                                    <Field  name="objective" type="text" className={styles.inputUserData} />
                                
                            </section>
                                
                            
                            <section className={styles.sectionUserData}>
                                <label className={styles.labelUserData}>
                                    History of your Enterprise
                                
                                </label>
                                    <Field  name="history" type="text" className={styles.inputUserData} />
                            </section>
                            
                            <section className={styles.sectionUserData}>
                                <label className={styles.labelUserData}>
                                    Contact information
                                </label>
                                    <Field  name="contact" type="text" className={styles.inputUserData} />
                            </section> */}
                        </div>
                        {/* <Field  name="status" type="checkbox" {...getFieldProps('status')}/> */}
                        <button type='submit' className={styles.updateValues} >Actualizar Datos</button>
                    </Form> 
                </Formik>
            </div>
            
            :  
            
            <LogIn/>
            
        }
        </>
        
    )
}

export default UsersData


// <div>
{/* <h4>Registrate para configurar tu cuenta</h4>
<button onClick={handleNavigation} >Registrarse</button>
</div> */}