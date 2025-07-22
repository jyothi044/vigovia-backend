const { jsPDF } = require('jspdf');

const generatePDF = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let yPos = 20;

      // Helper function to add new page if needed
      const checkPageBreak = (neededHeight) => {
        if (yPos + neededHeight > pageHeight - 50) {
          doc.addPage();
          yPos = 20;
        }
      };

      // Company footer function
      const addFooter = () => {
        const footerY = pageHeight - 40;
        
        // Footer line
        doc.setDrawColor(200, 200, 200);
        doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
        
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        
        // Left side company info
        doc.text('Vigovia Tech Pvt. Ltd', 20, footerY);
        doc.text('Registered Office: Hd-109 Cinnabar Hills,', 20, footerY + 4);
        doc.text('Links Business Park, Karnataka, India', 20, footerY + 8);
        
        // Center contact info
        doc.text('Phone: +91-99X9999999', pageWidth/2 - 30, footerY);
        doc.text('Email ID: Contact@Vigovia.Com', pageWidth/2 - 30, footerY + 4);
        
        // Right side logo
        doc.setFontSize(12);
        doc.setTextColor(84, 28, 156); // Purple color
        doc.text('vigovia', pageWidth - 50, footerY);
        doc.setFontSize(6);
        doc.setTextColor(100, 100, 100);
        doc.text('PLAN.PACK.GO', pageWidth - 50, footerY + 4);
      };

      // Add footer to all pages at the end
      const addFooterToAllPages = () => {
        const totalPages = doc.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          addFooter();
        }
      };

      // Page 1: Header and Trip Overview
      // Company logo and branding
      doc.setFontSize(20);
      doc.setTextColor(84, 28, 156); // Purple
      doc.text('vigovia', pageWidth / 2, yPos, { align: 'center' });
      yPos += 6;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('PLAN.PACK.GO', pageWidth / 2, yPos, { align: 'center' });
      yPos += 20;

      // Main header with gradient background
      const headerHeight = 40;
      // Create gradient effect with blue to purple
      for (let i = 0; i < headerHeight; i++) {
        const ratio = i / headerHeight;
        const r = Math.round(74 + (84 - 74) * ratio);
        const g = Math.round(144 + (28 - 144) * ratio);
        const b = Math.round(226 + (156 - 226) * ratio);
        doc.setFillColor(r, g, b);
        doc.rect(40, yPos + i, pageWidth - 80, 1, 'F');
      }
      
      // Header text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text(`Hi, ${data.tripDetails.customerName}!`, pageWidth / 2, yPos + 12, { align: 'center' });
      doc.setFontSize(14);
      doc.text(`${data.tripDetails.destination} Itinerary`, pageWidth / 2, yPos + 22, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`${data.tripDetails.days} Days ${data.tripDetails.nights} Nights`, pageWidth / 2, yPos + 30, { align: 'center' });
      
      // Travel icons using simple ASCII characters
      doc.setFontSize(12);
      const iconY = yPos + 37;
      const iconSpacing = 15;
      const startX = pageWidth / 2 - (4 * iconSpacing) / 2;
      
      // Icons - using simple characters that render properly
      doc.text('✈', startX, iconY, { align: 'center' });
      doc.text('🏨', startX + iconSpacing, iconY, { align: 'center' });
      doc.text('⏰', startX + iconSpacing * 2, iconY, { align: 'center' });
      doc.text('🚗', startX + iconSpacing * 3, iconY, { align: 'center' });
      doc.text('📅', startX + iconSpacing * 4, iconY, { align: 'center' });
      
      yPos += headerHeight + 15;

      // Trip details table
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'S');
      
      const tableWidth = pageWidth - 40;
      const colWidth = tableWidth / 5;
      
      // Table headers
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text('Departure From', 25, yPos + 6);
      doc.text('Departure', 25 + colWidth, yPos + 6);
      doc.text('Arrival', 25 + colWidth * 2, yPos + 6);
      doc.text('Destination', 25 + colWidth * 3, yPos + 6);
      doc.text('No. Of Travellers', 25 + colWidth * 4, yPos + 6);
      
      // Table values
      doc.setFontSize(9);
      doc.text(data.tripDetails.departureFrom, 25, yPos + 14);
      doc.text(data.tripDetails.departureDate, 25 + colWidth, yPos + 14);
      doc.text(data.tripDetails.arrivalDate, 25 + colWidth * 2, yPos + 14);
      doc.text(data.tripDetails.destination, 25 + colWidth * 3, yPos + 14);
      doc.text(data.tripDetails.numberOfTravelers.toString(), 25 + colWidth * 4, yPos + 14);
      
      yPos += 35;

      // Daily itinerary
      if (data.dailyItinerary && data.dailyItinerary.length > 0) {
        data.dailyItinerary.forEach((day) => {
          checkPageBreak(80);
          
          // Day number circle (purple background)
          doc.setFillColor(84, 28, 156); // Purple
          doc.roundedRect(20, yPos, 30, 60, 15, 15, 'F');
          
          // Day text in white
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(8);
          doc.text('Day', 35, yPos + 20, { align: 'center' });
          doc.setFontSize(14);
          doc.text(`${day.day}`, 35, yPos + 35, { align: 'center' });
          
          // Date and location info
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(10);
          doc.text(`${day.date || '27th November'}`, 60, yPos + 15);
          doc.setFontSize(8);
          doc.text(`Arrival In ${data.tripDetails.destination} & City`, 60, yPos + 22);
          doc.text('Exploration', 60, yPos + 28);
          
          // Timeline with activities
          let timelineY = yPos + 35;
          const timelineX = 60;
          
          // Morning activities
          const morningActivities = day.activities ? day.activities.filter(a => a.type === 'morning') : [];
          if (morningActivities.length > 0) {
            doc.setFillColor(84, 28, 156);
            doc.circle(timelineX, timelineY, 1.5, 'F');
            doc.setDrawColor(84, 28, 156);
            doc.line(timelineX, timelineY, timelineX, timelineY + 12);
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.text('Morning', timelineX + 5, timelineY + 1);
            
            morningActivities.forEach((activity) => {
              timelineY += 6;
              doc.setFontSize(7);
              doc.text(`• ${activity.name}`, timelineX + 8, timelineY);
              if (activity.description) {
                timelineY += 4;
                doc.text(`  ${activity.description}`, timelineX + 8, timelineY);
              }
            });
            timelineY += 3;
          }

          // Afternoon activities
          const afternoonActivities = day.activities ? day.activities.filter(a => a.type === 'afternoon') : [];
          if (afternoonActivities.length > 0) {
            doc.setFillColor(84, 28, 156);
            doc.circle(timelineX, timelineY, 1.5, 'F');
            doc.setDrawColor(84, 28, 156);
            doc.line(timelineX, timelineY, timelineX, timelineY + 12);
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.text('Afternoon', timelineX + 5, timelineY + 1);
            
            afternoonActivities.forEach((activity) => {
              timelineY += 6;
              doc.setFontSize(7);
              doc.text(`• ${activity.name}`, timelineX + 8, timelineY);
              if (activity.description) {
                timelineY += 4;
                doc.text(`  ${activity.description}`, timelineX + 8, timelineY);
              }
            });
            timelineY += 3;
          }

          // Evening activities
          const eveningActivities = day.activities ? day.activities.filter(a => a.type === 'evening') : [];
          if (eveningActivities.length > 0) {
            doc.setFillColor(84, 28, 156);
            doc.circle(timelineX, timelineY, 1.5, 'F');
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.text('Evening', timelineX + 5, timelineY + 1);
            
            eveningActivities.forEach((activity) => {
              timelineY += 6;
              doc.setFontSize(7);
              doc.text(`• ${activity.name}`, timelineX + 8, timelineY);
              if (activity.description) {
                timelineY += 4;
                doc.text(`  ${activity.description}`, timelineX + 8, timelineY);
              }
            });
          }
          
          yPos += Math.max(70, timelineY - yPos + 15);
        });
      }

      // Flight Summary Section
      if (data.flights && data.flights.length > 0) {
        checkPageBreak(60);
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Flight ', 20, yPos);
        doc.setTextColor(147, 51, 234);
        doc.text('Summary', 42, yPos);
        yPos += 15;
        
        data.flights.forEach((flight) => {
          checkPageBreak(20);
          
          doc.setFillColor(240, 230, 255);
          doc.roundedRect(20, yPos, pageWidth - 40, 15, 3, 3, 'F');
          
          const arrowWidth = 60;
          doc.setFillColor(220, 200, 255);
          doc.roundedRect(20, yPos, arrowWidth, 15, 3, 3, 'F');
          
          doc.setTextColor(84, 28, 156);
          doc.setFontSize(8);
          doc.text(flight.date || 'Thu 10 Jan\'24', 25, yPos + 9);
          
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text(`${flight.airline} From ${flight.from} To ${flight.to}`, 95, yPos + 9);
          
          yPos += 18;
        });
        
        doc.setFontSize(7);
        doc.setTextColor(100, 100, 100);
        doc.text('Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.', 20, yPos + 5);
        yPos += 20;
      }

      // Hotel Bookings Section
      if (data.hotels && data.hotels.length > 0) {
        checkPageBreak(80);
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Hotel ', 20, yPos);
        doc.setTextColor(147, 51, 234);
        doc.text('Bookings', 40, yPos);
        yPos += 15;
        
        // Table header
        doc.setFillColor(84, 28, 156);
        doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        const colWidths = [30, 30, 30, 20, 60];
        let xPos = 25;
        doc.text('City', xPos, yPos + 6);
        xPos += colWidths[0];
        doc.text('Check In', xPos, yPos + 6);
        xPos += colWidths[1];
        doc.text('Check Out', xPos, yPos + 6);
        xPos += colWidths[2];
        doc.text('Nights', xPos, yPos + 6);
        xPos += colWidths[3];
        doc.text('Hotel Name', xPos, yPos + 6);
        
        yPos += 10;
        
        data.hotels.forEach((hotel, index) => {
          checkPageBreak(12);
          
          if (index % 2 === 0) {
            doc.setFillColor(248, 240, 255);
          } else {
            doc.setFillColor(255, 255, 255);
          }
          doc.rect(20, yPos, pageWidth - 40, 10, 'F');
          
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(7);
          xPos = 25;
          doc.text(hotel.city, xPos, yPos + 6);
          xPos += colWidths[0];
          doc.text(hotel.checkIn, xPos, yPos + 6);
          xPos += colWidths[1];
          doc.text(hotel.checkOut, xPos, yPos + 6);
          xPos += colWidths[2];
          doc.text(hotel.nights.toString(), xPos, yPos + 6);
          xPos += colWidths[3];
          doc.text(hotel.name, xPos, yPos + 6);
          
          yPos += 10;
        });
        yPos += 15;
      }

      // Payment Plan Section
      if (data.paymentPlan) {
        checkPageBreak(100);
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Payment ', 20, yPos);
        doc.setTextColor(147, 51, 234);
        doc.text('Plan', 55, yPos);
        yPos += 15;
        
        // Total Amount
        doc.setFillColor(240, 230, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 12, 3, 3, 'F');
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.text('Total Amount', 25, yPos + 7);
        doc.text(`₹ ${data.paymentPlan.totalAmount.toLocaleString()} For ${data.tripDetails.numberOfTravelers} Pax (Inclusive of GST)`, 110, yPos + 7);
        yPos += 15;
        
        // TCS
        doc.setFillColor(240, 230, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 12, 3, 3, 'F');
        
        doc.text('TCS', 25, yPos + 7);
        doc.text(data.paymentPlan.tcsCollected ? 'Collected' : 'Not Collected', 110, yPos + 7);
        yPos += 20;
        
        // Installments
        if (data.paymentPlan.installments && data.paymentPlan.installments.length > 0) {
          doc.setFillColor(84, 28, 156);
          doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
          
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(8);
          doc.text('Installment', 25, yPos + 6);
          doc.text('Amount', 70, yPos + 6);
          doc.text('Due Date', 115, yPos + 6);
          yPos += 10;
          
          data.paymentPlan.installments.forEach((installment, index) => {
            checkPageBreak(12);
            
            if (index % 2 === 0) {
              doc.setFillColor(248, 240, 255);
            } else {
              doc.setFillColor(255, 255, 255);
            }
            doc.rect(20, yPos, pageWidth - 40, 10, 'F');
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(7);
            doc.text(installment.name, 25, yPos + 6);
            doc.text(`₹${installment.amount.toLocaleString()}`, 70, yPos + 6);
            doc.text(installment.description, 115, yPos + 6);
            
            yPos += 10;
          });
        }
        yPos += 15;
      }

      // Visa Details Section
      if (data.visaDetails) {
        checkPageBreak(40);
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Visa ', 20, yPos);
        doc.setTextColor(147, 51, 234);
        doc.text('Details', 40, yPos);
        yPos += 15;
        
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.text(`Visa Type: ${data.visaDetails.visaType}`, 30, yPos + 8);
        doc.text(`Validity: ${data.visaDetails.validity}`, 100, yPos + 8);
        doc.text(`Processing Date: ${data.visaDetails.processingDate}`, 30, yPos + 15);
        yPos += 35;
      }

      // Add footer to all pages
      addFooterToAllPages();

      // Return PDF as buffer
      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
      resolve(pdfBuffer);
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      reject(error);
    }
  });
};

module.exports = { generatePDF };