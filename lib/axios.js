// Mock Axios client representing a fully local database in localStorage
import toast from "react-hot-toast";

// Helper to interact with LocalStorage safely
const getLocalData = (key, defaultVal = []) => {
  if (typeof window === "undefined") return defaultVal;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultVal;
};

const setLocalData = (key, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Simulated latency to mimic a network call
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mockApi = {
  post: async (url, data) => {
    await delay();

    if (url === "/auth/register") {
      const users = getLocalData("mock_users");
      const exists = users.some((u) => u.email === data.email);
      if (exists) {
        throw { response: { data: { message: "User already exists" }, status: 400 } };
      }
      const newUser = { id: Date.now().toString(), name: data.name, email: data.email, password: data.password };
      users.push(newUser);
      setLocalData("mock_users", users);
      return { data: { message: "Registration successful" } };
    }

    if (url === "/auth/login") {
      const users = getLocalData("mock_users");
      const user = users.find((u) => u.email === data.email && u.password === data.password);
      if (!user) {
        throw { response: { data: { message: "Invalid email or password" }, status: 400 } };
      }
      const accessToken = "mock_token_" + Date.now();
      return {
        data: {
          accessToken,
          user: { id: user.id, name: user.name, email: user.email },
          message: "Login successful",
        },
      };
    }

    if (url === "/todos") {
      const todos = getLocalData("mock_todos");
      const currentUser = getLocalData("user", null);
      
      const newTodo = {
        _id: Date.now().toString(),
        userId: currentUser?.id || "anonymous",
        title: data.title,
        description: data.description || "",
        priority: data.priority || "MEDIUM",
        status: data.status || "PENDING",
        dueDate: data.dueDate || "",
        createdAt: new Date().toISOString(),
      };
      
      todos.push(newTodo);
      setLocalData("mock_todos", todos);
      return { data: newTodo };
    }

    throw { response: { data: { message: "Endpoint not found" }, status: 404 } };
  },

  get: async (url, config = {}) => {
    await delay();

    if (url === "/todos") {
      const todos = getLocalData("mock_todos");
      const currentUser = getLocalData("user", null);
      
      // Filter by current user
      let filteredTodos = todos.filter((t) => t.userId === (currentUser?.id || "anonymous"));

      const { search, status, priority, page = 1, limit = 5 } = config.params || {};

      if (search) {
        filteredTodos = filteredTodos.filter(
          (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (status) {
        filteredTodos = filteredTodos.filter((t) => t.status === status);
      }

      if (priority) {
        filteredTodos = filteredTodos.filter((t) => t.priority === priority);
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const paginatedTodos = filteredTodos.slice(startIndex, startIndex + limit);

      return {
        data: {
          data: paginatedTodos,
          total: filteredTodos.length,
          page: Number(page),
          totalPages: Math.ceil(filteredTodos.length / limit),
        },
      };
    }

    throw { response: { data: { message: "Endpoint not found" }, status: 404 } };
  },

  patch: async (url, data) => {
    await delay();

    const todoId = url.replace("/todos/", "");
    const todos = getLocalData("mock_todos");
    const todoIndex = todos.findIndex((t) => t._id === todoId);

    if (todoIndex === -1) {
      throw { response: { data: { message: "Todo not found" }, status: 404 } };
    }

    todos[todoIndex] = { ...todos[todoIndex], ...data };
    setLocalData("mock_todos", todos);
    return { data: todos[todoIndex] };
  },

  delete: async (url) => {
    await delay();

    const todoId = url.replace("/todos/", "");
    const todos = getLocalData("mock_todos");
    const filtered = todos.filter((t) => t._id !== todoId);
    
    setLocalData("mock_todos", filtered);
    return { data: { message: "Deleted successfully" } };
  },

  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
};

export default mockApi;