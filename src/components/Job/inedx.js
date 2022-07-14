import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'
import SimilarJob from './similarjob'
import FetchError from '../FetchError/index'

import './index.css'
import Header from '../Header/inedx'

class Job extends Component {
  state = {
    fetchError: false,
    isLoading: true,
    jobDetails: {},
    skillsList: [],
    similiarJobs: [],
  }

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.updateState(data)
      this.setState({isLoading: false})
    } else if (response.status === 400) {
      this.setState({fetchError: true})
    }
  }

  updateState = data => {
    const details = data.job_details
    const jobdetails = {
      id: details.id,
      companyLogo: details.company_logo_url,
      companyUrl: details.company_website_url,
      employmentType: details.employment_type,
      jobDescription: details.job_description,
      location: details.location,
      lifeAtCompanyDescription: details.life_at_company.description,
      lifeAtCompanyUrl: details.life_at_company.image_url,
      annualPackage: details.package_per_annum,
      rating: details.rating,
      title: details.title,
    }
    const skills = details.skills.map(item => ({
      name: item.name,
      url: item.image_url,
    }))
    const similarDetails = data.similar_jobs
    const similars = similarDetails.map(item => ({
      id: item.id,
      companyLogo: item.company_logo_url,
      employmentType: item.employment_type,
      jobDescription: item.job_description,
      location: item.location,
      rating: item.rating,
      title: item.title,
    }))
    this.setState({
      jobDetails: jobdetails,
      skillsList: skills,
      similiarJobs: similars,
    })
  }

  render() {
    const {
      isLoading,
      fetchError,
      skillsList,
      jobDetails,
      similiarJobs,
    } = this.state
    return (
      <div className="eachContainer">
        <Header />
        {fetchError ? (
          <FetchError getJobs={this.getJob} />
        ) : (
          <>
            {isLoading ? (
              <div className="loader-container eachJobLoader" testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <>
                <div className="eachJobDetailsContainer">
                  <div className="eachJobBrandContainer">
                    <img
                      src={jobDetails.companyLogo}
                      alt="job details company logo"
                      className="eachJobCompanyLogo"
                    />
                    <div className="eachJobTitleContainer">
                      <h1 className="eachJobCompanyTitle">
                        {jobDetails.title}
                      </h1>
                      <div className="eachJobRatingContainer">
                        <AiFillStar className="eachJobRatingStar" />
                        <p>{jobDetails.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="eachJobItemDetailsContainer">
                    <div className="eachJobItemLocationTypeContainer">
                      <MdLocationOn className="eachJobItemDetailsIcons" />
                      <p>{jobDetails.location}</p>
                    </div>
                    <div className="eachJobItemLocationTypeContainer">
                      <FaSuitcase className="eachJobItemDetailsIcons" />
                      <p>{jobDetails.employmentType}</p>
                    </div>
                    <p>{jobDetails.annualPackage}</p>
                  </div>
                  <hr />
                  <div className="eachJobDescriptionContainer">
                    <h2>Description</h2>
                    <a
                      className="eachJobAnchorTag"
                      href={jobDetails.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit <FiExternalLink />
                    </a>
                  </div>
                  <p>{jobDetails.jobDescription}</p>
                  <h2 className="eachJobSubHeadings">Skills</h2>
                  <ul className="eachJobSkillContainer">
                    {skillsList.map(skill => (
                      <li key={skill.name} className="eachJobListItem">
                        <img
                          src={skill.url}
                          alt={skill.name}
                          className="eachJobSkillsImage"
                        />
                        <p>{skill.name}</p>
                      </li>
                    ))}
                  </ul>
                  <h2>Life at Company</h2>
                  <div className="eachJobLifeAtCompanyContainer">
                    <p className="eachJobLifeAtCompanyPara">
                      {jobDetails.lifeAtCompanyDescription}
                    </p>
                    <img
                      className="eachJobLifeAtCompanyImage"
                      src={jobDetails.lifeAtCompanyUrl}
                      alt="life at company"
                    />
                  </div>
                </div>
                <h1 className="eachJobHeadingTwo">Similar Jobs</h1>
                <ul className="eachJobSimilarJobsContainer">
                  {similiarJobs.map(item => (
                    <SimilarJob key={item.id} details={item} />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    )
  }
}

export default Job
