import React, { Component } from 'react';
import { Button, ButtonGroup, SplitButton, SplitButtonItem, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'
import { MultiSelect, AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import Menu from '@material-ui/icons/Menu';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import NewOrdinaryTask from './Components/NewOrdinaryTask'
export default class NewTask extends Component{

	constructor(props){
		super(props);
		this.state={
			selected : 0
		}
	}

	handleSelect = (e) => {
		this.setState({ selected: e.selected })
	}

	render(){
		return(

			<div className="container-fluid" style={{ marginTop: "2em", marginBottom: '5em' }}>
				<div className="row">
					<div className="col-lg-12">
						<TabStrip selected={this.state.selected} onSelect={this.handleSelect.bind(this)}>
						<TabStripTab title="Task">
							<NewOrdinaryTask />
						</TabStripTab>
						<TabStripTab title="Special Task"></TabStripTab>
						</TabStrip>
					</div>
				</div>
			</div>

			)
	}
}