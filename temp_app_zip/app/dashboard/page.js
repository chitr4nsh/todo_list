// /


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import Navbar from "@/app/components/Navbar";
// import api from "@/lib/axios";

// export default function DashboardPage() {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   // 🔐 USER
//   const [user, setUser] = useState(null);

//   // 📝 FORM
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("LOW");
//   const [status, setStatus] = useState("PENDING");
//   const [dueDate, setDueDate] = useState("");

//   // 🔍 SEARCH + FILTERS
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterPriority, setFilterPriority] = useState("");

//   // 📄 PAGINATION
//   const [page, setPage] = useState(1);

//   // ✏️ EDIT MODAL
//   const [editingTodo, setEditingTodo] = useState(null);

//   // 🔐 AUTH
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const storedUser = localStorage.getItem("user");

//     if (!token) return router.push("/login");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, [router]);

//   // 📥 FETCH TODOS
//   const { data, isLoading } = useQuery({
//     queryKey: ["todos", search, filterStatus, filterPriority, page],
//     queryFn: async () => {
//       const res = await api.get("/todos", {
//         params: {
//           search,
//           status: filterStatus,
//           priority: filterPriority,
//           page,
//           limit: 5,
//         },
//       });
//       return res.data;
//     },
//     refetchOnWindowFocus: false,
//   });

//   // ➕ CREATE
//   const createMutation = useMutation({
//     mutationFn: (data) => api.post("/todos", data),
//     onSuccess: () => {
//       toast.success("Created");
//       setTitle("");
//       setDescription("");
//       queryClient.invalidateQueries(["todos"]);
//     },
//   });

//   // ❌ DELETE
//   const deleteMutation = useMutation({
//     mutationFn: (id) => api.delete(`/todos/${id}`),
//     onSuccess: () => {
//       toast.success("Deleted");
//       queryClient.invalidateQueries(["todos"]);
//     },
//   });

//   // 🔁 UPDATE
//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) =>
//       api.patch(`/todos/${id}`, data),
//     onSuccess: () => {
//       toast.success("Updated");
//       setEditingTodo(null);
//       queryClient.invalidateQueries(["todos"]);
//     },
//   });

//   return (
//     <main className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-6 space-y-6">
//         {/* USER */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="font-bold">Welcome</h2>
//           <p>{user?.name}</p>
//         </div>

//         {/* CREATE */}
//         <div className="bg-white p-4 rounded shadow space-y-2">
//           <input
//             className="border p-2 w-full"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <textarea
//             className="border p-2 w-full"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => {
//               if (!title.trim()) return toast.error("Title required");

//               createMutation.mutate({
//                 title,
//                 description,
//                 priority,
//                 status,
//                 dueDate,
//               });
//             }}
//           >
//             Add
//           </button>
//         </div>

//         {/* FILTERS */}
//         <div className="flex gap-2">
//           <input
//             className="border p-2"
//             placeholder="Search"
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select onChange={(e) => setFilterStatus(e.target.value)}>
//             <option value="">All Status</option>
//             <option value="PENDING">PENDING</option>
//             <option value="COMPLETED">COMPLETED</option>
//           </select>

//           <select onChange={(e) => setFilterPriority(e.target.value)}>
//             <option value="">All Priority</option>
//             <option value="LOW">LOW</option>
//             <option value="HIGH">HIGH</option>
//           </select>
//         </div>

//         {/* LIST */}
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           data?.data?.map((todo) => (
//             <div
//               key={todo._id}
//               className="bg-white p-4 rounded shadow flex justify-between"
//             >
//               <div>
//                 <h3>{todo.title}</h3>
//                 <p>{todo.status}</p>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setEditingTodo(todo)}
//                   className="bg-yellow-400 px-2"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => {
//                     if (confirm("Delete?")) {
//                       deleteMutation.mutate(todo._id);
//                     }
//                   }}
//                   className="bg-red-500 text-white px-2"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}

//         {/* PAGINATION */}
//         <div className="flex gap-2">
//           <button onClick={() => setPage((p) => p - 1)}>Prev</button>
//           <span>{page}</span>
//           <button onClick={() => setPage((p) => p + 1)}>Next</button>
//         </div>

//         {/* EDIT MODAL */}
//         {editingTodo && (
//           <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded space-y-3">
//               <h3>Edit Todo</h3>

//               <input
//                 value={editingTodo.title}
//                 onChange={(e) =>
//                   setEditingTodo({
//                     ...editingTodo,
//                     title: e.target.value,
//                   })
//                 }
//               />

//               <button
//                 onClick={() =>
//                   updateMutation.mutate({
//                     id: editingTodo._id,
//                     data: editingTodo,
//                   })
//                 }
//               >
//                 Save
//               </button>

//               <button onClick={() => setEditingTodo(null)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import Navbar from "@/app/components/Navbar";
import api from "@/lib/axios";

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 🔐 USER
  const [user, setUser] = useState(null);

  // 📝 CREATE FORM
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("PENDING");
  const [dueDate, setDueDate] = useState("");

  // 🔍 SEARCH + FILTERS
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // 📄 PAGINATION
  const [page, setPage] = useState(1);

  // ✏️ EDIT MODAL
  const [editingTodo, setEditingTodo] = useState(null);

  // 🔐 AUTH
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (!token) return router.push("/login");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [router]);

  // 🔁 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 📥 FETCH TODOS
  const { data, isLoading } = useQuery({
    queryKey: ["todos", debouncedSearch, filterStatus, filterPriority, page],
    queryFn: async () => {
      const res = await api.get("/todos", {
        params: {
          search: debouncedSearch,
          status: filterStatus,
          priority: filterPriority,
          page,
          limit: 5,
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  // ➕ CREATE
  const createMutation = useMutation({
    mutationFn: (data) => api.post("/todos", data),
    onSuccess: () => {
      toast.success("Todo created");

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("PENDING");
      setDueDate("");

      queryClient.invalidateQueries(["todos"]);
    },
    onError: () => toast.error("Create failed"),
  });

  // ❌ DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/todos/${id}`),
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // 🔁 UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      api.patch(`/todos/${id}`, data),
    onSuccess: () => {
      toast.success("Updated");
      setEditingTodo(null);
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // 🔁 TOGGLE
  const toggleMutation = useMutation({
    mutationFn: ({ id, status }) =>
      api.patch(`/todos/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* USER */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Welcome</h2>
          <p>{user?.name}</p>
        </div>

        {/* CREATE */}
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h3 className="font-bold">Create Todo</h3>

          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <input
            type="date"
            className="border p-2 w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (!title.trim()) return toast.error("Title required");

              createMutation.mutate({
                title,
                description,
                priority,
                status,
                dueDate,
              });
            }}
          >
            Add Todo
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap">
          <input
            className="border p-2"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          <select onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="LOW">LOW</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        {/* LIST */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.data?.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{todo.title}</h3>
                <p className="text-sm">
                  {todo.status} | {todo.priority}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTodo(todo)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    toggleMutation.mutate({
                      id: todo._id,
                      status:
                        todo.status === "COMPLETED"
                          ? "PENDING"
                          : "COMPLETED",
                    })
                  }
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Toggle
                </button>

                <button
                  onClick={() => {
                    if (confirm("Delete this todo?")) {
                      deleteMutation.mutate(todo._id);
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {/* PAGINATION */}
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>{page}</span>

          <button onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>

        {/* EDIT MODAL */}
        {editingTodo && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded space-y-4 w-80">
              <h3 className="font-bold">Edit Todo</h3>

              <input
                className="border p-2 w-full"
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                className="border p-2 w-full"
                value={editingTodo.description || ""}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    description: e.target.value,
                  })
                }
              />

              <select
                className="border p-2 w-full"
                value={editingTodo.priority}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    priority: e.target.value,
                  })
                }
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              <select
                className="border p-2 w-full"
                value={editingTodo.status}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    status: e.target.value,
                  })
                }
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                onClick={() =>
                  updateMutation.mutate({
                    id: editingTodo._id,
                    data: {
                      title: editingTodo.title,
                      description: editingTodo.description,
                      priority: editingTodo.priority,
                      status: editingTodo.status,
                    },
                  })
                }
              >
                Save
              </button>

              <button
                className="bg-gray-300 px-4 py-2 rounded w-full"
                onClick={() => setEditingTodo(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}