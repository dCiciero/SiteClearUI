import { JobDetails } from "./job-details.model";

export interface Jobs {
    id: number;
    ref: string;
    resource: string;
    asset: string;
    jobId: number;
    type: string;
    description: string;
    jobPO: string;
    status: string;
    jobDetails: JobDetails[]
}
