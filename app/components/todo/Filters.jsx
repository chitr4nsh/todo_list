export default function Filters({
  setSearch,
  setStatus,
  setPriority,
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      <input
        className="border p-2"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <select onChange={(e) => setPriority(e.target.value)}>
        <option value="">All Priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
    </div>
  );
}