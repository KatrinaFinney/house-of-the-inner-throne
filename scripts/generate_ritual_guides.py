#!/usr/bin/env python3
"""Generate the Shrine of the Inner Throne ritual-foundation PDF library."""

from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content" / "ritual-guides" / "guides.json"
OUTPUT = ROOT / "public" / "guides"

INK = colors.HexColor("#171610")
CHARCOAL = colors.HexColor("#25251F")
GOLD = colors.HexColor("#B8944F")
SAGE = colors.HexColor("#6F7B68")
IVORY = colors.HexColor("#F4EFE3")
MUTED = colors.HexColor("#645F55")
PALE = colors.HexColor("#E7DFCF")


def register_fonts() -> None:
    base = Path("/usr/share/fonts/truetype/dejavu")
    pdfmetrics.registerFont(TTFont("ShrineSerif", str(base / "DejaVuSerif.ttf")))
    pdfmetrics.registerFont(TTFont("ShrineSerifBold", str(base / "DejaVuSerif-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("ShrineSans", str(base / "DejaVuSans.ttf")))
    pdfmetrics.registerFont(TTFont("ShrineSansBold", str(base / "DejaVuSans-Bold.ttf")))


def styles():
    sheet = getSampleStyleSheet()
    return {
        "cover_kicker": ParagraphStyle(
            "CoverKicker", parent=sheet["Normal"], fontName="ShrineSansBold",
            fontSize=9, leading=12, textColor=GOLD, alignment=TA_CENTER,
            spaceAfter=22, tracking=2.3,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle", parent=sheet["Title"], fontName="ShrineSerif",
            fontSize=35, leading=40, textColor=IVORY, alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle", parent=sheet["Normal"], fontName="ShrineSerif",
            fontSize=14, leading=21, textColor=PALE, alignment=TA_CENTER,
            leftIndent=32, rightIndent=32, spaceAfter=28,
        ),
        "cover_note": ParagraphStyle(
            "CoverNote", parent=sheet["Normal"], fontName="ShrineSans",
            fontSize=8.8, leading=14, textColor=colors.HexColor("#BEB7A8"),
            alignment=TA_CENTER, leftIndent=46, rightIndent=46,
        ),
        "chapter_kicker": ParagraphStyle(
            "ChapterKicker", parent=sheet["Normal"], fontName="ShrineSansBold",
            fontSize=8, leading=11, textColor=GOLD, spaceAfter=9, tracking=1.8,
        ),
        "h1": ParagraphStyle(
            "HeadingOne", parent=sheet["Heading1"], fontName="ShrineSerif",
            fontSize=25, leading=30, textColor=INK, spaceAfter=13,
        ),
        "h2": ParagraphStyle(
            "HeadingTwo", parent=sheet["Heading2"], fontName="ShrineSerifBold",
            fontSize=14, leading=19, textColor=CHARCOAL, spaceBefore=12, spaceAfter=8,
        ),
        "lead": ParagraphStyle(
            "Lead", parent=sheet["Normal"], fontName="ShrineSerif",
            fontSize=12.2, leading=19, textColor=SAGE, spaceAfter=13,
        ),
        "body": ParagraphStyle(
            "Body", parent=sheet["BodyText"], fontName="ShrineSerif",
            fontSize=10.1, leading=16.4, textColor=CHARCOAL, spaceAfter=9,
        ),
        "small": ParagraphStyle(
            "Small", parent=sheet["BodyText"], fontName="ShrineSans",
            fontSize=8.3, leading=13, textColor=MUTED, spaceAfter=7,
        ),
        "bullet": ParagraphStyle(
            "Bullet", parent=sheet["BodyText"], fontName="ShrineSerif",
            fontSize=9.8, leading=15.6, textColor=CHARCOAL,
            leftIndent=16, firstLineIndent=-10, bulletIndent=4, spaceAfter=5,
        ),
        "step": ParagraphStyle(
            "Step", parent=sheet["BodyText"], fontName="ShrineSerif",
            fontSize=9.8, leading=15.6, textColor=CHARCOAL,
            leftIndent=20, firstLineIndent=-16, spaceAfter=7,
        ),
        "quote": ParagraphStyle(
            "Quote", parent=sheet["BodyText"], fontName="ShrineSerif",
            fontSize=12.3, leading=19, textColor=SAGE, leftIndent=24,
            rightIndent=24, alignment=TA_CENTER, spaceBefore=9, spaceAfter=11,
        ),
        "source": ParagraphStyle(
            "Source", parent=sheet["BodyText"], fontName="ShrineSans",
            fontSize=7.7, leading=11.5, textColor=MUTED, leftIndent=14,
            firstLineIndent=-9, spaceAfter=5,
        ),
    }


class ShrineDoc(BaseDocTemplate):
    def __init__(self, filename: str, title: str):
        super().__init__(
            filename,
            pagesize=letter,
            title=title,
            author="Shrine of the Inner Throne",
            subject="Ritual Foundations",
            leftMargin=0.78 * inch,
            rightMargin=0.78 * inch,
            topMargin=0.72 * inch,
            bottomMargin=0.7 * inch,
        )
        frame = Frame(
            self.leftMargin, self.bottomMargin, self.width, self.height,
            id="body", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="main", frames=[frame], onPage=self.decorate))

    def decorate(self, canvas, doc):
        page = canvas.getPageNumber()
        canvas.saveState()
        if page == 1:
            canvas.setFillColor(INK)
            canvas.rect(0, 0, letter[0], letter[1], stroke=0, fill=1)
            canvas.setStrokeColor(GOLD)
            canvas.setLineWidth(0.7)
            canvas.rect(0.48 * inch, 0.48 * inch, letter[0] - 0.96 * inch, letter[1] - 0.96 * inch, stroke=1, fill=0)
            canvas.setStrokeColor(SAGE)
            canvas.setLineWidth(0.3)
            canvas.rect(0.57 * inch, 0.57 * inch, letter[0] - 1.14 * inch, letter[1] - 1.14 * inch, stroke=1, fill=0)
        else:
            canvas.setFillColor(IVORY)
            canvas.rect(0, 0, letter[0], letter[1], stroke=0, fill=1)
            canvas.setStrokeColor(GOLD)
            canvas.setLineWidth(0.45)
            canvas.line(self.leftMargin, 0.49 * inch, letter[0] - self.rightMargin, 0.49 * inch)
            canvas.setFont("ShrineSans", 7.2)
            canvas.setFillColor(MUTED)
            canvas.drawString(self.leftMargin, 0.31 * inch, "SHRINE OF THE INNER THRONE  /  RITUAL FOUNDATIONS")
            canvas.drawRightString(letter[0] - self.rightMargin, 0.31 * inch, str(page))
        canvas.restoreState()


def chapter(story, s, number: str, title: str, lead: str | None = None):
    story.append(Paragraph(f"CHAMBER {number}", s["chapter_kicker"]))
    story.append(Paragraph(title, s["h1"]))
    story.append(HRFlowable(width="24%", thickness=1, color=GOLD, spaceAfter=14, hAlign="LEFT"))
    if lead:
        story.append(Paragraph(lead, s["lead"]))


def add_section(story, s, section):
    story.append(Paragraph(section["heading"], s["h2"]))
    for paragraph in section.get("paragraphs", []):
        story.append(Paragraph(paragraph, s["body"]))
    for item in section.get("bullets", []):
        story.append(Paragraph(item, s["bullet"], bulletText="•"))
    for index, item in enumerate(section.get("steps", []), 1):
        story.append(Paragraph(f"<b>{index}.</b> {item}", s["step"]))
    if section.get("words"):
        story.append(Paragraph(section["words"], s["quote"]))


def build_guide(guide, s):
    path = OUTPUT / guide["filename"]
    doc = ShrineDoc(str(path), f"{guide['title']} - Shrine of the Inner Throne")
    story = [Spacer(1, 1.45 * inch)]
    story.append(Paragraph("RITUAL FOUNDATIONS", s["cover_kicker"]))
    story.append(Paragraph(guide["title"], s["cover_title"]))
    story.append(HRFlowable(width="28%", thickness=1, color=GOLD, spaceBefore=2, spaceAfter=22, hAlign="CENTER"))
    story.append(Paragraph(guide["subtitle"], s["cover_subtitle"]))
    story.append(Spacer(1, 0.35 * inch))
    story.append(Paragraph("SHRINE OF THE INNER THRONE", s["cover_kicker"]))
    story.append(Paragraph("A sovereignty-led companion for disciplined, culturally careful practice.", s["cover_note"]))
    story.append(PageBreak())

    for ci, chamber_data in enumerate(guide["chambers"], 1):
        chapter(story, s, f"{ci:02d}", chamber_data["title"], chamber_data.get("lead"))
        for section in chamber_data.get("sections", []):
            add_section(story, s, section)
        if ci != len(guide["chambers"]):
            story.append(PageBreak())

    doc.build(story)
    return path


def main() -> None:
    register_fonts()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    s = styles()
    for guide in data["guides"]:
        path = build_guide(guide, s)
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
