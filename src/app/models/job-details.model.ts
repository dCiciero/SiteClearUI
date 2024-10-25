export interface JobDetails {
    id: number;
    itemDescription: string;
    itemReference: string;
    lineType: string;
    // currency: string;
    // departmentCode: string;
    totalWeight: number;
    jobId: number;
    jobReference: number;
    lineQuantity: number;
    invoiceItemId: number;
    // costPrice: number;
    // unitPrice: number;
    // netPrice: number;
    processingBayId: number;
    processingBay: any;
    isSignedOff: boolean;
    isConfirmed: boolean;
    processedById: number;
    //furtherProcessing: boolean | null;
    isWeightAdded: boolean | null;
    startDate: string | null;
    endDate: string | null;
    resource: string | null;
    asset: string | undefined;
    jobCount: number;
    
    
}

