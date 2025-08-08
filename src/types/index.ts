// types/index.ts

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location?: string;
  status: JobStatus;
  applicationDate: string;
  jobUrl?: string;
  salaryRange?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 'wishlist' | 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface Column {
  id: JobStatus;
  title: string;
  color: string;
  lightColor: string;
  textColor: string;
}

export interface JobFormData {
  company: string;
  position: string;
  location: string;
  status: JobStatus;
  applicationDate: string;
  jobUrl: string;
  salaryRange: string;
  notes: string;
}

export interface JobCardProps {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
}

export interface JobFormProps {
  job?: JobApplication;
  onSave: (jobData: JobApplication) => void;
  onCancel: () => void;
}

export interface ColumnProps {
  column: Column;
  jobs: JobApplication[];
  onEdit: (job: JobApplication) => void;
  onDelete: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
  onAddJob: (status: JobStatus) => void;
}