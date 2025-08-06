"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Loading spinner icon

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/Tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6 pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Agent Task Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="animate-spin text-blue-400 w-10 h-10" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-10">
          No tasks available
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-lg rounded-xl p-5 border border-gray-700 hover:shadow-xl hover:border-gray-600 transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {t.agentId?.userName || "Unknown Agent"}
                  </h2>
                  <p className="text-sm text-gray-400">{t.agentId?.email}</p>
                </div>
                <span className="bg-blue-900 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                  {t.tasks.length} Tasks
                </span>
              </div>

              <ul className="space-y-3">
                {t.tasks.map((taskItem, i) => (
                  <li
                    key={i}
                    className="p-3 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition"
                  >
                    <p className="text-sm font-medium text-gray-100">
                      {taskItem.FirstName || "Unnamed"}
                    </p>
                    <p className="text-xs text-gray-400">
                      📞 {taskItem.Phone || "No phone"}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      📝 {taskItem.Notes || "No notes provided"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
