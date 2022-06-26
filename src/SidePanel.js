import React,
	{useState, useContext} from 'react';
import {ManipulationContext, GridContext, ExecutionContext} from './Contexts';

const SidePanel = (props) => {
	const manipulations = useContext(ManipulationContext);
	const grid = useContext(GridContext);
	const execution = useContext(ExecutionContext);

	return (
		<div id={'sidePanel'}>
			<button className='button' onClick={() => manipulations.toggleExecution()}>
				<strong> {execution.running ? 'Pause' : 'Start'} </strong>
			</button>

			<button className='button label'> {'Rows: ' + grid.length}</button>
			<button className='button half' onClick={() => manipulations.subRow()}>-</button>
			<button className='button half' onClick={() => manipulations.addRow()}>+</button>

			<button className='button label'> {'Cols: ' + grid[0].length}</button>
			<button className='button half' onClick={() => manipulations.subCol()}>-</button>
			<button className='button half' onClick={() => manipulations.addCol()}>+</button>

			<button className='button label'> {'Spd: ' + execution.speed.toFixed(1)}</button>
			<button className='button half' onClick={() => manipulations.subSpeed()}>-</button>
			<button className='button half' onClick={() => manipulations.addSpeed()}>+</button>

			<button className='button' onClick={() => manipulations.exportGrid()}>Export</button>
			<button className='button' onClick={() => manipulations.loadPreset()}>Preset</button>
		</div>
	);
}

export default SidePanel;
