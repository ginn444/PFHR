import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import type { Report } from '../services/reportGenerator';

interface ReportProps {
  report: Report;
  onClose: () => void;
}

export function Report({ report, onClose }: ReportProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Health Analysis Report</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Cancer Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Cancer Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Type:</strong> {report.cancerInfo.type}</p>
              <p><strong>Stage:</strong> {report.cancerInfo.stage}</p>
            </div>
          </section>

          {/* Biomarkers */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Biomarkers</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {report.biomarkers.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {report.biomarkers.map((biomarker, index) => (
                    <div key={index} className="p-3 bg-white rounded shadow-sm">
                      <p className="font-medium">{biomarker.name}</p>
                      <p className="text-sm text-gray-600">Result: {biomarker.result}</p>
                      <p className="text-sm text-gray-600">Level: {biomarker.level}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No biomarkers recorded</p>
              )}
            </div>
          </section>

          {/* DNA Analysis */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">DNA Analysis</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {report.dnaAnalysis ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">File: {report.dnaAnalysis.fileName}</p>
                  <div className="space-y-3">
                    {report.dnaAnalysis.snpFindings.map((finding, index) => (
                      <div key={index} className="bg-white p-3 rounded shadow-sm">
                        <p className="font-medium">SNP: {finding.rsid}</p>
                        <p className="text-sm text-gray-600">{finding.description}</p>
                        <p className="text-sm font-medium text-blue-600">
                          Significance: {finding.significance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-gray-500">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>No DNA analysis available</p>
                </div>
              )}
            </div>
          </section>

          {/* Summary */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{report.summary}</p>
            </div>
          </section>

          {/* Print Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}