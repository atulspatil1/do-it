import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onAddTodo(inputValue);
      setInputValue("");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="input-todo">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder="Enter todo"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default TodoForm;
