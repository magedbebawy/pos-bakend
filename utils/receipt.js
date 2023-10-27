const ESC = '\x1B';
const GS = '\x1D';
const cut = GS + 'V' + '\x00';
const center = ESC + 'a' + '\x01';
const left = ESC + 'a' + '\x00';
const bold = ESC + 'E' + '\x01';
const regular = ESC + 'E' + '\x00';

let receipt = "";

// Header
receipt += center + bold + "Your Store Name\n";
receipt += "123 Store St, City, ZIP\n";
receipt += "Phone: (123) 456-7890\n";
receipt += regular + "------------------------\n"; 

// Transaction Details
receipt += left + "Date: " + new Date().toLocaleDateString() + "\n";
receipt += "Time: " + new Date().toLocaleTimeString() + "\n";
receipt += "Trans ID: 123456\n";
receipt += "------------------------\n";

// Items (assuming you loop through items)
// item = { description: "Product 1", qty: 2, price: 10 }
// receipt += left + item.description + "\n";
// receipt += `${item.qty} x $${item.price} = $${item.qty * item.price}\n`;

// Summary
receipt += "------------------------\n";
// receipt += `Subtotal: $${subtotal}\n`;
// receipt += `Tax: $${tax}\n`;
// receipt += `Total: $${total}\n`;

// // Payment Details
// receipt += "Payment: Cash\n";
// receipt += `Paid: $${amountPaid}\n`;
// receipt += `Change Due: $${changeDue}\n`;
receipt += "------------------------\n";

// Footer
receipt += center + "Thank you for shopping with us!\n";
receipt += "Returns accepted within 30 days with receipt.\n";
receipt += "\n"+"\n";
receipt += "\n"+"\n";
receipt += "\n"+"\n";
receipt += cut;

module.exports = receipt;