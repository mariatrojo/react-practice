import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
	state = {
		persons: [
			{ id: '1', name: 'Max', age: 28 },
			{ id: '2', name: 'Jamie', age: 35 },
			{ id: '3', name: 'Maria', age: 35 }
		], 
		otherState: 'some other value',
		showPersons: false
	}

	// const [ userNameState, setUserNameState ] = useState({
	// 	usernames: [
	// 		{ name: 'Max' }
	// 	]
	// });

	userNameChangedHandler = (event) => {
		this.setState({
			usernames: [
				{ name: event.target.value }
			]
		})
	}

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		// const person = Object.assign({}, this.state.persons[personIndex]);

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({
			persons: persons
		});
	}

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ 
			showPersons: !doesShow
		});
	}

	render(){
		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer'
		}

		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return <Person 
							click={() => this.deletePersonHandler(index)}
							name={person.name} 
							age={person.age} 
							key={person.id}
							changed={(event) => this.nameChangedHandler(event, person.id)}
							/>
					})}
				</div>
			)
		}

		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<p>This is really working!</p>
				<button 
					style={style}
					onClick={this.togglePersonsHandler}>Toggle Persons
				</button>

				{persons}

				{/* <UserInput 
					changed={this.userNameChangedHandler}
					currentName={userNameState.usernames[0].name}
				/>
				<UserOutput 
					userName={userNameState.usernames[0].name}
				/>
				<UserOutput 
					userName={userNameState.usernames[0].name} 
				/>
				<UserOutput 
					userName="Jamie" 
				/> */}
			</div>
		);
	}
	// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'))
}

export default App;
