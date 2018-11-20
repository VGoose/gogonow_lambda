import React from 'react';
import { Formik } from 'formik';
import axios from '../utils/axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userLogin } from '../actions/user_actions';

const Login = ({ isAuth, userIsFetching, dispatch}) => {
  return (
    userIsFetching
      ? <div>
        'Loading...' //TODO
      </div>
      : isAuth
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
              dispatch(userLogin({ email: values.email, password: values.password }))
              setSubmitting(userIsFetching)
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
    isAuth: state.user.isAuth,
    userIsFetching: state.user.userIsFetching,
  }
}

export default connect(
  mapStateToProps,
  null
)(Login);

