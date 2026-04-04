export default function Pagination({ page, setPage }) {
  return (
    <div className="flex gap-2">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span>{page}</span>

      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}