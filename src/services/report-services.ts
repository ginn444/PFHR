import { CancerInfo, Biomarker, DNAFile, Report, SNPFinding } from '../types';
import { fetchSNPInfo } from './snpedia';
import { parseDNAFile, ParsedSNP } from './dna-parser';

export async function generateReport(
  cancerInfo: CancerInfo,
  biomarkers: Biomarker[],
  dnaFile: DNAFile | null,
  rawFile?: File
): Promise<Report> {
  let snpFindings: SNPFinding[] = [];

  if (dnaFile && rawFile) {
    try {
      // Parse DNA file
      const parsedSNPs = await parseDNAFile(rawFile);
      
      // Fetch relevant SNP information
      const relevantSNPs = filterRelevantSNPs(parsedSNPs, cancerInfo);
      snpFindings = await fetchSNPFindings(relevantSNPs);
    } catch (error) {
      console.error('Error processing DNA file:', error);
    }
  }

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    cancerInfo,
    biomarkers,
    dnaAnalysis: dnaFile ? {
      fileName: dnaFile.name,
      snpFindings
    } : null,
    summary: generateSummary(cancerInfo, biomarkers, snpFindings)
  };
}

async function fetchSNPFindings(snps: ParsedSNP[]): Promise<SNPFinding[]> {
  const findings: SNPFinding[] = [];
  
  // Limit concurrent requests
  const batchSize = 5;
  for (let i = 0; i < snps.length; i += batchSize) {
    const batch = snps.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(snp => fetchSNPInfo(snp.rsid))
    );
    
    findings.push(...batchResults.filter((f): f is SNPFinding => f !== null));
  }
  
  return findings;
}

function filterRelevantSNPs(snps: ParsedSNP[], cancerInfo: CancerInfo): ParsedSNP[] {
  // In a real implementation, this would use a database or API to determine
  // which SNPs are relevant for the specific cancer type
  // For now, return all SNPs up to a limit
  return snps.slice(0, 10);
}

function generateSummary(
  cancerInfo: CancerInfo,
  biomarkers: Biomarker[],
  snpFindings: SNPFinding[]
): string {
  const parts = [
    `Analysis based on ${cancerInfo.type} (Stage ${cancerInfo.stage})`,
    `${biomarkers.length} biomarkers analyzed`
  ];

  if (snpFindings.length > 0) {
    const highSignificance = snpFindings.filter(f => f.significance === 'High').length;
    parts.push(`${snpFindings.length} relevant genetic markers identified, ` +
               `${highSignificance} with high significance`);
  }

  return parts.join('. ') + '.';
}