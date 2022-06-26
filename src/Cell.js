import React,
	{useState, useContext} from 'react';
import {ManipulationContext} from './Contexts';

const Cell = (props) => {
	const manipulations = useContext(ManipulationContext);

	return <div className={'grid-item ' + (props.alive ? 'alive' : 'dead')} onMouseDown={() => manipulations.toggleBox(props.row, props.col)}></div>
}

export default Cell;
