export interface Biomarker {
    name: string;
    result: string;
    level: number;
  }
  
  export interface CancerInfo {
    type: string;
    stage: string;
  }
  
  export interface SNPFinding {
    rsid: string;
    description: string;
    significance: 'High' | 'Medium' | 'Low';
  }
  
  export interface Report {
    id: string;
    timestamp: string;
    cancerInfo: CancerInfo;
    biomarkers: Biomarker[];
    dnaAnalysis: {
      fileName: string;
      snpFindings: SNPFinding[];
    } | null;
    summary: string;
  }