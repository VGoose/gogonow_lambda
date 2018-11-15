import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authUser } from '../../../actions/user_actions.js'
import { connect } from 'react-redux';

//destructure and reassign component to Component because need to capitalize component 
const PrivateRoute = ({ component: Component, ...rest, isAuth, userLoading }) => (
	userLoading 
	? 'Loading...'  //TODO
	: <Route {...rest} render={(props) => (
		isAuth
		  ? <Component {...props} />
		  : <Redirect to='/login' />
	 )} />
)

function mapStateToProps(state) {
	return {
		isAuth: state.users.isAuth,
		userLoading: state.users.loading,
	}
}

export default connect(
	mapStateToProps,
	{
		authUser,
	}
)(PrivateRoute);
