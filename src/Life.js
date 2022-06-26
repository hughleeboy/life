import React, {useState, useEffect} from 'react';
import GameBoard from './GameBoard';
import SidePanel from './SidePanel';
import {GridContext, ManipulationContext, ExecutionContext} from './Contexts';
import {gliderGun} from './Presets';

const iterateGrid = (grid) => {
	let newGrid = [];
	for(let i=0; i<grid.length; i++){
		let newRow = [];
		for(let j=0; j<grid[0].length; j++){
			let sum=0;
			for(let di=-1; di<=1; di++){
				for(let dj=-1; dj<=1; dj++){
					let iIndex = i+di;
					let jIndex = j+dj;
					if(		iIndex>-1 && iIndex<grid.length
						&& 	jIndex>-1 && jIndex<grid[0].length
						&& grid[iIndex][jIndex]) sum++;
				}
			}
			if(grid[i][j] && (sum==3||sum==4)  ||  !grid[i][j] && sum==3){
				newRow.push(true);
			}else{
				newRow.push(false);
			}
		}
		newGrid.push(newRow);
	}
	return newGrid
};

const Life = (props) => {
	const [grid, setGrid] = useState(new Array(10).fill(0).map(() => new Array(15).fill(false)));
	const [running, setRunning] = useState(false);
	const [speed, setSpeed] = useState(4);

	useEffect( () => {
		if(running){
			const interval = setInterval(() => setGrid(iterateGrid(grid)), 1000/speed);
			return () => {
				clearInterval(interval);
			};
		}
	}, [running, speed, grid]);

	const manipulations = {
		toggleBox: (i,j) => {
			let tempGrid=[...grid]; 
			tempGrid[i][j]=!tempGrid[i][j]; 
			setGrid(tempGrid);
		},
		addRow: () => {
			let tempGrid=[...grid]; 
			let newRow=new Array(grid[0].length).fill(false);
			tempGrid.push(newRow);
			setGrid(tempGrid);
		},
		subRow: () => {
			if(grid.length == 1) return;
			let tempGrid=[...grid]; 
			tempGrid.pop();
			setGrid(tempGrid);
		},
		addCol: () => {
			let tempGrid=[...grid]; 
			for(let i=0; i<tempGrid.length; i++){
				tempGrid[i].push(false);
			}
			setGrid(tempGrid);
		},
		subCol: () => {
			if(grid[0].length == 1) return;
			let tempGrid=[...grid]; 
			for(let i=0; i<tempGrid.length; i++){
				tempGrid[i].pop();
			}
			setGrid(tempGrid);
		},
		toggleExecution: () => {
			setRunning(!running);
		},
		addSpeed: () => {
			setSpeed(speed*3/2);
		},
		subSpeed: () => {
			setSpeed(speed*2/3);
		},
		loadPreset: () => {
			setGrid(gliderGun);
		},
		exportGrid: () => {
			console.log(JSON.stringify(grid));
		},

	};

	return (
		<GridContext.Provider value={grid}>
		<ManipulationContext.Provider value={manipulations}>
		<ExecutionContext.Provider value={{running, speed}}>
			<GameBoard />
			<SidePanel />
		</ExecutionContext.Provider>
		</ManipulationContext.Provider>
		</GridContext.Provider>
	);
};

export default Life;

