import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';

import TopBar from './top_bar';
import { userAuth, userSetLoading } from '../../actions/user_actions';

const Register = () => {
  return (
    <div className="register-container">
      <h3>
        Please register
      </h3>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ email: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password !== values.password2) {
            errors.password = 'Please confirm with matching password';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
          return errors;
        }}  
        onSubmit={(values, { setSubmitting }) => { 
          //create action for this 
          axios.post('http://localhost:5000/api/user/register',{
            username: values.username,
            email: values.email,
            password: values.password
          })
            .then(user => {
              setSubmitting(false)
              
            })
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
            <form method="post" action="" className="" onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                className={errors.username ? "form-control is-invalid" : "form-control"}
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && <div className="text-warning">{errors.username}</div>}
              <label>Email</label>
              <input
                className={errors.email ? "form-control is-invalid" : "form-control"}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && <div className="text-warning">{errors.email}</div>}
              <label>Password</label>
              <input
                className={errors.password ? "form-control is-invalid" : "form-control"}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && <div className="text-warning">{errors.password}</div>}
              <label>Confirm Password</label>
              <input
                className={errors.password ? "form-control is-invalid" : "form-control"}
                type="password"
                name="password2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
              />
              <button className="btn btn-lg btn-primary btn-block mt-3" type="submit" disabled={isSubmitting}>
                Register
          </button>
            </form>
          )}
      </Formik>
    </div>
  )
}

export default Register;