import React, { Component } from 'react';
import { Button, ButtonGroup, SplitButton, SplitButtonItem, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'
import { MultiSelect, AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import Menu from '@material-ui/icons/Menu';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Input, NumericTextBox, Switch } from '@progress/kendo-react-inputs';
import axios from 'axios';
import * as Constants from '../../Constants'
export default class NewOrdinaryTask extends Component {

	constructor(props) {
		super(props)

		this.state = {
			username: this.props.username,
			title: '',
			category: '',
			description: '',
			status: '',
			author: '',
			subTasks: []

		}
	}

	setTitle(event) {

		this.setState({
			...this.state,
			title: event.target.value
		})
	}

	setDescription(event) {

		this.setState({
			...this.state,
			description: event.target.value
		})
	}

	setStatus(event) {

		this.setState({
			...this.state,
			status: event.target.value
		})
	}

	setCategory(event) {
		this.setState({
			...this.state,
			category: event.target.value
		})
	}

	addSubTask(event) {

		var subTask = {
			description: '',
			timeSheet: 0,
			specialTask: false
		}

		var subTasks = new Array();
		subTasks = this.state.subTasks
		subTasks.push(subTask)
		this.setState({
			...this.state,
			subTasks: subTasks
		})
	}

	setSubTasKDescription(event) {
		var index = event.target.getAttribute('index');
		var subTasks = this.state.subTasks;
		subTasks[index].description = event.target.value;
		this.setState({
			...this.state,
			subTasks: subTasks
		})
	}

	setSubTaskTimeSheet(event) {

		var index = event.target.props.index;
		var subTasks = this.state.subTasks;
		subTasks[index].timeSheet = event.target.value;
		this.setState({
			...this.state,
			subTasks: subTasks
		})
	}

	deleteSubTask(event) {
		event.preventDefault();
		var index = event.target.getAttribute('index')
		var subTasks = this.state.subTasks;
		subTasks.splice(index, 1);

		this.setState({
			...this.state,
			subTasks: subTasks
		})
	}

	setSpecialSubTask(event){
		alert(event.target.value)
		var subTasks = this.state.subTasks;
		var index = event.target.props.index;
		subTasks[index].specialTask = event.target.value;

		this.setState({
			...this.state,
			subTasks : subTasks
		})
	}

	createTask(event){

		

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

		axios.post(Constants.url + 'AddTask', `taskDetails=${encodeURIComponent(JSON.stringify(this.state))}`, {
			
			headers : {
				'Authorization': 'Bearer ' + jwt
			}
		}).then(response=>{

		}).catch(e=>{
			console.log(e)
			localStorage.removeItem('jwt');
			window.location.reload();
		})
	}


	render() {

		return (
			<div>
				<div className="row">
					<div className="col-lg-10">
						<Input
							label="Title"
							style={{ width: '100%' }}
							onChange={this.setTitle.bind(this)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-10">
						<textarea
							placeholder="Desciption"
							className="form-control rounded-0"
							id="exampleFormControlTextarea1"
							rows="5"
							style={{ marginTop: '2em' }}
							onChange={this.setDescription.bind(this)}
							value={this.state.description}
						>
						</textarea>
					</div>
				</div>
				<div className="row" >
					<div className="col-lg-2" style={{ margin: '2em' }}>
						<DropDownList
							label="Status"

							data={['Open', 'Close']}
							onChange={this.setStatus.bind(this)}

						/>
					</div>
					<div className="col-lg-2" style={{ margin: '2em' }}>
						<DropDownList
							label="Category"

							data={['Plugin', 'DBTest']}
							onChange={this.setCategory.bind(this)}

						/>
					</div>
				</div>
				<div className="row" style={{ marginTop: "2em" }}>
					<div className="col-lg-12 justify-content-center panel-wrapper" style={{ maxWidth: "100%", margin: "0 auto" }}>
						<PanelBar>
							<PanelBarItem title="Add Sub Tasks">
								<div className="">
									<div className="row" style={{ margin: '2em' }}>
										<div className="col-lg-2">
											<Button
												onClick={this.addSubTask.bind(this)}
											>Add</Button>
										</div>
									</div>
									{
										this.state.subTasks.map((subTask, index) => {

											return (
												<div className="row justify-content-center" style={{ marginTop: "2em" }}>
													<div className="col-lg-10 justify-content-center panel-wrapper" style={{ maxWidth: "80%", margin: "0 auto" }}>
														<PanelBar>
															<PanelBarItem title={"Sub Task " + (index + 1)}>
																<div className="row">
																	<div className="col-lg-6">
																		<textarea
																			placeholder="Desciption"
																			className="form-control rounded-0"
																			id="exampleFormControlTextarea1"
																			rows="5"
																			style={{ marginTop: '2em' }}
																			index={index}
																			onChange={this.setSubTasKDescription.bind(this)}
																			value={subTask.description}
																		>
																		</textarea>
																	</div>
																	<div className="col-lg-2">
																		<NumericTextBox
																			label="Time Sheet (hrs.)"
																			index={index}
																			pattern={"[1-9]+"}
																			value={subTask.timeSheet}
																			onChange={this.setSubTaskTimeSheet.bind(this)}
																		/>
																	</div>
																	<div className="col-lg-2">
																		<Switch
																			style={{ margin: "1em" }}
																			checked={subTask.specialTask}
																			onChange={this.setSpecialSubTask.bind(this)}
																			index={index}
																		/> Special
																	</div>
																	<div className="col-lg-2">
																		<Button
																			onClick={this.deleteSubTask.bind(this)}
																			index={index}
																		>Remove</Button>
																	</div>
																	
																</div>
															</PanelBarItem>
														</PanelBar>
													</div>
												</div>

											)
										})
									}
								</div>
							</PanelBarItem>

						</PanelBar>
					</div>
				</div>

				<div className="row">
					<div className="coll-lg-2">
						<Button 
							onClick={this.createTask.bind(this)}
						>
						Create Task
						</Button>
					</div>
				</div>
			</div>

		)
	}

}