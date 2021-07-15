import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

export const getTodosAsync=createAsyncThunk(
    'todos/getTodosAsync',
    async()=>{
        const response=await fetch('http://localhost:7000/todos');
        console.log(response);
        if(response.ok){
            const todos=await response.json();
            return {todos}
        }
    }
);
export const addTodoAsync=createAsyncThunk(
    'todos/addTodoAsync',
    async(payload)=>{
        const response=await fetch('http://localhost:7000/todos',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                title:payload.title
                }
            )
        });
        if(response.ok){
            const todo=await response.json();
            return {todo};
        }
    }
);
export const toggleTodoAsync=createAsyncThunk(
    'todos/toggleTodoAsync',
    async(payload)=>{
        const response=await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                        completed:payload.completed
                    }
                )
            }
        );
        if(response.ok){
            const todo=await response.json();
            return {id:todo.id,completed:todo.completed};
        }
    }
);
export const deleteTodoAsync=createAsyncThunk(
    'todos/deleteTodoAsync',
    async(payload)=>{
        const response=await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        );
        if(response.ok){
            return {id:payload.id};
        }
    }
)
const initialState=[];

const todoSlice=createSlice({
    name:'todos',
    initialState,
    reducers:{
        addTodo:function(state,action){
            const todo={
                id:action.payload.id,
                title:action.payload.title,
                completed:action.payload.completed,
            }
            state.push(todo);
        },
        deleteTodo:(state,action)=>{
            
        },
        toggleCompletedTodo:(state,action)=>{
            const index=state.findIndex((todo)=>todo.id===action.payload.id);
            state[index].completed=action.payload.completed;
        }
    },
    extraReducers:{
        [getTodosAsync.pending]:(state,action)=>{
            console.log('fetching data');
        },
        [getTodosAsync.fulfilled]:(state,action)=>{
            console.log('fetching is finished');
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]:(state,action)=>{
            console.log('sending data');
            state.push(action.payload.todo);
        },
        [toggleTodoAsync.fulfilled]:(state,action)=>{
            const index=state.findIndex((todo)=>todo.id===action.payload.id);
            state[index].completed=action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]:(state,action)=>{
            return state.filter((todo)=>todo.id !==action.payload.id);
        }
    }
});
export const {addTodo,deleteTodo,toggleCompletedTodo}=todoSlice.actions;
export default todoSlice.reducer;