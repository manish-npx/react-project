import { useReducer, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Edit, Trash } from "lucide-react";

const TYPES = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
};

function todoReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD:
      return [...state, { id: Date.now(), text: action.text, done: false }];

    case TYPES.EDIT:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case TYPES.DELETE:
      return state.filter((todo) => todo.id !== action.id);

    case TYPES.TOGGLE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );

    default:
      return state;
  }
}

function TodoList() {
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [currentEditedText, setCurrentEditedText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      dispatch({ type: TYPES.ADD, text: text.trim() });
      setText("");
    }
  };

  const saveEdit = () => {
    if (currentEditedText.trim()) {
      dispatch({
        type: TYPES.EDIT,
        id: currentEditedId,
        text: currentEditedText.trim(),
      });
      setCurrentEditedId(null);
      setCurrentEditedText("");
    }
  };

  console.log(todoList, "todoList");

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Todo List</h1>
      <div className="mt-6">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Enter your task..."
            className="border p-3 flex-1 rounded text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <ul className="space-y-2 mt-5">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 border p-2 rounded"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch({ type: TYPES.TOGGLE, id: todo.id })}
              />
              {currentEditedId === todo.id ? (
                <div className="flex gap-3">
                  <Input
                    className={"flex-1 border p-1 rounded text-sm"}
                    value={currentEditedText}
                    onChange={(e) => setCurrentEditedText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  />
                  <Button onClick={saveEdit}>Save</Button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <p
                    className={` text-sm ${
                      todo.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                  <div className="flex gap-2">
                    <Edit
                      onClick={() => {
                        setCurrentEditedId(todo.id);
                        setCurrentEditedText(todo.text);
                      }}
                      className="cursor-pointer"
                    />
                    <Trash
                      onClick={() =>
                        dispatch({ type: TYPES.DELETE, id: todo.id })
                      }
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
