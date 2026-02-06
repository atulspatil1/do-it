import { useState } from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(todo.text);

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditText(todo.text);
    }

    const handleSave = () => {
        if(editText.trim() !== '') {
            onEdit(todo.id, editText.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setIsEditing(false);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleSave();
        } else if(e.key === 'Escape') {
            handleCancel();
        }
    }

    if(isEditing) {
        return(
            <li className='editing'>
                <input
                    type='text'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={handleSave}
                    autoFocus
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </li>
        );
    }

    return (
        <li>
            <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span
                style={{ textDecoration : todo.completed ? 'line-through' : 'none'}}
                onDoubleClick={handleDoubleClick}
            >
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    )
}

export default TodoItem;