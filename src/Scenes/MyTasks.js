import React, { Component } from 'react';
import { Button, ButtonGroup, SplitButton, SplitButtonItem, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'
import { MultiSelect, AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import Menu from '@material-ui/icons/Menu';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Input, NumericTextBox, Switch } from '@progress/kendo-react-inputs';
import axios from 'axios';
import * as Constants from '../Constants'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import TaskTitleCell from './Components/TaskTitleCell'
export default class MyTasks extends Component {

	constructor(props) {

		super(props);
		this.state = {

			tasks: []
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
			window.reload();
		}

		axios.post(Constants.url + 'GetMyTasks', `taskDetails=${encodeURIComponent(JSON.stringify(this.state))}`, {

			headers: {
				'Authorization': 'Bearer ' + jwt
			}
		}).then(response => {
			this.setState({

				...this.state,
				tasks: response.data
			})
		}).catch(e => {
			console.log(e)
			localStorage.removeItem('jwt');
			window.location.reload();
		})
	}

	render() {

		return (

			<div className="container-fluid" style={{ marginTop: "2em", marginBottom: '5em' }}>
				<div className="row justify-content-center">
					<div className="col-lg-10">
						<Grid
						data={this.state.tasks}
					>
						<Column
							field="title"
							title="Title"
							cell={props => { return (<TaskTitleCell {...props} />) }}
						/>
						<Column
							field="category"
							title="Category"
							
						/>
						<Column
							field="status"
							title="Status"
							
						/>
					</Grid>
					</div>
				</div>
			</div>

		)
	}
}