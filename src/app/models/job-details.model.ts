export interface JobDetails {
    id: number;
    itemDescription: string;
    itemReference: string;
    lineType: string;
    currency: string;
    departmentCode: string;
    weight: number;
    jobId: number;
    jobReference: number;
    lineQuantity: number;
    invoiceItemId: number;
    costPrice: number;
    unitPrice: number;
    netPrice: number;
    isSignedOff: boolean;
    isConfirmed: boolean;
    furtherProcessing: boolean | null;
    startDate: string | null;
    endDate: string | null;
    resource: string | null;
    asset: string | undefined;
    
    
}

