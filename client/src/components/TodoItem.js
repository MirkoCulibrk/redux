import React from 'react';
import {useDispatch} from 'react-redux';
// kupimo sad reducer 
import {deleteTodoAsync,toggleCompletedTodo,toggleTodoAsync} from '../redux/todoSlice';
const TodoItem = ({ id, title, completed }) => {
	const dispatch=useDispatch();
	const onDelete=()=>{
		console.log('s')
		// saljemo tacno akciju kojuu zelimo
		dispatch(deleteTodoAsync({
			id:id
		}))
	};
	const toogleCompleted=()=>{
		dispatch(toggleTodoAsync({
			id:id,
			completed:!completed
		}))
	}
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onClick={toogleCompleted}></input>
					{title}
				</span>
				<button className='btn btn-danger' onClick={onDelete}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
