const API_BASE_URL = process.env.VITE_API_URL || '';

export async function createReport(reportData: any) {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Failed to create report');
  }

  return response.json();
}

export async function uploadDNAFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/dna/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload DNA file');
  }

  return response.json();
}

export async function getReport(id: string) {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return response.json();
}