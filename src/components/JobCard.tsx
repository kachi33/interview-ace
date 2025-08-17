// components/JobCard/JobCard.tsx
import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Building2, MapPin, Calendar, DollarSign, ExternalLink, Edit3, Trash2, MoreVertical } from 'lucide-react';
import type { JobApplication, JobStatus, Column } from '../types';

interface JobCardProps {
  job: JobApplication;
  index: number;
  columns: Column[];
  onEdit: (job: JobApplication) => void;
  onDelete: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, columns, onEdit, onDelete, onStatusChange }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = (newStatus: JobStatus): void => {
    onStatusChange(job.id, newStatus);
    setShowDropdown(false);
  };

  const handleEdit = (): void => {
    onEdit(job);
    setShowDropdown(false);
  };

  const handleDelete = (): void => {
    onDelete(job.id);
    setShowDropdown(false);
  };

  return (
    <Draggable draggableId={job.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative ${
            snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
          }`}
        >
          {/* Dropdown Menu */}
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <MoreVertical size={16} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-6 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Edit3 size={14} className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pr-8">
            <h3 className="font-medium text-gray-900 text-sm mb-1">{job.position}</h3>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Building2 size={12} className="mr-1" />
              <span>{job.company}</span>
            </div>

            {job.location && (
              <div className="flex items-center text-gray-500 text-xs mb-2">
                <MapPin size={10} className="mr-1" />
                <span>{job.location}</span>
              </div>
            )}

            {job.salaryRange && (
              <div className="flex items-center text-gray-500 text-xs mb-2">
                <DollarSign size={10} className="mr-1" />
                <span>{job.salaryRange}</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-gray-500 text-xs">
                <Calendar size={10} className="mr-1" />
                <span>{formatDate(job.applicationDate)}</span>
              </div>
              
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {job.notes && (
              <div className="mt-3 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <div className="line-clamp-2">{job.notes}</div>
              </div>
            )}

            {/* Status Change Buttons */}
            <div className="mt-3 flex flex-wrap gap-1">
              {columns.filter(col => col.id !== job.status).map(column => (
                <button
                  key={column.id}
                  onClick={() => handleStatusChange(column.id)}
                  className={`text-xs px-2 py-1 rounded-full ${column.lightColor} ${column.textColor} hover:opacity-80 transition-opacity`}
                >
                  Move to {column.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;