import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { CancerForm } from './components/CancerForm';
import { BiomarkerForm } from './components/BiomarkerForm';
import { DNAUpload } from './components/DNAUpload';
import { Report } from './components/Report';
import { generateReport } from './services/report-service';
import type { CancerInfo, Biomarker, DNAFile } from './types';
import type { Report as ReportType } from './types';

function App() {
  const [cancerInfo, setCancerInfo] = useState<CancerInfo>({ type: '', stage: '' });
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [dnaFile, setDNAFile] = useState<{ info: DNAFile | null; raw: File | undefined }>({
    info: null,
    raw: undefined
  });
  const [report, setReport] = useState<ReportType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const generatedReport = await generateReport(
        cancerInfo,
        biomarkers,
        dnaFile.info,
        dnaFile.raw
      );
      setReport(generatedReport);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Personal Family Health Researcher
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <CancerForm cancerInfo={cancerInfo} onChange={setCancerInfo} />
            <BiomarkerForm biomarkers={biomarkers} onChange={setBiomarkers} />
            <DNAUpload 
              onFileSelect={(info, raw) => setDNAFile({ info, raw })} 
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !cancerInfo.type || !cancerInfo.stage}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Generating Report...' : 'Generate Report'}
              </button>
            </div>
          </form>

          {dnaFile.info && (
            <div className="px-6 pb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700 font-medium">
                    {dnaFile.info.name}
                  </span>
                  <span className="ml-2 text-sm text-blue-500">
                    ({(dnaFile.info.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {report && <Report report={report} onClose={() => setReport(null)} />}
    </div>
  );
}

export default App;