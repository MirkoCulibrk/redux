import React from 'react';
import TodoItem from './TodoItem';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import { getTodosAsync } from '../redux/todoSlice';
const TodoList = () => {
	const dispatch=useDispatch();
	// use selector ima pristup statu i moze da izvuce nesto
	const todos=useSelector((state)=>state.todos);
	// treba videti kada updatovati sve
	// znaci kada se sam dispatch promeni odnsono posalje se neka akcija
	// zamisli da se menje dispatch dal add, dal delete treba da se menja ceo state
	useEffect(()=>{
		console.log('s')
		// ovde dajemo kako i sta primamo sa servera
		dispatch(getTodosAsync({
			
		}))
	},[dispatch])

	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
