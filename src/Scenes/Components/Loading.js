import React, { Component } from 'react';

export default class Loading extends Component {


	render() {

		return	(
			<div class="k-loading-mask">
				<span class="k-loading-text">Loading</span>
				<div class="k-loading-image"></div>
				<div class="k-loading-color"></div>
			</div>
		)


	}
}