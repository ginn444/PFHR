import React from 'react';
import { CancerInfo } from '../types';

interface CancerFormProps {
  cancerInfo: CancerInfo;
  onChange: (info: CancerInfo) => void;
}

export function CancerForm({ cancerInfo, onChange }: CancerFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Cancer Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="cancer-type" className="block text-sm font-medium text-gray-700">
            Cancer Type
          </label>
          <input
            type="text"
            id="cancer-type"
            value={cancerInfo.type}
            onChange={(e) => onChange({ ...cancerInfo, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Breast Cancer"
          />
        </div>
        <div>
          <label htmlFor="cancer-stage" className="block text-sm font-medium text-gray-700">
            Stage
          </label>
          <select
            id="cancer-stage"
            value={cancerInfo.stage}
            onChange={(e) => onChange({ ...cancerInfo, stage: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Stage</option>
            <option value="Stage 0">Stage 0</option>
            <option value="Stage I">Stage I</option>
            <option value="Stage II">Stage II</option>
            <option value="Stage III">Stage III</option>
            <option value="Stage IV">Stage IV</option>
          </select>
        </div>
      </div>
    </div>
  );
}