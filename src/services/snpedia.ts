import { SNPFinding } from '../types';

const SNPEDIA_API = 'https://www.snpedia.com/api.php';

export async function fetchSNPInfo(rsId: string): Promise<SNPFinding | null> {
  try {
    const response = await fetch(
      `${SNPEDIA_API}?action=query&prop=extracts&titles=${rsId}&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch SNP data');
    }

    const data = await response.json();
    const pages = data.query?.pages;
    if (!pages) return null;

    // Get the first page (there should only be one)
    const page = Object.values(pages)[0] as any;
    if (page.missing) return null;

    // Extract relevant information from the page content
    const extract = page.extract || '';
    
    return {
      rsid: rsId,
      description: extractDescription(extract),
      significance: determineSNPSignificance(extract)
    };
  } catch (error) {
    console.error(`Error fetching SNP data for ${rsId}:`, error);
    return null;
  }
}

function extractDescription(content: string): string {
  // Remove HTML tags and get first two sentences
  const cleanText = content.replace(/<[^>]*>/g, '');
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim());
  return sentences.slice(0, 2).join('. ') + '.';
}

function determineSNPSignificance(content: string): 'High' | 'Medium' | 'Low' {
  const lowercaseContent = content.toLowerCase();
  
  // Simple heuristic based on keywords
  if (lowercaseContent.includes('pathogenic') || 
      lowercaseContent.includes('high risk') ||
      lowercaseContent.includes('significant association')) {
    return 'High';
  } else if (lowercaseContent.includes('moderate') ||
             lowercaseContent.includes('may affect') ||
             lowercaseContent.includes('possible association')) {
    return 'Medium';
  }
  
  return 'Low';
}