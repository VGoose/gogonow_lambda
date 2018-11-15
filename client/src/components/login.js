import React from 'react';
import { Formik } from 'formik';
import axios from '../utils/axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import { userAuth, userSetLoading } from '../../actions/user_actions';

import Cookies from 'js-cookie';


const Login = ({ userIsAuth, userIsLoading, userAuth }) => {
  return (
    userIsLoading
      ? <div>
        'Loading...' //TODO
        {console.log('inside')}
      </div>
      : userIsAuth
        ? <Redirect to="dashboard" />
        : <div className="login-container">
          <h3>
            Please sign in
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
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios.post('/api/user/login', { email: values.email, password: values.password })
                .then((res) => {
                  if (res.status === 404) {
                    //TODO 
                  }
                  if (res.data.error) {
                    //something went wrong
                    errors.API = res.data.error;
                  } else if (res.data.token) {
                    Cookies.set('token', res.data.token);
                    userAuth();
                  }
                })
                .catch(err => console.log(err))
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
                <form onSubmit={handleSubmit}>
                  {errors.API && <div className="text-warning">{errors.API}</div>}
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
                  <button className="btn btn-lg btn-primary btn-block mt-3" type="submit" disabled={isSubmitting}>
                    Login
            </button>
                </form>
              )}
          </Formik>
        </div >
  )
}

function mapStateToProps(state) {
  return {
    userIsAuth: state.users.isAuth,
    userIsLoading: state.users.isLoading,
  }
}

export default connect(
  mapStateToProps,
  {
    userAuth,
    userSetLoading
  }
)(Login);

