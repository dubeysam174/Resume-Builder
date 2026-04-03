import React, { useEffect, useState } from "react";
import {
  CloudCheckIcon,
  XIcon,
  PlusIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "@/configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#22c55e"];
  const { user, token } = useSelector((state) => state.auth);

  const [allresumes, setAllresumes] = useState([]);
  const [showCreateResume, setshowCreateResume] = useState(false);
  const [showUploadResume, setshowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [deleteResumeId, setDeleteResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllresumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/resumes/create", { title });
      setAllresumes([...allresumes, data.resume]);
      setTitle("");
      setshowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF");

    setIsLoading(true);
    try {
      const resumeText = await pdfToText(file);
      const { data } = await api.post("/api/ai/upload-resume", {
        title,
        resumeText,
      });

      setTitle("");
      setFile(null);
      setshowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResume = async () => {
    try {
      const { data } = await api.delete(`/api/resumes/delete/${deleteResumeId}`);
      setAllresumes((prev) =>
        prev.filter((resume) => resume._id !== deleteResumeId)
      );
      toast.success(data.message);
      setDeleteResumeId("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="mb-8 p-5 rounded-2xl 
bg-indigo-50 dark:bg-indigo-500/10 
border border-indigo-200 dark:border-indigo-400/20 
text-left">

  <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
    Want to check your ATS score?
  </h2>

  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
    Upload your existing resume to analyze your ATS score instantly.  
    Don’t have one? Create a new resume first and then check your score.
  </p>

</div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-6">
          <button
            onClick={() => setshowCreateResume(true)}
            className="w-full sm:w-[220px] h-48 flex flex-col items-center justify-center rounded-2xl gap-3 
            bg-white/60 dark:bg-white/10 backdrop-blur-xl 
            border border-slate-200 dark:border-white/10 
            hover:border-indigo-500 hover:shadow-2xl hover:-translate-y-1 
            transition-all duration-300 group"
          >
            <PlusIcon className="size-6 group-hover:scale-110 transition" />
            <p className="text-sm text-slate-700 dark:text-white group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setshowUploadResume(true)}
            className="w-full sm:w-[220px] h-48 flex flex-col items-center justify-center rounded-2xl gap-3 
            bg-white/60 dark:bg-white/10 backdrop-blur-xl 
            border border-slate-200 dark:border-white/10 
            hover:border-indigo-500 hover:shadow-2xl hover:-translate-y-1 
            transition-all duration-300 group"
          >
            <CloudCheckIcon className="size-6 group-hover:scale-110 transition" />
            <p className="text-sm text-slate-700 dark:text-white group-hover:text-indigo-600">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        {/* EMPTY */}
        {allresumes.length === 0 && (
          <div className="text-center mt-10 text-slate-500 dark:text-gray-400">
            <p className="text-lg">No resumes yet</p>
            <p className="text-sm">Create your first resume 🚀</p>
          </div>
        )}

        {/* CARDS */}
        <div className="flex flex-wrap gap-6">
          {allresumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:w-[180px] h-56 flex flex-col items-center justify-center gap-3 
                rounded-2xl 
                bg-white/50 dark:bg-white/10 backdrop-blur-xl 
                border border-slate-200 dark:border-white/10 
                hover:shadow-2xl hover:-translate-y-1 
                transition-all duration-300 cursor-pointer group"
              >
                <FilePenLineIcon style={{ color: baseColor }} />

                <p className="text-sm font-semibold px-3 text-center truncate text-slate-800 dark:text-white">
                  {resume.title}
                </p>

                <p className="absolute bottom-2 text-[11px] opacity-70 text-slate-600 dark:text-gray-400">
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* ACTIONS */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 hidden group-hover:flex gap-2 
                  bg-white/80 dark:bg-black/70 backdrop-blur-md 
                  px-2 py-1 rounded-lg shadow border border-white/20 dark:border-white/10"
                >
                  <TrashIcon
                    className="size-4 text-red-500 hover:scale-110"
                    onClick={() => setDeleteResumeId(resume._id)}
                  />
                  <PencilIcon className="size-4 text-slate-600 dark:text-white hover:scale-110" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <form
            onSubmit={createResume}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/80 dark:bg-black/70 backdrop-blur-xl 
            p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[400px] 
            border border-white/20 dark:border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
              Create Resume
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg outline-none 
              bg-white dark:bg-white/10 
              border border-slate-200 dark:border-white/10 
              text-black dark:text-white"
            />

            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg">
              Create
            </button>
          </form>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteResumeId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/80 dark:bg-black/70 backdrop-blur-xl 
          p-6 rounded-xl shadow-xl w-[90%] sm:w-[400px] 
          border border-white/20 dark:border-white/10">
            <h2 className="text-lg font-semibold text-center mb-3 text-slate-800 dark:text-white">
              Delete Resume?
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteResumeId("")}
                className="flex-1 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteResume}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <form
            onSubmit={uploadResume}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/80 dark:bg-black/70 backdrop-blur-xl 
            p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[420px] 
            border border-white/20 dark:border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
              Upload Resume
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg outline-none 
              bg-white dark:bg-white/10 
              border border-slate-200 dark:border-white/10 
              text-black dark:text-white"
            />

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg">
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;