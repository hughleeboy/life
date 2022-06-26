import React,
	{useState, useContext} from 'react';
import Cell from './Cell';
import {GridContext} from './Contexts';

const GameBoard = (props) => {
	const grid = useContext(GridContext);

	let cells = []
	for(let i=0; i<grid.length; i++){
		for(let j=0; j<grid[0].length; j++){
			cells.push(
			<Cell alive={grid[i][j]} row={i} col={j}
				key={i+','+j}/>
			);
		}
	}

	return <div id='gridContainer' style={{  gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`}}>
	{ cells }
	</div>;
}

export default GameBoard;
