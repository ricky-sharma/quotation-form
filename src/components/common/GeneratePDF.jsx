import JsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const htmlStringToPdf = async (htmlString) => {
	let iframe = document.createElement("iframe");
	iframe.style.visibility = "hidden";
	iframe.style.height = "0";
	iframe.style.width = "0";
	document.body.appendChild(iframe);
	let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
	iframedoc.body.innerHTML = htmlString;

	let canvas = await html2canvas(iframedoc.body, {});

	// Convert the iframe into a PNG image using canvas.
	let imgData = canvas.toDataURL("image/png");

	// Create a PDF document and add the image as a page.
	const doc = new JsPDF({
		format: "a4",
		unit: "mm",
	});
	doc.addImage(imgData, "PNG", 0, 0, 210, 297);

	// Get the file as blob output.
	let blob = doc.output("blob");
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = 'PDF-blob-name.pdf';
	link.click();

	// Remove the iframe from the document when the file is generated.
	document.body.removeChild(iframe);
};


//let htmlString1 = "<!DOCTYPE html><html><body><p><b>This text is bold</b></p><p><i>This text is italic</i></p><p>This is<sub> subscript</sub> and <sup>superscript</sup></p></body></html>";
export const pdfBlobOutput = (htmlString) => htmlStringToPdf(htmlString);