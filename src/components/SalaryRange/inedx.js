import './index.css'

function SalaryRange(params) {
  const {label, id, filterSalary} = params

  const handleSalary = e => {
    filterSalary(e.target.value)
  }

  return (
    <li className="SalaryRangeContainer" key={id}>
      <input
        type="radio"
        id={id}
        name="category"
        value={id}
        onChange={handleSalary}
      />
      <label htmlFor={id}> {label}</label>
    </li>
  )
}

export default SalaryRange
