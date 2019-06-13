import React, { Component } from 'react';
import { Button, ButtonGroup, SplitButton, SplitButtonItem, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'
import { MultiSelect, AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import Menu from '@material-ui/icons/Menu';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import NewTask from './NewTask'
import { BrowserRouter, Route, Router, HashRouter, Redirect, Switch } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import MyTasks from './MyTasks'
import Task from './Task'
export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showPanel: false,
		}
	}

	togglePanel(event) {
		event.preventDefault();
		this.setState({
			...this.state,
			showPanel: true
		})
	}
		onSelect = (event) => {
			this.props.history.push(event.target.props.route);
		}

	
	hidePanel(event) {

		this.setState({
			...this.state,
			showPanel: false
		})

	}

	render() {

		return (
			<div className="container-fluid" style={{ margin: '1em' }}>

				<div className="row">
					<div className="col-lg-2">
						<Button
							primary={true}
							onMouseOver={this.togglePanel.bind(this)}

						><Menu /></Button>
					</div>
				</div>

				<div className="row">

					{this.state.showPanel &&


						<div className="col-lg-2" onMouseLeave={this.hidePanel.bind(this)}>
							
								<PanelBar
									expandMode={'single'}
									onSelect={this.onSelect.bind(this)}

								>	<PanelBarItem title={'New Task'} route="/newtask" />
									<PanelBarItem title={'My Tasks'} route="/" />
									<PanelBarItem title={'Read Baseline'} route="/readBaseline" />
									<PanelBarItem title={'Write Baseline'} route="/writeBaseline" />
									<PanelBarItem title={'Activities Baseline'} route="/activitiesBaseline" />

									<PanelBarItem title={'Registered Stored Procedures'} route="/storedprocedures" />
									<PanelBarItem title={'Connections'} route="/connections" />
									<PanelBarItem title={'Settings'} route="/settings" />
								</PanelBar>
							
						</div>}

						<div className={`col-lg-${this.state.showPanel ? "10" : "12"}`}>
							<Switch>
							
							<Route path='/newtask' render={props => {
								return (<NewTask
									userDetails={this.props.userDetails}
								/>)
							}} />
							<Route path='/:taskID' render={props => {
								return (<Task
									{...props}
									userDetails={this.props.userDetails}
								
								/>)
							}} />
							<Route path='/' render={props => {
								return (<MyTasks
									userDetails={this.props.userDetails}
								/>)
							}} />
							
						</Switch>
						</div>
				</div>
			</div>
		)
	}
}