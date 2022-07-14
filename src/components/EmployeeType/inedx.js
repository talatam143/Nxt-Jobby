import './index.css'

function EmployeeTypeList(params) {
  const {label, id, filterType} = params

  const handleType = e => {
    filterType(e.target.value)
  }

  return (
    <li className="EmployeeTypeList" key={id}>
      <input type="checkbox" id={id} value={id} onChange={handleType} />
      <label htmlFor={id}> {label}</label>
    </li>
  )
}

export default EmployeeTypeList
