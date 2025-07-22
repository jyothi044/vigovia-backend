const express = require('express');
const cors = require('cors');
const { generatePDF } = require('./utils/pdfGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Vigovia PDF API is running' });
});

// PDF generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  try {
    const itineraryData = req.body;
    
    // Validate required data
    if (!itineraryData || !itineraryData.tripDetails) {
      return res.status(400).json({ 
        error: 'Invalid data', 
        message: 'Trip details are required' 
      });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(itineraryData);
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${itineraryData.tripDetails.destination}_Itinerary.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    // Send PDF buffer
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ 
      error: 'PDF generation failed', 
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: 'API endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Vigovia PDF API server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📄 PDF endpoint: http://localhost:${PORT}/api/generate-pdf`);
});

module.exports = app;