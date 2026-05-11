"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Layout, Plus, LogOut, CheckCircle, ListTodo, Calendar, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Load User and Projects on Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !storedUser.role) {
      router.push("/login");
      return;
    }

    setUser(storedUser);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // 2. Admin Logic: Create New Project
  const handleCreateProject = async () => {
    const name = prompt("Project Name:");
    const description = prompt("Description:");
    if (!name) return;

    try {
      await api.post("/projects", { name, description });
      fetchProjects(); // Refresh list
    } catch (err) {
      alert("Error creating project. Check if you are an ADMIN.");
    }
  };

  // 3. Admin Logic: Add Task to Project
  const handleAddTask = async (projectId: string) => {
    const title = prompt("Task Title:");
    if (!title) return;

    try {
      await api.post("/tasks", { 
        title, 
        projectId, 
        dueDate: new Date().toISOString(), // Default to today
        priority: "MEDIUM" 
      });
      alert("Task added successfully!");
      fetchProjects(); // Refresh to update task count
    } catch (err) {
      alert("Failed to add task.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center mb-10 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Layout className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TeamFlow</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <UserIcon size={12} /> {user?.name} ({user?.role})
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {user?.role === "ADMIN" && (
            <button 
              onClick={handleCreateProject} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-200"
            >
              <Plus size={18} /> <span className="hidden md:inline">New Project</span>
            </button>
          )}
          <button 
            onClick={handleLogout} 
            className="bg-white border border-gray-200 text-gray-600 p-2 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Projects</p>
          <h2 className="text-3xl font-bold text-gray-800">{projects.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">Role Type</p>
          <h2 className="text-3xl font-bold text-blue-600 uppercase text-sm">{user?.role}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">System Status</p>
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <CheckCircle size={20}/> Operational
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <h2 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
        <ListTodo size={20} className="text-blue-500" /> Active Projects
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.length > 0 ? projects.map((p: any) => (
          <div key={p.id} className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Layout size={24} />
              </div>
              <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                In Progress
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-gray-800 mb-2">{p.name}</h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2">{p.description || "No description provided."}</p>
            
            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
              <button 
                onClick={() => alert(`Tasks in ${p.name}: ${p.tasks?.length || 0}`)}
                className="text-gray-700 text-sm font-bold flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Calendar size={16} /> View Tasks ({p.tasks?.length || 0})
              </button>
              
              {user?.role === "ADMIN" && (
                <button 
                  onClick={() => handleAddTask(p.id)}
                  className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> Add Task
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium italic">No projects found. Use "New Project" to start tracking.</p>
          </div>
        )}
      </div>
    </div>
  );
}