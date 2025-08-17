// components/Column/Column.tsx
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, Building2 } from 'lucide-react';
import type { JobApplication, JobStatus, Column } from '../types';
import JobCard from './JobCard';

interface ColumnProps {
  column: Column;
  columns: Column[];
  jobs: JobApplication[];
  onEdit: (job: JobApplication) => void;
  onDelete: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
  onAddJob: (status: JobStatus) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({ 
  column, 
  columns, 
  jobs, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onAddJob 
}) => {
  return (
    <div className="flex-shrink-0 w-72 max-h-full min-h-full">
      <div className={`rounded-lg border-2 ${column.lightColor} h-full`}>
        {/* Column Header */}
        <div className={`${column.color} text-white p-4 rounded-t-lg flex items-center justify-between`}>
          <div className="flex items-center">
            <h2 className="font-semibold text-sm">{column.title}</h2>
            <span className="ml-2 bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
              {jobs.length}
            </span>
          </div>
          <button
            onClick={() => onAddJob(column.id)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
            title={`Add job to ${column.title}`}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Column Content */}
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-4 space-y-3 min-h-[500px] max-h-[calc(100vh-200px)] overflow-y-auto transition-colors ${
                snapshot.isDraggingOver ? 'bg-gray-50' : ''
              }`}
            >
              {jobs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Building2 size={32} className="mx-auto" />
                  </div>
                  <p className="text-sm text-gray-500">No applications yet</p>
                  <button
                    onClick={() => onAddJob(column.id)}
                    className={`mt-2 text-xs ${column.textColor} hover:underline transition-colors`}
                  >
                    Add Job
                  </button>
                </div>
              ) : (
                jobs.map((job, index) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    index={index}
                    columns={columns}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default ColumnComponent;