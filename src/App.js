import './tailwind-classes.css';
import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle, AlertCircle, Trash2, Globe, Plane, ChevronDown, Download, Eye } from 'lucide-react';

export default function VisaFormFiller() {
  const [step, setStep] = useState('select');
  const [apiKey] = useState('DEMO_MODE');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [requiredForms, setRequiredForms] = useState([]);
  const [filledForms, setFilledForms] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentProcessing, setCurrentProcessing] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');

  const countries = [
    { 
      code: 'SCHENGEN', 
      name: 'Schengen Area', 
      flag: '🇪🇺',
      description: '26 European countries including France, Germany, Italy, Spain'
    },
    { 
      code: 'CA', 
      name: 'Canada', 
      flag: '🇨🇦',
      description: 'Visitor visa and work permit applications'
    },
    { 
      code: 'UK', 
      name: 'United Kingdom', 
      flag: '🇬🇧',
      description: 'Standard Visitor visa for tourism and business'
    }
  ];

  const visaTypes = {
    'SCHENGEN': ['Tourist Visa (Short Stay)', 'Business Visa (Short Stay)', 'Family Visit'],
    'CA': ['Visitor Visa (TRV)', 'Work Permit', 'Study Permit'],
    'UK': ['Standard Visitor Visa', 'Business Visitor', 'Family Visitor']
  };

  const getRequiredForms = async (country, visaType) => {
    setLoading(true);
    setCurrentProcessing('Fetching required forms...');
    
    setTimeout(() => {
      const mockForms = [
        {
          formName: "Visa Application Form",
          description: "Main application form for visa",
          fields: ["fullName", "dateOfBirth", "passportNumber", "nationality", "email", "phone", "address"]
        },
        {
          formName: "Travel Information Form",
          description: "Details about your travel plans",
          fields: ["purposeOfVisit", "travelDates", "accommodation", "emergencyContact"]
        },
        {
          formName: "Financial Declaration",
          description: "Proof of financial means",
          fields: ["occupation", "employer", "monthlyIncome", "bankName"]
        }
      ];
      setRequiredForms(mockForms);
      setLoading(false);
      setStep('upload');
    }, 1500);
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    setSelectedVisaType('');
  };

  const handleVisaTypeSelect = (visaType) => {
    setSelectedVisaType(visaType);
  };

  const handleProceed = () => {
    if (selectedCountry && selectedVisaType) {
      getRequiredForms(
        countries.find(c => c.code === selectedCountry)?.name,
        selectedVisaType
      );
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      file: file,
      status: 'uploaded'
    }));
    setUploadedDocs([...uploadedDocs, ...newDocs]);
  };

  const processAllDocuments = async () => {
    if (uploadedDocs.length === 0) {
      setError('Please upload at least one document');
      return;
    }

    setStep('processing');
    setError('');
    
    setTimeout(() => {
      const mockExtractedText = "John Smith, born 1990-05-15, passport US123456789, john.smith@email.com, +1-555-0123, 123 Main St, New York, NY 10001, Software Engineer at Tech Corp";
      fillAllForms(mockExtractedText);
    }, 2000);
  };

  const fillAllForms = async (extractedText) => {
    const filled = {};
    
    for (let form of requiredForms) {
      setCurrentProcessing(`Filling ${form.formName}...`);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = {
        fullName: "John Smith",
        dateOfBirth: "1990-05-15",
        passportNumber: "US123456789",
        nationality: "United States",
        email: "john.smith@email.com",
        phone: "+1-555-0123",
        address: "123 Main St",
        city: "New York",
        zipCode: "10001",
        occupation: "Software Engineer",
        employer: "Tech Corp",
        purposeOfVisit: "Tourism",
        travelDates: "2025-06-01 to 2025-06-15",
        emergencyContact: "+1-555-9999",
        accommodation: "Hotel Renaissance",
        monthlyIncome: "$5000",
        bankName: "Chase Bank"
      };
      
      const formData = {};
      form.fields.forEach(field => {
        formData[field] = mockData[field] || null;
      });
      
      filled[form.formName] = formData;
    }
    
    setFilledForms(filled);
    setStep('review');
    setLoading(false);
  };

  const handleFieldChange = (formName, fieldName, value) => {
    setFilledForms(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        [fieldName]: value
      }
    }));
  };

  const handleSubmit = () => {
    setStep('complete');
  };

  const handleReset = () => {
    setStep('select');
    setSelectedCountry('');
    setSelectedVisaType('');
    setUploadedDocs([]);
    setRequiredForms([]);
    setFilledForms({});
    setError('');
  };

  const removeDocument = (docId) => {
    setUploadedDocs(uploadedDocs.filter(doc => doc.id !== docId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {showWaitlist && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
                <p className="text-gray-600">Get notified when we launch real document processing</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (email) {
                      alert(`Thanks! We'll notify you at ${email} when we launch!`);
                      setShowWaitlist(false);
                      setEmail('');
                    }
                  }}
                  disabled={!email}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
                >
                  Join Waitlist
                </button>
                <button
                  onClick={() => setShowWaitlist(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Form Preview</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedVisaType} - {countries.find(c => c.code === selectedCountry)?.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-8">
                  {requiredForms.map((form, formIdx) => (
                    <div key={formIdx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="mb-4 pb-3 border-b border-gray-300">
                        <h3 className="text-xl font-bold text-gray-900">{form.formName}</h3>
                        <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form.fields.map(field => (
                          <div key={field} className="bg-white rounded p-3 border border-gray-200">
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              {field.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {filledForms[form.formName]?.[field] || (
                                <span className="text-gray-400 italic">Not provided</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Print / Save as PDF
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Visa Form Filler</h1>
          </div>
          <p className="text-lg text-gray-600">AI-powered form filling for Schengen, Canada, and UK visa applications</p>
          
          <div className="mt-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-4 inline-block">
            <p className="text-sm font-semibold text-orange-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              🎉 DEMO MODE: Experience the full workflow with sample data
            </p>
            <button
              onClick={() => setShowWaitlist(true)}
              className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-semibold underline"
            >
              Get notified when we launch real document processing →
            </button>
          </div>
          
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
            <p className="text-sm text-green-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              100% Privacy-First: Documents processed locally, never stored on servers
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex items-center gap-4">
            {['Select Visa', 'Upload Docs', 'AI Processing', 'Review', 'Complete'].map((label, idx) => {
              const stepMap = ['select', 'upload', 'processing', 'review', 'complete'];
              const currentIdx = stepMap.indexOf(step);
              const isActive = idx === currentIdx;
              const isCompleted = idx < currentIdx;
              
              return (
                <React.Fragment key={label}>
                  {idx > 0 && <div className="w-8 h-0.5 bg-gray-300"></div>}
                  <div className={`flex flex-col items-center ${isActive ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${isActive ? 'bg-indigo-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {isCompleted ? '✓' : idx + 1}
                    </div>
                    <span className="text-xs mt-1 font-medium whitespace-nowrap">{label}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {step === 'select' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-indigo-600" />
                  Select Your Destination
                </h2>
                <p className="text-gray-600">Choose the country you're applying to and visa type</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Choose Your Destination
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {countries.map(country => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedCountry === country.code
                          ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="text-5xl mb-3">{country.flag}</div>
                      <div className="text-lg font-bold text-gray-900 mb-1">{country.name}</div>
                      <div className="text-sm text-gray-600">{country.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedCountry && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Visa Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {visaTypes[selectedCountry]?.map(visaType => (
                      <button
                        key={visaType}
                        onClick={() => handleVisaTypeSelect(visaType)}
                        className={`p-5 rounded-xl border-2 text-left transition-all ${
                          selectedVisaType === visaType
                            ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 text-base">{visaType}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedCountry && selectedVisaType && (
                <button
                  onClick={handleProceed}
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {currentProcessing}
                    </>
                  ) : (
                    <>
                      Continue to Document Upload
                      <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                    </>
                  )}
                </button>
              )}

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>
          )}

          {step === 'upload' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Upload className="w-6 h-6 text-indigo-600" />
                  Upload Your Documents
                </h2>
                <p className="text-gray-600">Upload passport, ID, resume, or any documents containing your information</p>
              </div>

              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">Required Forms ({requiredForms.length})</h3>
                <div className="space-y-2">
                  {requiredForms.map((form, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-blue-900">{form.formName}</div>
                        <div className="text-blue-700 text-xs">{form.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <label className="block mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-lg font-medium text-gray-700 mb-1">Drop documents here or click to upload</p>
                  <p className="text-sm text-gray-500">PDF, images, or text files containing your personal information</p>
                  <p className="text-xs text-orange-600 mt-2 font-semibold">📋 DEMO: Upload any file to see pre-filled example data</p>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.txt"
                    onChange={handleFileUpload}
                  />
                </div>
              </label>

              {uploadedDocs.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Uploaded Documents ({uploadedDocs.length})</h3>
                  <div className="space-y-2">
                    {uploadedDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        </div>
                        <button
                          onClick={() => removeDocument(doc.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={processAllDocuments}
                  disabled={uploadedDocs.length === 0}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Process with AI & Fill All Forms
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Back
                </button>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI is filling your forms...</h2>
              <p className="text-gray-600 mb-4">{currentProcessing}</p>
              <div className="max-w-md mx-auto bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-900">
                  Processing {uploadedDocs.length} document(s) and filling {requiredForms.length} form(s)
                </p>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Filled Forms</h2>
                <p className="text-gray-600">Verify all information before finalizing your visa application</p>
              </div>

              <div className="space-y-6">
                {requiredForms.map((form, formIdx) => (
                  <div key={formIdx} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{form.formName}</h3>
                        <p className="text-sm text-gray-600">{form.description}</p>
                      </div>
                      <Eye className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {form.fields.map(field => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type="text"
                            value={filledForms[form.formName]?.[field] || ''}
                            onChange={(e) => handleFieldChange(form.formName, field, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder={`Enter ${field}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Preview All Forms
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Finalize All Forms
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Start Over
                </button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center py-16">
              <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-3">All Forms Completed!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Your {selectedVisaType} visa application for {countries.find(c => c.code === selectedCountry)?.flag} {countries.find(c => c.code === selectedCountry)?.name} is ready
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Completed Forms ({requiredForms.length})</h3>
                <div className="space-y-2">
                  {requiredForms.map((form, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">{form.formName}</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download All Forms
                </button>
                <button
                  onClick={handleReset}
                  className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
Apply for Another Visa
</button>
          </div>
        </div>
      )}
    </div>

    <div className="mt-6 text-center text-sm text-gray-600">
      <p>🔒 Privacy-first processing: Your documents are analyzed locally and never stored on our servers</p>
    </div>
  </div>
</div>
);
}