import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { CancerForm } from './components/CancerForm';
import { BiomarkerForm } from './components/BiomarkerForm';
import { DNAUpload } from './components/DNAUpload';
import type { CancerInfo, Biomarker, DNAFile } from './types';

function App() {
  const [cancerInfo, setCancerInfo] = useState<CancerInfo>({ type: '', stage: '' });
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [dnaFile, setDNAFile] = useState<DNAFile | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ cancerInfo, biomarkers, dnaFile });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Personal Family Health Researcher
              </h1>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <CancerForm cancerInfo={cancerInfo} onChange={setCancerInfo} />
            <BiomarkerForm biomarkers={biomarkers} onChange={setBiomarkers} />
            <DNAUpload onFileSelect={setDNAFile} />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate Report
              </button>
            </div>
          </form>

          {/* File Preview */}
          {dnaFile && (
            <div className="px-6 pb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700 font-medium">
                    {dnaFile.name}
                  </span>
                  <span className="ml-2 text-sm text-blue-500">
                    ({(dnaFile.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;