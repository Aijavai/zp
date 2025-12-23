import { useState } from "react";

const TodoInput = (props) => {
    const { onAdd } = props;
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(inputValue);
        setInputValue('');
    }
    return (
        <div>
            <form className="todo-input" onSubmit={handleSubmit}>
                <input 
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default TodoInput