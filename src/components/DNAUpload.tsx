import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { DNAFile } from '../types';

interface DNAUploadProps {
  onFileSelect: (fileInfo: DNAFile | null, rawFile?: File) => void;
}

export function DNAUpload({ onFileSelect }: DNAUploadProps) {
  const handleFile = useCallback(
    (file: File) => {
      if (file) {
        onFileSelect(
          { name: file.name, size: file.size },
          file
        );
      }
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">DNA File Upload</h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-gray-400" />
          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700">Upload a file</span>
              <span className="text-gray-500"> or drag and drop</span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileInput}
                accept=".txt,.csv,.vcf"
              />
            </label>
            <p className="text-sm text-gray-500">Supported formats: TXT, CSV, VCF</p>
          </div>
        </div>
      </div>
    </div>
  );
}