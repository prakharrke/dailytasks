import React, { Component } from 'react';
import { Button, ButtonGroup, SplitButton, SplitButtonItem, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'
import { MultiSelect, AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import Menu from '@material-ui/icons/Menu';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Input, NumericTextBox, Switch } from '@progress/kendo-react-inputs';
import axios from 'axios';
import * as Constants from '../Constants'


export default class Task extends Component {

	constructor(props) {

		super(props);
		this.state = {

			taskID: '',
			taskArray: []
		}
	}

	componentWillMount() {

		var taskID = this.props.match.params.taskID

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

		axios.post(Constants.url + 'GetTaskDetails', `taskID=${taskID}`, {

			headers: {
				'Authorization': 'Bearer ' + jwt
			}
		}).then(response => {

			console.log(response.data)
			this.setState({

				...this.state,
				taskArray: response.data
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
				{this.state.taskArray.length > 0 &&
					<div>
						<div className="row">
							<div className="col-lg-10">
								<Input
									label="Title"
									disabled={true}
									style={{ width: '100%' }}
									value={this.state.taskArray[0].taskName}
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
									disabled={true}
								//value={this.state.taskArray[0]!=undefined ? this.state.taskArray[0].title : ''  }
								>
								</textarea>
							</div>
						</div>
						<div className="row" >
							<div className="col-lg-2" style={{ margin: '2em' }}>
								<DropDownList
									label="Status"
									disabled={true}
									data={['Open', 'Close']}
									//onChange={this.setStatus.bind(this)}
									value={this.state.taskArray[0].taskStatus}

								/>
							</div>
							<div className="col-lg-2" style={{ margin: '2em' }}>
								<DropDownList
									label="Category"
									disabled={true}
									data={['Plugin', 'DBTest']}
									//onChange={this.setCategory.bind(this)}
									value={this.state.taskArray[0].taskCategory}
								/>
							</div>
						</div>
						{
							this.state.taskArray.map((task, index) => {

								if (task.subTaskID != null && task.subTaskID != undefined) {

									return (

										<div className="row">
											<div className="col-lg-10">
												<PanelBar>
													<PanelBarItem title={"Sub Task " + (index + 1)}>
														<div className="row">
															<div className="col-lg-2">
																<Switch
																	checked={task.special == 'y' ? true : false}
																/>
																<code>Special Task</code>
															</div>
															<div className="col-lg-2">
																{
																	task.reviewed == 'N' && task.special == 'y' &&

																	<code>Not Reviewed </code>
																}
															</div>
															<div className="col-lg-2">
																<code>Time Sheet: {task.timeSheet} h</code>
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
																	disabled={true}
																value={task.subTaskDescription}
																>
																</textarea>
															</div>
														</div>
													</PanelBarItem>
												</PanelBar>
											</div>
										</div>

									)
								}
							})
						}
					</div>


				}

			</div>
		)
	}
}