// App.tsx
import React, { useState, useEffect } from 'react';
import type { JobApplication, JobStatus, Column } from './types';
import { saveJobsToStorage, loadJobsFromStorage } from './utils/storage';

// Components
import Layout from './components/Layout';
import Header from './components/Header';
import ColumnComponent from './components/Column';
import JobForm from './components/JobForm';

// Status columns configuration
const COLUMNS: Column[] = [
  { 
    id: 'wishlist', 
    title: 'Wish List', 
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50 border-cyan-200',
    textColor: 'text-cyan-700'
  },
  { 
    id: 'applied', 
    title: 'Applied', 
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700'
  },
  { 
    id: 'interviewing', 
    title: 'Interviewing', 
    color: 'bg-green-500',
    lightColor: 'bg-green-50 border-green-200',
    textColor: 'text-green-700'
  },
  { 
    id: 'offer', 
    title: 'Offer', 
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50 border-yellow-200',
    textColor: 'text-yellow-700'
  },
  { 
    id: 'rejected', 
    title: 'Rejected', 
    color: 'bg-red-500',
    lightColor: 'bg-red-50 border-red-200',
    textColor: 'text-red-700'
  }
];

const App: React.FC = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingJob, setEditingJob] = useState<JobApplication | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load jobs on mount
  useEffect(() => {
    const loadedJobs = loadJobsFromStorage();
    setJobs(loadedJobs);
  }, []);

  const handleSaveJob = (jobData: JobApplication): void => {
    const updatedJobs = editingJob
      ? jobs.map(job => job.id === editingJob.id ? jobData : job)
      : [...jobs, jobData];

    setJobs(updatedJobs);
    saveJobsToStorage(updatedJobs);
    setShowForm(false);
    setEditingJob(undefined);
  };

  const handleEditJob = (job: JobApplication): void => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteJob = (jobId: string): void => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      saveJobsToStorage(updatedJobs);
    }
  };

  const handleStatusChange = (jobId: string, newStatus: JobStatus): void => {
    const updatedJobs = jobs.map(job =>
      job.id === jobId ? { ...job, status: newStatus, updatedAt: new Date().toISOString() } : job
    );
    setJobs(updatedJobs);
    saveJobsToStorage(updatedJobs);
  };

  const handleAddJob = (status: JobStatus = 'wishlist'): void => {
    setEditingJob(undefined);
    setShowForm(true);
  };

  const handleCloseForm = (): void => {
    setShowForm(false);
    setEditingJob(undefined);
  };

  const handleSearchChange = (term: string): void => {
    setSearchTerm(term);
  };

  // Filter jobs by search term
  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Header 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddJob={() => handleAddJob()}
      />

      {/* Kanban Board */}
      <main className=" mx-auto px-20 py-12">
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {COLUMNS.map(column => {
            const columnJobs = filteredJobs.filter(job => job.status === column.id);
            return (
              <ColumnComponent
                key={column.id}
                column={column}
                columns={COLUMNS}
                jobs={columnJobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onStatusChange={handleStatusChange}
                onAddJob={handleAddJob}
              />
            );
          })}
        </div>
      </main>

      {/* Job Form Modal */}
      {showForm && (
        <JobForm
          job={editingJob}
          columns={COLUMNS}
          onSave={handleSaveJob}
          onCancel={handleCloseForm}
        />
      )}
    </Layout>
  );
};

export default App;