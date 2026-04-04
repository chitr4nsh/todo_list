export default function TodoForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  status,
  setStatus,
  onSubmit,
}) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      {/* TITLE */}
      <input
        className="border p-2 w-full"
        placeholder="Enter todo title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}
      <textarea
        className="border p-2 w-full"
        placeholder="Enter description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* PRIORITY */}
      <select
        value={priority || ""}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full"
      >
        
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      {/* STATUS */}
      <select
        value={status || ""}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full"
      >
        
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      {/* SUBMIT */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={onSubmit}
      >
        Add Todo
      </button>
    </div>
  );
}