# PDF Processing Reference

## Advanced pypdfium2 Usage

```python
import pypdfium2 as pdfium

# Open PDF
pdf = pdfium.PdfDocument("document.pdf")
print(f"Pages: {len(pdf)}")

# Render page to image
page = pdf[0]
bitmap = page.render(scale=2)  # 2x resolution
pil_image = bitmap.to_pil()
pil_image.save("page_1.png")

# Extract text with positions
textpage = page.get_textpage()
text = textpage.get_text_range()
print(text)

pdf.close()
```

## JavaScript: pdf-lib

### Install
```bash
npm install pdf-lib
```

### Create PDF
```javascript
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('Hello from pdf-lib!', {
    x: 50, y: 750,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}

createPdf();
```

### Merge PDFs
```javascript
async function mergePdfs(paths, outputPath) {
  const mergedPdf = await PDFDocument.create();
  for (const pdfPath of paths) {
    const bytes = fs.readFileSync(pdfPath);
    const pdf = await PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }
  fs.writeFileSync(outputPath, await mergedPdf.save());
}
```

### Add Image to PDF
```javascript
async function addImage() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const imageBytes = fs.readFileSync('image.png');
  const image = await pdfDoc.embedPng(imageBytes);
  const { width, height } = image.scale(0.5);
  page.drawImage(image, { x: 50, y: 500, width, height });
  fs.writeFileSync('with-image.pdf', await pdfDoc.save());
}
```

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Garbled text extraction | Scanned/image PDF | Use OCR (pytesseract) |
| Missing fonts in created PDF | Font not embedded | Use `embedFont()` in pdf-lib or registerFont in reportlab |
| Large file size | Uncompressed images | Use `compress_content_streams()` in pypdf |
| Unicode boxes in reportlab | Unicode subscripts | Use `<sub>` / `<super>` XML tags in Paragraph |
| Password-protected PDF | Encryption | Provide password to `PdfReader(path, password='...')` |
| Table extraction fails | Complex layout | Try `pdfplumber` with custom `table_settings` |

## Useful pip Packages

```bash
pip install pypdf          # Core PDF read/write
pip install pdfplumber     # Text + table extraction
pip install reportlab      # Create PDFs from scratch
pip install pdf2image      # Convert PDF pages to images
pip install pytesseract    # OCR
pip install pypdfium2      # High-fidelity rendering
```
