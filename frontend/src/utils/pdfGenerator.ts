import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { User, Payment } from '@/types';

interface ReceiptData {
  receiptNumber: string;
  user: User;
  payment: Payment;
  generatedAt: string;
}

export const generatePDF = async (element: HTMLElement, receiptData: ReceiptData): Promise<void> => {
  try {
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    const filename = `Akrix_Receipt_${receiptData.receiptNumber}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Download PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const generateAdvancedPDF = (receiptData: ReceiptData): void => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Colors
  const primaryColor = [139, 92, 246]; // #8B5CF6
  const secondaryColor = [245, 158, 11]; // #F59E0B
  const textColor = [31, 41, 55]; // #1F2937
  const grayColor = [107, 114, 128]; // #6B7280

  // Header
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, 210, 40, 'F');
  
  // Logo placeholder (you would add actual logo here)
  pdf.setFillColor(255, 255, 255);
  pdf.rect(15, 10, 20, 20, 'F');
  
  // Company name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Akrix.ai', 45, 20);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Algorithms with Ambition', 45, 28);
  
  // Receipt title
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RECEIPT', 160, 20);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`#${receiptData.receiptNumber}`, 160, 28);

  // Reset text color
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  // Customer Information
  let yPos = 60;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Customer Information', 15, yPos);
  
  yPos += 10;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  pdf.text('Name:', 15, yPos);
  pdf.text(receiptData.user.name, 40, yPos);
  
  yPos += 8;
  pdf.text('Email:', 15, yPos);
  pdf.text(receiptData.user.email, 40, yPos);
  
  yPos += 8;
  pdf.text('Phone:', 15, yPos);
  pdf.text(receiptData.user.phone, 40, yPos);
  
  yPos += 8;
  pdf.text('Address:', 15, yPos);
  const addressLines = pdf.splitTextToSize(receiptData.user.address, 150);
  pdf.text(addressLines, 40, yPos);
  
  // Payment Information
  yPos = 60;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Payment Information', 110, yPos);
  
  yPos += 10;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  pdf.text('Date:', 110, yPos);
  pdf.text(new Date(receiptData.payment.createdAt).toLocaleDateString('en-IN'), 135, yPos);
  
  yPos += 8;
  pdf.text('Method:', 110, yPos);
  pdf.text(receiptData.payment.paymentMode.replace('_', ' ').toUpperCase(), 135, yPos);
  
  yPos += 8;
  pdf.text('Status:', 110, yPos);
  pdf.text(receiptData.payment.status.toUpperCase(), 135, yPos);
  
  // Amount section
  yPos = 140;
  pdf.setFillColor(248, 250, 252);
  pdf.rect(15, yPos - 5, 180, 25, 'F');
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Total Amount Paid:', 20, yPos + 8);
  
  pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.setFontSize(20);
  pdf.text(`₹${receiptData.payment.amount.toLocaleString('en-IN')}`, 150, yPos + 8);
  
  // Footer
  pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Thank you for your payment! This receipt serves as proof of your transaction.', 15, 200);
  pdf.text(`Generated on ${new Date(receiptData.generatedAt).toLocaleDateString('en-IN')} | Akrix.ai Receipt System`, 15, 210);
  
  // Generate filename and save
  const filename = `Akrix_Receipt_${receiptData.receiptNumber}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(filename);
};
