import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, ChevronDown, CheckCircle2, AlertCircle, BookOpen, Clock, Award, Target, Briefcase, PlayCircle } from 'lucide-react';

export default function ResumeSkillGapAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a resume PDF first.");
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Please try again or check the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const atsScore = result?.ats_score || 0;
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 stroke-emerald-400";
    if (score >= 50) return "text-amber-400 stroke-amber-400";
    return "text-rose-500 stroke-rose-500";
  };

  return (
    <div className="min-h-screen bg-[#140508] text-slate-200 font-sans selection:bg-rose-500/30 overflow-x-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3d0a14] blur-[140px] opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4a0815] blur-[150px] opacity-40" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f0406]/60 border-b border-[#3d0a14]/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-[#800020] flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-rose-200">
              AI Resume Analyzer
            </span>
          </div>
          <button onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2.5 rounded-full bg-rose-950/30 hover:bg-rose-900/40 border border-rose-900/50 transition-all text-sm font-medium text-rose-100">
            Upload Resume
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        {!result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Build Your Dream <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-500 to-[#990026]">
                Career Faster
              </span>
            </h1>
            <p className="text-lg md:text-xl text-rose-100/70 mb-10 leading-relaxed">
              Upload your resume and let our AI instantly analyze your skills, find knowledge gaps, and create a personalized roadmap to land your next big role.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-[#b3002d] hover:from-rose-500 hover:to-[#cc0033] text-white font-semibold shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] transition-all transform hover:scale-105"
              >
                Analyze Resume
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#3d0a14]/30 hover:bg-[#3d0a14]/50 border border-rose-900/50 font-medium transition-all text-rose-100">
                Learn More
              </button>
            </div>
          </motion.div>
        )}

        {/* Upload Section */}
        {!result && !loading && (
          <motion.div 
            id="upload-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative group p-12 rounded-3xl border-2 border-dashed transition-all duration-500 backdrop-blur-xl
                ${file ? 'border-rose-500/60 bg-rose-500/10' : 'border-rose-900/50 bg-[#2a050d]/40 hover:border-rose-500/60 hover:bg-[#3d0a14]/40'}
              `}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/10 to-[#990026]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="w-20 h-20 mb-6 rounded-2xl bg-[#3d0a14]/60 border border-rose-900/50 flex items-center justify-center transition-transform duration-300 shadow-[0_0_30px_rgba(225,29,72,0.15)]"
                >
                  {file ? <FileText className="w-10 h-10 text-rose-400" /> : <Upload className="w-10 h-10 text-rose-400" />}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2 text-rose-50">
                  {file ? file.name : "Upload your resume"}
                </h3>
                <p className="text-rose-200/60 mb-8">
                  {file ? "Ready to analyze!" : "Drag & drop your PDF file here, or click to browse"}
                </p>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setError('');
                  }}
                />
                
                <div className="flex gap-4">
                  <label 
                    htmlFor="file-upload"
                    className="cursor-pointer px-6 py-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 font-medium transition-all text-rose-100"
                  >
                    Browse Files
                  </label>
                  {file && (
                    <motion.button 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={handleAnalyze}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-[#b3002d] hover:from-rose-500 hover:to-[#cc0033] text-white font-bold transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                    >
                      Start Analysis
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mt-6 p-4 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center gap-3 text-red-200 shadow-lg"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="relative w-28 h-28 mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-rose-500" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-r-2 border-rose-300" 
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-b-2 border-rose-700" 
              />
              <Target className="absolute inset-0 m-auto w-10 h-10 text-rose-400 animate-pulse" />
            </div>
            <motion.h2 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-600"
            >
              Analyzing your resume...
            </motion.h2>
            <p className="text-rose-200/60 mt-2">Extracting skills, computing ATS score, and generating insights</p>
          </motion.div>
        )}

        {/* Results Dashboard */}
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.1 }}
            className="space-y-8"
          >
            <motion.div className="flex items-center justify-between mb-12 flex-wrap gap-4">
              <h2 className="text-4xl font-bold text-rose-50">Analysis Dashboard</h2>
              <button 
                onClick={() => { setResult(null); setFile(null); }}
                className="px-4 py-2 rounded-lg bg-[#3d0a14]/40 hover:bg-[#3d0a14]/70 border border-rose-900/50 text-sm font-medium transition-all text-rose-200"
              >
                Start Over
              </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ATS Score Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1 bg-[#1a0508]/60 backdrop-blur-xl border border-rose-900/30 rounded-3xl p-8 relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-rose-900/60 transition-colors duration-500"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 blur-[60px] rounded-full group-hover:bg-rose-500/20 transition-all duration-700" />
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-rose-100">
                  <Award className="w-5 h-5 text-rose-400" />
                  ATS Match Score
                </h3>
                
                <div className="flex flex-col items-center justify-center py-6 relative z-10">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" 
                        stroke="rgba(225,29,72,0.1)" 
                        strokeWidth="8" 
                      />
                      <motion.circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" 
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={getScoreColor(atsScore)}
                        initial={{ strokeDasharray: "0 251.2" }}
                        animate={{ strokeDasharray: `${(atsScore / 100) * 251.2} 251.2` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="text-5xl font-bold"
                      >
                        {atsScore}
                      </motion.span>
                      <span className="text-sm text-rose-200/50 mt-1">/ 100</span>
                    </div>
                  </div>
                  <p className="text-center mt-6 text-rose-200/80">
                    {atsScore >= 80 ? "Excellent! Your resume is highly optimized." : 
                     atsScore >= 50 ? "Good, but there is room for improvement." : 
                     "Needs work. Focus on adding missing keywords."}
                  </p>
                </div>
              </motion.div>

              {/* Skills Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 bg-[#1a0508]/60 backdrop-blur-xl border border-rose-900/30 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-rose-900/60 transition-colors duration-500"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-rose-100">
                  <CheckCircle2 className="w-5 h-5 text-rose-400" />
                  Detected Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(Array.isArray(result.skills) 
                    ? result.skills 
                    : result.skills?.split(/(?=[A-Z])|,|\s+/) || []
                  ).filter(Boolean).map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.03 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-full bg-rose-950/50 border border-rose-800/40 text-rose-200 text-sm font-medium hover:bg-rose-900/60 hover:border-rose-600/60 hover:shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all cursor-default"
                    >
                      {typeof skill === 'string' ? skill.trim() : skill}
                    </motion.span>
                  ))}
                  {(!result.skills || result.skills.length === 0) && (
                    <p className="text-rose-200/50">No skills detected.</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Job Matches */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-rose-50">
                <Briefcase className="w-6 h-6 text-rose-400" />
                Target Job Matches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.job_matches?.length > 0 ? result.job_matches.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-[#1a0508]/60 backdrop-blur-sm border border-rose-900/30 hover:border-rose-500/50 rounded-2xl p-6 group transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.15)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h4 className="text-lg font-bold text-rose-100 group-hover:text-rose-300 transition-colors">{job.role}</h4>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        {job.match_score}% Match
                      </span>
                    </div>
                    
                    <div className="mt-4 relative z-10">
                      <p className="text-sm text-rose-200/60 mb-2">Missing Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.missing_skills?.map((skill, i) => (
                          <span key={i} className="px-2 py-1 rounded-md bg-rose-950/80 text-rose-300 text-xs border border-rose-800/50">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <p className="text-rose-200/50 col-span-full">No job matches found.</p>
                )}
              </div>
            </motion.div>

            {/* Roadmap & Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              
              {/* Timeline */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-[#1a0508]/60 backdrop-blur-xl border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <h3 className="text-xl font-semibold mb-8 flex items-center gap-2 text-rose-100">
                  <Clock className="w-5 h-5 text-rose-400" />
                  Upskill Roadmap
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-500/50 before:to-transparent">
                  {(result.roadmap?.length > 0 ? result.roadmap : [
                    { month: "1", focus: "Master Core Skills", goal: "Focus on foundational concepts for your target role." },
                    { month: "2", focus: "Advanced Concepts", goal: "Dive deeper into complex topics and build projects." },
                    { month: "3", focus: "Interview Prep", goal: "Practice problem solving and system design." }
                  ]).map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-rose-900/50 bg-[#2a050d] group-hover:border-rose-500/80 group-hover:bg-rose-950 text-rose-300 group-hover:text-rose-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all z-10">
                        <span className="text-sm font-bold">{i+1}</span>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-900/30 bg-[#2a050d]/30 group-hover:border-rose-800/60 group-hover:bg-[#3d0a14]/40 transition-all">
                        <span className="text-rose-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                          Month {step.month}
                        </span>
                        <h4 className="font-bold text-rose-100">{step.focus}</h4>
                        <p className="text-sm text-rose-200/60 mt-1">{step.goal}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Courses */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-[#1a0508]/60 backdrop-blur-xl border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-rose-100">
                  <BookOpen className="w-5 h-5 text-rose-400" />
                  Recommended Courses
                </h3>
                <div className="space-y-4">
                  {(result.courses?.length > 0 ? result.courses : [
                    { skill: "Core Skills", course: "Advanced Certification in relevant field", platform: "Coursera" },
                    { skill: "Missing Tools", course: "Mastering required tools and frameworks", platform: "Udemy" }
                  ]).map((course, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.02, x: -5 }}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-[#2a050d]/30 border border-rose-900/30 hover:border-rose-500/40 hover:bg-[#3d0a14]/40 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center shrink-0 group-hover:bg-rose-900 group-hover:border-rose-500/50 transition-colors">
                        <PlayCircle className="w-6 h-6 text-rose-400 group-hover:text-rose-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-rose-100 group-hover:text-rose-300 transition-colors">{course.course}</h4>
                        <p className="text-sm text-rose-200/60 flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-rose-950 border border-rose-800/50 px-2 py-0.5 rounded uppercase tracking-wide text-rose-300">{course.skill}</span>
                          • {course.platform}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Interview Questions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 bg-[#1a0508]/60 backdrop-blur-xl border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
               <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-rose-100">
                  <Target className="w-5 h-5 text-rose-400" />
                  Interview Prep
                </h3>
                <div className="grid gap-4">
                  {(result.questions?.length > 0 ? result.questions : [
                    { skill: "General", q: "Tell me about your experience and how it aligns with this role." },
                    { skill: "Problem Solving", q: "Describe a complex problem you solved recently." }
                  ]).map((item, i) => (
                    <motion.details 
                      key={i} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="group bg-[#2a050d]/30 border border-rose-900/40 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden hover:border-rose-800/60 transition-colors"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-medium hover:bg-[#3d0a14]/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800/50 text-rose-400 text-[10px] font-bold uppercase tracking-wider">{item.skill || 'General'}</span>
                          <span className="text-rose-100">{item.q || item}</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-rose-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="p-5 pt-0 text-rose-200/70 text-sm border-t border-rose-900/40 mt-2 bg-[#2a050d]/10">
                        <p>Focus your answer on explaining the core concept clearly, providing a real-world example, and mentioning any edge cases or performance implications.</p>
                      </div>
                    </motion.details>
                  ))}
                </div>
            </motion.div>

          </motion.div>
        )}
      </main>
    </div>
  );
}