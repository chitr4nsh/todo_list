export default function TodoCard({
  todo,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between">
      <div>
        <h3 className="font-bold">{todo.title}</h3>
        <p className="text-sm">
          {todo.status} | {todo.priority}
        </p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onEdit(todo)}>Edit</button>

        <button
          onClick={() =>
            onToggle(todo._id, todo.status)
          }
          className="bg-green-500 text-white px-2"
        >
          Toggle
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white px-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}