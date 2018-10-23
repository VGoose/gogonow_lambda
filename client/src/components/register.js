import React from 'react';
import { Formik } from 'formik';

import TopBar from './top_bar';

const Register = () => {
  return (
    <div className="register-container">
      <TopBar page="Register" />
      <h3>
        Please sign in
      </h3>
      <Formik
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
          } else if(values.password !== values.password2) {
            errors.password = 'Please confirm with matching password';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <label>Email</label>
              {errors.email && touched.email && <div>{errors.email}</div>}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <label>Password</label>
              {errors.password && touched.password && <div>{errors.password}</div>}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
          </button>
            </form>
          )}
      </Formik>
    </div>
  )
}

export default Register;