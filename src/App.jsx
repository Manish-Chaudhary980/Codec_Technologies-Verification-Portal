import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import certificatesData from './certificates.json';

const App = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    verifierEmail: '',
    trainingDomain: '',
    certificateType: '',
    remark: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'verifying' | 'success' | 'error'
  const [result, setResult] = useState(null);

  useEffect(() => {
    // QR Code / URL Parameter integration
    const params = new URLSearchParams(window.location.search);
    const student = params.get('student');
    const domain = params.get('domain');
    const type = params.get('type');

    if (student || domain || type) {
      setFormData(prev => ({
        ...prev,
        studentName: student || '',
        trainingDomain: domain || '',
        certificateType: type || '',
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('verifying');

    // Simulate API delay
    setTimeout(() => {
      const match = certificatesData.find(
        cert =>
          cert.studentName.toLowerCase() === formData.studentName.toLowerCase() &&
          cert.trainingDomain.toLowerCase() === formData.trainingDomain.toLowerCase() &&
          cert.certificateType.toLowerCase() === formData.certificateType.toLowerCase()
      );

      if (match) {
        setResult(match);
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
          {/* Using a custom div for the top accent bar since Tailwind doesn't do gradient borders easily on a single edge */}
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 w-full" />
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Verified!
            </h1>
            <p className="text-slate-600 mb-6">
              The certificate for <span className="font-bold text-slate-900">{result.studentName}</span> has been successfully verified.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-left mb-6 border border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase mb-3">Verification Details</div>
              <div className="text-sm text-slate-700 space-y-2">
                <p className="leading-relaxed">
                  This is to certify that <span className="font-bold text-slate-900">{result.studentName}</span> has successfully completed their internship as a <span className="font-bold text-purple-600">{result.role}</span>.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-2 text-xs border-t border-slate-200 mt-3">
                  <div>
                    <span className="text-slate-400 block">Domain</span>
                    <span className="font-medium">{result.trainingDomain}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Duration</span>
                    <span className="font-medium">{result.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Certificate ID</span>
                    <span className="font-medium">{result.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Issue Date</span>
                    <span className="font-medium">{result.issueDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setStatus('idle'); setResult(null); }}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md"
            >
              Verify Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border-t-8">
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 w-full" />
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Verification Failed</h1>
            <p className="text-slate-600 mb-6">
              We couldn't find a matching record for the provided details. Please check the information and try again.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 w-full" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-2">
              Codec Technologies
            </h1>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
              Certificate Verification Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                required
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Name on Certificate"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                Verifier Email
              </label>
              <input
                type="email"
                name="verifierEmail"
                required
                value={formData.verifierEmail}
                onChange={handleInputChange}
                placeholder="name@organization.domain"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                Training Domain Name
              </label>
              <select
                name="trainingDomain"
                required
                value={formData.trainingDomain}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-slate-700"
              >
                <option value="">Select Training Domain</option>
                <option value="Python Developer">Python Developer</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                Issue Certificate Type
              </label>
              <select
                name="certificateType"
                value={formData.certificateType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-slate-700"
              >
                <option value="">Select Certificate Type</option>
                <option value="Internship Certificate">Internship Certificate</option>
                <option value="Course Certificate">Course Certificate</option>
                <option value="Offer-Letter">Offer-Letter</option>
                <option value="Letter of Recommendation">Letter of Recommendation</option>
                <option value="Hackathon Certificate">Hackathon Certificate</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                Remark (if any)
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                placeholder="Optional comments..."
                rows="2"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'verifying'}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all uppercase tracking-wider shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'verifying' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
