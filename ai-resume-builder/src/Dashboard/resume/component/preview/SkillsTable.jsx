import React from 'react'

/** Two-column skills layout (template2 / template3 LaTeX tabular style) */
function SkillsTable({ skills, themeColor = '#171717' }) {
  const rows = (skills ?? []).filter(
    (item) => item?.title || (item?.skills && item.skills.length),
  )
  if (!rows.length) return null

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '10px',
        lineHeight: 1.45,
      }}
    >
      <tbody>
        {rows.map((item, index) => (
          <tr key={index}>
            <td
              style={{
                fontWeight: 700,
                verticalAlign: 'top',
                width: '28%',
                padding: '2px 8px 4px 0',
                color: themeColor,
              }}
            >
              {item.title}
            </td>
            <td style={{ verticalAlign: 'top', padding: '2px 0 4px 0' }}>
              {(item.skills ?? []).join(', ')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SkillsTable
