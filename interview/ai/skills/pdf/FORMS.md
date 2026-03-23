# PDF Form Filling Guide

## Overview

Filling PDF forms requires detecting form fields and writing values into them.
Use `pypdf` for simple forms, or `pdf-lib` (JavaScript) for complex interactive forms.

---

## Step 1: Inspect Form Fields

Before filling, always list available fields:

```python
from pypdf import PdfReader

reader = PdfReader("form.pdf")
fields = reader.get_fields()

if fields:
    for field_name, field_obj in fields.items():
        print(f"Field: {field_name}")
        print(f"  Type: {field_obj.field_type}")
        print(f"  Value: {field_obj.value}")
else:
    print("No form fields found — this may be a flat/scanned PDF")
```

---

## Step 2: Fill Form Fields with pypdf

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("form.pdf")
writer = PdfWriter()

# Copy all pages
for page in reader.pages:
    writer.add_page(page)

# Clone form fields from reader
writer.clone_reader_document_root(reader)

# Fill fields
writer.update_page_form_field_values(
    writer.pages[0],
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "date": "2026-03-19",
    }
)

with open("filled_form.pdf", "wb") as output:
    writer.write(output)
```

---

## Step 3: Fill Forms with pdf-lib (JavaScript)

For interactive forms with dropdowns, checkboxes, and radio buttons:

```javascript
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function fillForm() {
  const formBytes = fs.readFileSync('form.pdf');
  const pdfDoc = await PDFDocument.load(formBytes);
  const form = pdfDoc.getForm();

  // Text fields
  form.getTextField('first_name').setText('John');
  form.getTextField('last_name').setText('Doe');

  // Checkboxes
  form.getCheckBox('agree_terms').check();

  // Dropdowns
  form.getDropdown('country').select('China');

  // Radio buttons
  form.getRadioGroup('gender').select('male');

  // Flatten form (make fields non-editable)
  form.flatten();

  fs.writeFileSync('filled_form.pdf', await pdfDoc.save());
}

fillForm();
```

---

## Common Field Types

| Field Type | pypdf Access | pdf-lib Access |
|------------|-------------|----------------|
| Text | `update_page_form_field_values` | `getTextField()` |
| Checkbox | Set value to `"/Yes"` or `"/Off"` | `getCheckBox().check()` |
| Radio | Set value to option name | `getRadioGroup().select()` |
| Dropdown | Set value to option string | `getDropdown().select()` |
| Signature | Not supported in pypdf | Use dedicated signing lib |

---

## Troubleshooting Forms

| Problem | Solution |
|---------|----------|
| `get_fields()` returns None | PDF has no AcroForm fields (scanned/flat PDF) |
| Field value not saving | Use `clone_reader_document_root()` before writing |
| Fields disappear after save | Don't call `flatten()` if you want editable output |
| Checkbox not checking | Value must be `"/Yes"` not `"Yes"` |
| Non-ASCII characters corrupted | Ensure PDF uses UTF-8 compatible font |
