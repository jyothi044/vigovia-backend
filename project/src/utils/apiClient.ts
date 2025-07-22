const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async generatePDF(itineraryData: any): Promise<Blob> {
    try {
      console.log('Sending PDF generation request to:', `${this.baseUrl}/generate-pdf`);
      console.log('Itinerary data:', itineraryData);
      
      const response = await fetch(`${this.baseUrl}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itineraryData),
      });

      if (!response.ok) {
        console.error('PDF generation failed with status:', response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error data:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      console.log('PDF generation successful, creating blob...');
      const blob = await response.blob();
      console.log('Blob created, size:', blob.size);
      return blob;
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate PDF. Please try again.'
      );
    }
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend server is not available');
    }
  }
}

export const apiClient = new ApiClient();