import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Biomarker } from '../types';

interface BiomarkerFormProps {
  biomarkers: Biomarker[];
  onChange: (biomarkers: Biomarker[]) => void;
}

export function BiomarkerForm({ biomarkers, onChange }: BiomarkerFormProps) {
  const addBiomarker = () => {
    if (biomarkers.length < 11) {
      onChange([...biomarkers, { name: '', result: '', level: 0 }]);
    }
  };

  const removeBiomarker = (index: number) => {
    onChange(biomarkers.filter((_, i) => i !== index));
  };

  const updateBiomarker = (index: number, field: keyof Biomarker, value: string | number) => {
    const newBiomarkers = [...biomarkers];
    newBiomarkers[index] = { ...newBiomarkers[index], [field]: value };
    onChange(newBiomarkers);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Biomarkers</h2>
        <button
          onClick={addBiomarker}
          disabled={biomarkers.length >= 11}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Biomarker
        </button>
      </div>
      
      <div className="space-y-4">
        {biomarkers.map((biomarker, index) => (
          <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={biomarker.name}
                  onChange={(e) => updateBiomarker(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Result</label>
                <input
                  type="text"
                  value={biomarker.result}
                  onChange={(e) => updateBiomarker(index, 'result', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <input
                  type="number"
                  value={biomarker.level}
                  onChange={(e) => updateBiomarker(index, 'level', Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => removeBiomarker(index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}