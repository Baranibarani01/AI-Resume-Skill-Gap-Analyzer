import axios from "axios";
import { useState } from "react";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          AI Resume + Skill Gap Analyzer
        </h1>

        {/* Upload Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full md:w-auto"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="space-y-6">

            {/* Skills */}
            <div className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Extracted Skills</h2>

              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* ATS Score */}
            <div className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">ATS Score</h2>

              <div className="w-full bg-gray-300 rounded-full h-6">
                <div
                  className="bg-green-500 h-6 rounded-full text-white text-center"
                  style={{ width: `${result.ats_score}%` }}
                >
                  {result.ats_score}%
                </div>
              </div>
            </div>

            {/* Job Matches */}
            <div className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Best Matching Job Roles
              </h2>

              {result.job_matches.map((job, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold">{job.role}</h3>

                  <p className="text-green-600 font-medium">
                    Match Score: {job.match_score}%
                  </p>

                  <div className="mt-3">
                    <p className="font-medium mb-1">Matched Skills:</p>

                    <div className="flex flex-wrap gap-2">
                      {job.matched_skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="font-medium mb-1">Missing Skills:</p>

                    <div className="flex flex-wrap gap-2">
                      {job.missing_skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Courses */}
            <div className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Recommended Courses
              </h2>

              {result.courses.length === 0 ? (
                <p>No course recommendations needed.</p>
              ) : (
                result.courses.map((course, index) => (
                  <div
                    key={index}
                    className="mb-3 p-3 bg-gray-100 rounded"
                  >
                    <p className="font-semibold capitalize">
                      {course.skill}
                    </p>
                    <p>{course.course}</p>
                    <p className="text-sm text-gray-600">
                      {course.platform}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Learning Roadmap */}
            <div className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Personalized Learning Roadmap
              </h2>

              {result.roadmap.length === 0 ? (
                <p>No roadmap required.</p>
              ) : (
                result.roadmap.map((step, index) => (
                  <div
                    key={index}
                    className="mb-4 pl-4 border-l-4 border-blue-500"
                  >
                    <p className="font-semibold">
                      Month {step.month}: {step.focus}
                    </p>

                    <p className="text-gray-700">{step.goal}</p>
                  </div>
                ))
              )}
            </div>

            {/* Resume Tips */}
            {result.resume_tips && result.resume_tips.length > 0 && (
              <div className="border p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">
                  Resume Improvement Tips
                </h2>

                <ul>
                  {result.resume_tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-orange-600 mb-2"
                    >
                      • {tip}
                    </li>
                  ))}
                  {/* Interview Questions */}
{result.questions && result.questions.length > 0 && (
  <div className="border p-4 rounded shadow">
    <h2 className="text-xl font-bold mb-4">
      Suggested Interview Questions
    </h2>

    {result.questions.map((item, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-semibold capitalize mb-2">
          {item.skill}
        </h3>

        <ul className="list-disc ml-6 text-gray-700">
          {item.questions.map((q, i) => (
            <li key={i} className="mb-1">
              {q}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}