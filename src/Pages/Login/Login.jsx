import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';

const initialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const [isPosting, setIsPosting] = useState(false);
    const navigate = useNavigate();

    const checkLogin = async () => {
        const response = await fetch("https://busy-az-api-9c92d29fca5a.herokuapp.com/api/user", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        console.log(data.success);
        return data.success, console.log("lfmelfm");;
    };

    useEffect(() => {
        const performLoginCheck = async () => {
            const isLoggedIn = await checkLogin();
            if (isLoggedIn) {
                navigate("/");
            }
        };

        performLoginCheck();
    }, []);

    const handleSubmit = async (values, actions) => {
        console.log(values);
        try {
            setIsPosting(true);
            const res = await fetch("https://busy-az-api-9c92d29fca5a.herokuapp.com/api/user/login", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const response = await res.json();

            console.log(response);

            if (response.success) {
                if (response.userrole === "freelancer") {
                    navigate('/dashboard/freelancer/profile');
                } else if (response.userrole === "employer") {
                    navigate('/dashboard/employer/profile');
                }
               
            } else {
                // Genel hata mesajı ekleyin
                actions.setErrors({ general: response.message });
                // Belirli alanlar için hata mesajları ekleyin
                Object.keys(response.errors).forEach((key) => {
                    actions.setFieldError(key, response.errors[key]);
                });
            }
        } catch (error) {
            console.error("Error:", error);
            actions.setErrors({ general: "An error occurred. Please try again later." });
        } finally {
            setIsPosting(false);
            actions.setSubmitting(false);
        }
    };

    return (
        <div className={styles.formBox}>
            <div className={styles.textbox}>
                <h1 className={styles.title}>Daxil ol</h1>
                <div className={styles.subtitle}>
                    <h3 className={styles.subtitletext}>Səni saytımızda görmək xoşdur.</h3>
                    <p><span>Hesabın yoxdur?</span> <span className={styles.signup}>  <NavLink to="/signup">Qeydiyyatdan keç!</NavLink> </span></p>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Please Enter Email'),
                    password: Yup.string().required('Please Enter Password'),
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, isSubmitting }) => (
                    <Form className={styles.form}>
                        {errors.general && <div className={styles.error}>{errors.general}</div>}
                        <div className={styles.inpbox}>
                            <div className={styles.iconbox}>
                                <CiMail />
                            </div>
                            <Field className={styles.inp} type="email" name="email" placeholder="e-poçt ünvanı" />
                        </div>
                        {errors.email && <small className={styles.error}>{errors.email}</small>}
                        <br />
                        <div className={styles.inpbox}>
                            <div className={styles.iconbox}>
                                <CiLock />
                            </div>
                            <Field className={styles.inp} type="password" placeholder="parol" name="password" />
                        </div>
                        {errors.password && <small className={styles.error}>{errors.password}</small>}
                        <div>
                            <span className={styles.forgetpsw}>Parolun yaddan çıxıb?</span>
                        </div>
                        <br />
                        <button className={styles.submitBtn} type='submit' disabled={isSubmitting || isPosting}>Daxil ol</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
