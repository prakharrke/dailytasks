import React, { Component } from 'react';
import { BrowserRouter, Route, Router, HashRouter, Redirect, Switch } from 'react-router-dom';
import LoginForm from './Scenes/LoginForm'
import axios from 'axios';
import * as Constants from './Constants'
import Home from './Scenes/Home'
import Loading from './Scenes/Components/Loading'
const PrivateRoute = ({ component: Component, ...rest }) => {
	

	return (
		<Route  {...rest} render={props => (

			rest.isAuthenticated ? (
				<Component {...props} userDetails={rest.userDetails} />
			) : (
					<Redirect to={{
						pathname: "/login",

					}} />
				)
		)} />);
}


export default class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {

			isAuthenticated: false,
			isLoading: false,
			userDetails : {}
		}
	}

	componentWillMount() {
		let jwt = localStorage.getItem('jwt');
		console.log('JWT Token ' + jwt)
		if (jwt == null || jwt == undefined) {
			console.log('RETURNING')
			this.setState({
				...this.state,
				isLoading: false
			})
			return
		}
		axios.post(Constants.url + 'TokenValidation', `userDetails=${JSON.stringify({ username: "", password: "" })}`, {
			headers: {

				'Authorization': 'Bearer ' + jwt
			},
			credentials: 'include'


		}).then(response => {
			console.log(response);
			
			this.setState({
				isAuthenticated: true,
				isLoading: false,
				userDetails : {...response.data}
			})

		}).catch(e => {
			localStorage.removeItem('jwt');
			this.setState({
				isAuthenticated: false,
				isLoading: false
			})

		})
	}

	render() {
		var loadingComponent = this.state.isLoading ? <Loading /> : ""
		return (
			<div>
			{loadingComponent}
			{!this.state.isLoading &&
			<HashRouter basename="/dailytasks" >
				

				<Switch>
				
					
						
						<Route path='/login' render={props => { return (<LoginForm isUserAuthenticated={this.state.isAuthenticated} />) }} />
						<PrivateRoute isAuthenticated={this.state.isAuthenticated} userDetails = {this.state.userDetails} path='/' component={Home} />
					
				</Switch>
				
			</HashRouter>

		}

		</div>

		)
	}
}