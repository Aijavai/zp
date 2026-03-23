# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
from pypdf import PdfReader

path = 'd:\\xwechat_files\\wxid_e7lm1unylytd22_b738\\msg\\file\\2026-03\\刘松韬-17807080178(1).pdf'
reader = PdfReader(path)
print(f'Total pages: {len(reader.pages)}')
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    print(f'\n=== Page {i+1} ===')
    print(text)
