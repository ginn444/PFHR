import { DNAFile } from '../types';

export interface ParsedSNP {
  rsid: string;
  genotype: string;
}

export async function parseDNAFile(file: File): Promise<ParsedSNP[]> {
  const text = await file.text();
  const lines = text.split('\n');
  const snps: ParsedSNP[] = [];

  // Support different file formats
  if (file.name.endsWith('.vcf')) {
    return parseVCF(lines);
  } else if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
    return parseTextFormat(lines);
  }

  throw new Error('Unsupported file format');
}

function parseVCF(lines: string[]): ParsedSNP[] {
  return lines
    .filter(line => !line.startsWith('#') && line.trim())
    .map(line => {
      const [, , rsid, , ref, alt] = line.split('\t');
      return {
        rsid: rsid.startsWith('rs') ? rsid : '',
        genotype: `${ref}/${alt}`
      };
    })
    .filter(snp => snp.rsid);
}

function parseTextFormat(lines: string[]): ParsedSNP[] {
  return lines
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => {
      const parts = line.split(/[,\t]/);
      // Look for rs ID pattern in each part
      const rsidPart = parts.find(part => part.trim().startsWith('rs'));
      if (!rsidPart) return null;

      // Look for genotype pattern (e.g., A/T, C/G)
      const genotypePart = parts.find(part => /^[ACGT]\/[ACGT]$/.test(part.trim()));
      
      return {
        rsid: rsidPart.trim(),
        genotype: genotypePart?.trim() || 'N/A'
      };
    })
    .filter((snp): snp is ParsedSNP => snp !== null);
}