import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

import './index.css'

function SimilarJob(params) {
  const {details} = params
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li className="similarJobContainer">
      <div className="similarJobCompanyContainer">
        <img
          src={companyLogo}
          alt="similar job company logo"
          className="similarCompanyLogo"
        />
        <div className="similarCompanyBrand">
          <h1 className="similarTitle">{title}</h1>
          <div className="similarRatingContainer">
            <AiFillStar className="similarJobRatingStar" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h3>Description</h3>
      <p>{jobDescription}</p>
      <div className="similarLocationContainer">
        <div className="similarSubLocationContainer">
          <MdLocationOn className="similarIcons" />
          <p>{location}</p>
        </div>
        <div className="similarSubLocationContainer">
          <FaSuitcase className="similarIcons" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
