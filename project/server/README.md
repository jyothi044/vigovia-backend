# Vigovia PDF Backend API

Backend API for generating travel itinerary PDFs using Node.js and Express.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Generate PDF
- **POST** `/api/generate-pdf`
- Body: Itinerary data object
- Returns: PDF file download

## Example Request

```javascript
const response = await fetch('http://localhost:5000/api/generate-pdf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(itineraryData)
});

const blob = await response.blob();
// Handle PDF download
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)