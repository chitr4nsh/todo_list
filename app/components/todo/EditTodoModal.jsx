export default function EditTodoModal({
  todo,
  setTodo,
  onSave,
  onClose,
}) {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80 relative space-y-3">

        {/* CLOSE BUTTON */}
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg">Edit Todo</h3>

        {/* TITLE */}
        <input
          className="border p-2 w-full"
          value={todo.title}
          onChange={(e) =>
            setTodo({ ...todo, title: e.target.value })
          }
        />
        {/* DESCRIPTION */}
        <textarea
          className="border p-2 w-full"      
             value={todo.description}     
                onChange={(e) =>      
                  setTodo({ ...todo, description: e.target.value })      
                      }    
                          />                                              
        {/* PRIORITY */}
        <select
          className="border p-2 w-full"
          value={todo.priority}
          onChange={(e) =>
            setTodo({ ...todo, priority: e.target.value })
          }
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        {/* STATUS */}
        <select
          className="border p-2 w-full"
          value={todo.status}
          onChange={(e) =>
            setTodo({ ...todo, status: e.target.value })
          }
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 w-full rounded"
            onClick={onSave}
          >
            Save
          </button>

          <button
            className="bg-gray-300 px-4 py-2 w-full rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}