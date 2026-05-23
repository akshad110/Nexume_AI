# Strapi fields for Resume Builder templates

After updating `user-resume` schema, **restart Strapi** and verify fields in **Content-Type Builder → User Resume**.

## Fields to add on `user-resume` collection

| Field name | Type | Notes |
|------------|------|--------|
| `templateId` | Text (string) | `classic` or `professional` |
| `website` | Text (string) | Optional, for professional template header |
| `projects` | JSON | Array of `{ "name": "", "description": "" }` |
| `programmingSkills` | JSON | Object `{ "languages": "", "technologies": "" }` |
| `customSections` | JSON | Array of `{ "title": "", "content": "" }` — coursework, achievements, etc. |
| `sectionVisibility` | JSON | e.g. `{ "experience": false }` to hide experience for freshers |

Existing fields used: `education` (component), `experience` (JSON), `skills` (component), `themeColor`, personal fields.

## Example JSON shapes

**projects:**
```json
[
  {
    "name": "QuantSoftware Toolkit",
    "description": "Open source python library for financial data analysis."
  }
]
```

**programmingSkills:**
```json
{
  "languages": "Scala, Python, Javascript, C++, SQL, Java",
  "technologies": "AWS, Play, React, Kafka, GCE"
}
```

**customSections:**
```json
[
  { "title": "Coursework", "content": "Data Structures, Algorithms, Machine Learning" },
  { "title": "Achievements", "content": "Dean's List 2024; Hackathon winner" }
]
```

**sectionVisibility:**
```json
{ "experience": false }
```

## API permissions

Ensure your API token role can **create/read/update** these fields on `user-resume`.
