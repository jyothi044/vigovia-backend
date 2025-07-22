# Vigovia Travel Itinerary Generator

A full-stack web application for creating professional travel itinerary PDFs. Built with React (frontend) and Node.js/Express (backend).

## 🌟 Features

- **Interactive Multi-Step Form** - Easy-to-use interface for entering travel details
- **Professional PDF Generation** - Server-side PDF creation with beautiful formatting
- **Real-time Validation** - Form validation and error handling
- **Responsive Design** - Works on desktop and mobile devices
- **RESTful API** - Clean backend API for PDF generation

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐
│                 │ ──────────────► │                 │
│   Frontend      │                 │   Backend       │
│   (React)       │ ◄────────────── │   (Node.js)     │
│   Port: 5173    │    PDF Blob     │   Port: 5000    │
└─────────────────┘                 └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vigovia-travel-itinerary
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up Environment Variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp server/.env.example server/.env
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   Backend will run on: `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   Frontend will run on: `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Vigovia PDF API is running"
}
```

#### 2. Generate PDF
**POST** `/generate-pdf`

Generate a travel itinerary PDF based on provided data.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "tripDetails": {
    "customerName": "John Doe",
    "destination": "London",
    "days": 5,
    "nights": 4,
    "departureFrom": "New York",
    "departureDate": "2024-06-15",
    "arrivalDate": "2024-06-20",
    "numberOfTravelers": 2
  },
  "dailyItinerary": [
    {
      "day": 1,
      "date": "2024-06-15",
      "activities": [
        {
          "id": "1",
          "name": "City Tour",
          "description": "Explore the historic city center",
          "price": 50,
          "duration": "3 hours",
          "type": "morning"
        }
      ],
      "transfers": [
        {
          "id": "1",
          "type": "Airport Transfer",
          "timing": "10:00 AM",
          "price": 30,
          "capacity": 4,
          "description": "Hotel to Airport"
        }
      ]
    }
  ],
  "flights": [
    {
      "id": "1",
      "airline": "British Airways",
      "date": "2024-06-15",
      "from": "New York (JFK)",
      "to": "London (LHR)",
      "flightNumber": "BA178"
    }
  ],
  "hotels": [
    {
      "id": "1",
      "city": "London",
      "checkIn": "2024-06-15",
      "checkOut": "2024-06-20",
      "nights": 4,
      "name": "The London Hotel"
    }
  ],
  "activities": [
    {
      "id": "1",
      "city": "London",
      "activity": "Tower Bridge Visit",
      "type": "Sightseeing",
      "timeRequired": "2-3 Hours"
    }
  ],
  "paymentPlan": {
    "totalAmount": 2500,
    "tcsCollected": false,
    "installments": [
      {
        "id": "1",
        "name": "Initial Payment",
        "amount": 1000,
        "dueDate": "2024-05-15",
        "description": "Booking confirmation"
      }
    ]
  },
  "visaDetails": {
    "visaType": "Tourist",
    "validity": "30 Days",
    "processingDate": "2024-05-01"
  },
  "importantNotes": [
    {
      "id": "1",
      "point": "Passport Validity",
      "details": "Ensure passport is valid for at least 6 months"
    }
  ],
  "serviceScope": [
    {
      "id": "1",
      "service": "Flight Booking",
      "details": "Round trip flights included"
    }
  ],
  "inclusions": [
    {
      "id": "1",
      "category": "Flight",
      "count": 2,
      "details": "Round trip economy class",
      "status": "Included"
    }
  ]
}
```

**Success Response:**
```
Status: 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="London_Itinerary.pdf"

[PDF Binary Data]
```

**Error Response:**
```json
{
  "error": "Invalid data",
  "message": "Trip details are required"
}
```

## 🔧 How It Works

### Frontend Flow

1. **User Interface**
   - Multi-step form with 8 sections
   - Real-time validation
   - Progress indicator

2. **Data Collection**
   - Trip details (destination, dates, travelers)
   - Daily itinerary with activities and transfers
   - Flight and hotel information
   - Payment plan and visa details
   - Additional notes and inclusions

3. **API Communication**
   - Health check before PDF generation
   - POST request to backend with form data
   - Handle loading states and errors
   - Download generated PDF

### Backend Flow

1. **Request Handling**
   - Validate incoming data
   - Parse JSON payload
   - Error handling for malformed requests

2. **PDF Generation**
   - Use jsPDF library for server-side generation
   - Create professional layout with:
     - Company branding
     - Trip overview table
     - Daily itinerary timeline
     - Flight and hotel summaries
     - Payment plan details
     - Terms and conditions

3. **Response**
   - Generate PDF buffer
   - Set appropriate headers
   - Stream PDF back to client

## 📁 Project Structure

```
vigovia-travel-itinerary/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── TripDetailsForm.tsx
│   │   ├── DailyItineraryForm.tsx
│   │   ├── FlightForm.tsx
│   │   ├── HotelForm.tsx
│   │   ├── PaymentPlanForm.tsx
│   │   └── ...
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                    # Utility functions
│   │   ├── apiClient.ts         # API communication
│   │   └── pdfDownloader.ts     # File download handling
│   ├── App.tsx                  # Main application component
│   └── main.tsx                 # Application entry point
├── server/                      # Backend source code
│   ├── utils/
│   │   └── pdfGenerator.js      # PDF generation logic
│   ├── server.js               # Express server setup
│   ├── package.json            # Backend dependencies
│   └── README.md               # Backend documentation
├── public/                     # Static assets
├── package.json               # Frontend dependencies
└── README.md                  # This file
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **jsPDF** - PDF generation
- **CORS** - Cross-origin requests

## 🔍 API Testing

### Using cURL

**Health Check:**
```bash
curl -X GET http://localhost:5000/api/health
```

**Generate PDF:**
```bash
curl -X POST http://localhost:5000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d @sample-data.json \
  --output itinerary.pdf
```

### Using Postman

1. **Import the collection** (if available)
2. **Set base URL** to `http://localhost:5000/api`
3. **Test health endpoint** first
4. **Send POST request** to `/generate-pdf` with sample data

## 🚨 Error Handling

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| 400 | Invalid data / Missing trip details | Ensure all required fields are provided |
| 500 | PDF generation failed | Check server logs for detailed error |
| CORS | Cross-origin request blocked | Ensure backend CORS is configured |
| Connection | Cannot connect to backend | Verify backend server is running |

### Frontend Error States

- **Loading State**: Shows spinner during PDF generation
- **Error Display**: User-friendly error messages
- **Retry Mechanism**: Users can retry failed operations

## 🔧 Development

### Adding New Features

1. **Frontend Changes**
   - Add new form components in `src/components/`
   - Update types in `src/types/index.ts`
   - Modify main App component

2. **Backend Changes**
   - Update PDF generator in `server/utils/pdfGenerator.js`
   - Add new API endpoints in `server/server.js`
   - Update validation logic

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```env
PORT=5000
NODE_ENV=development
```

## 📝 Sample Data

See `sample-data.json` for a complete example of the request payload structure.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
