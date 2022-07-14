import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

function JobItem(params) {
  const {jobsList} = params
  const {
    id,
    companyLogo,
    companyType,
    description,
    annualPackage,
    rating,
    title,
    location,
  } = jobsList

  return (
    <Link to={`jobs/${id}`} className="jobItemLink">
      <li className="jobItemContainer">
        <div className="jobItemCompanyContainer">
          <img
            src={companyLogo}
            alt="website logo"
            className="jobItemCompanyLogo"
          />
          <div className="jobItemCompanyBrandWithRatingContainer">
            <h1 className="jobTitle">{title}</h1>
            <div className="jobItemCompanyRatingContainer">
              <AiFillStar className="jobItemRatingIcon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobItemDetailsContainer">
          <div className="jobItemLocationTypeContainer">
            <MdLocationOn className="jobItemDetailsIcons" />
            <p>{location}</p>
          </div>
          <div className="jobItemLocationTypeContainer">
            <FaSuitcase className="jobItemDetailsIcons" />
            <p>{companyType}</p>
          </div>

          <p className="jobItemPackage">{annualPackage}</p>
        </div>
        <hr />
        <p>Description</p>
        <p>{description}</p>
      </li>
    </Link>
  )
}

export default JobItem
