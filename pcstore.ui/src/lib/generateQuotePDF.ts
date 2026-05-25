import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartItem } from '@/store/useCartStore';

export function generateQuotePDF(items: CartItem[], total: number) {
  const doc = new jsPDF();

  // Branding & Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 215, 0); // Nanotek Yellow (approximately)
  doc.text('NANOTEK', 14, 20);
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text('Nanotek Computer Solutions', 14, 28);
  doc.text('No 123, Galle Road, Colombo 04, Sri Lanka.', 14, 33);
  doc.text('Phone: 0777 292 272 | Email: info@nanotek.lk', 14, 38);

  // Document Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text('CUSTOM BUILD QUOTATION', 14, 55);

  // Date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 62);

  // Table Data
  const tableColumn = ["Item Description", "Unit Price (LKR)", "Qty", "Subtotal (LKR)"];
  const tableRows = items.map(item => [
    item.name,
    item.price.toLocaleString(undefined, { minimumFractionDigits: 2 }),
    item.quantity.toString(),
    (item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })
  ]);

  // Generate Table
  autoTable(doc, {
    startY: 70,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [17, 17, 17], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: 'right' },
      2: { halign: 'center' },
      3: { halign: 'right' }
    }
  });

  // Grand Total
  const finalY = (doc as any).lastAutoTable.finalY || 70;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`GRAND TOTAL: LKR ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 14, finalY + 15);

  // Footer Note
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text('Note: Prices are subject to change based on stock availability.', 14, finalY + 30);
  doc.text('This is a system generated quotation.', 14, finalY + 35);

  // Save the PDF
  doc.save(`Nanotek-Quote-${new Date().getTime()}.pdf`);
}
