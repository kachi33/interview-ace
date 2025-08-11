// components/JobForm/JobForm.tsx
import React, { useState } from 'react';
import type { JobApplication, JobStatus, Column } from '..//types';
import { generateId } from '../utils/storage';

interface JobFormData {
  company: string;
  position: string;
  location: string;
  status: JobStatus;
  applicationDate: string;
  jobUrl: string;
  salaryRange: string;
  notes: string;
}

interface JobFormProps {
  job?: JobApplication;
  columns: Column[];
  onSave: (jobData: JobApplication) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, columns, onSave, onCancel }) => {
  const [formData, setFormData] = useState<JobFormData>({
    company: job?.company || '',
    position: job?.position || '',
    location: job?.location || '',
    status: job?.status || 'wishlist',
    applicationDate: job?.applicationDate || new Date().toISOString().split('T')[0],
    jobUrl: job?.jobUrl || '',
    salaryRange: job?.salaryRange || '',
    notes: job?.notes || ''
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.position.trim()) {
      alert('Please fill in company and position fields');
      return;
    }
    
    const jobData: JobApplication = {
      ...formData,
      id: job?.id || generateId(),
      createdAt: job?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave(jobData);
  };

  const handleChange = (field: keyof JobFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center p-4 z-50"
      onClick={handleModalClick}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          {job ? 'Edit Application' : 'Add New Application'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Google, Microsoft, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Software Engineer, Product Manager, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="San Francisco, CA / Remote"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as JobStatus)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            >
              {columns.map(column => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Date
            </label>
            <input
              type="date"
              value={formData.applicationDate}
              onChange={(e) => handleChange('applicationDate', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job URL
            </label>
            <input
              type="url"
              value={formData.jobUrl}
              onChange={(e) => handleChange('jobUrl', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="https://company.com/jobs/123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              type="text"
              value={formData.salaryRange}
              onChange={(e) => handleChange('salaryRange', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="$80k - $120k"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              rows={3}
              placeholder="Interview details, contacts, follow-up notes..."
            />
          </div>

          <div className="flex space-x-3 pt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-colors font-medium"
            >
              {job ? 'Update' : 'Save'} Application
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;