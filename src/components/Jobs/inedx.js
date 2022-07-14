import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header/inedx'
import './index.css'
import EmployeeTypeList from '../EmployeeType/inedx'
import SalaryRange from '../SalaryRange/inedx'
import JobItem from '../JobItem/inedx'
import FetchError from '../FetchError/index'

class Jobs extends Component {
  state = {
    profile: {},
    profileLoaded: true,
    packageAmount: '',
    search: '',
    employmentType: [],
    jobsList: [],
    status: 'INITIAL',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({status: 'LOADING'})
    const {employmentType, packageAmount, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${packageAmount}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccess(data.jobs)
    } else if (response.status === 400 || response.status === 401) {
      this.setState({status: 'FAILED'})
    }
  }

  onSuccess = data => {
    const finalData = data.map(job => ({
      id: job.id,
      companyLogo: job.company_logo_url,
      companyType: job.employment_type,
      description: job.job_description,
      annualPackage: job.package_per_annum,
      rating: job.rating,
      title: job.title,
      location: job.location,
    }))
    if (finalData.length === 0) {
      this.setState({status: 'EMPTY', jobsList: finalData})
    } else {
      this.setState({
        jobsList: finalData,
        status: 'SUCCESS',
      })
    }
  }

  setProfile = data => {
    const finalData = {
      name: data.name,
      avatar: data.profile_image_url,
      bio: data.short_bio,
    }
    this.setState({profile: finalData})
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setProfile(data.profile_details)
      this.setState({profileLoaded: true})
    } else if (response.status === 400) {
      this.setState({profileLoaded: false})
    }
  }

  searchJobs = e => {
    this.setState({search: e.target.value})
  }

  handleSearch = () => {
    this.getJobs()
  }

  filterSalary = value => {
    this.setState({packageAmount: value}, this.getJobs)
  }

  filterType = value => {
    const {employmentType} = this.state
    const status = employmentType.filter(item => item === value)
    if (status.length === 0) {
      this.setState(
        oldState => ({
          employmentType: [...oldState.employmentType, value],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        oldState => ({
          employmentType: oldState.employmentType.filter(
            item => item !== value,
          ),
        }),
        this.getJobs,
      )
    }
  }

  RenderJobs = () => {
    const {status, search, jobsList} = this.state
    switch (status) {
      case 'LOADING':
        return (
          <div
            className="loader-container jobPortalJobsContainerLoader"
            testid="loader"
          >
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'EMPTY':
        return (
          <div className="jobPortalJobsContainer">
            <div className="jobPortalBgSearchContainer">
              <input
                placeholder="Search"
                type="search"
                className="jobPortalSearchInput"
                onChange={this.searchJobs}
                value={search}
              />
              <button
                type="button"
                testid="searchButton"
                className="jobPortalSearchButton"
                onClick={this.handleSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobPortalNoJobsErrorContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="jobPortalFetchErrorImage"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </div>
          </div>
        )
      case 'FAILED':
        return <FetchError getJobs={this.getJobs} />
      case 'SUCCESS':
        return (
          <div className="jobPortalJobsContainer">
            <div className="jobPortalBgSearchContainer">
              <input
                placeholder="Search"
                type="search"
                className="jobPortalSearchInput"
                onChange={this.searchJobs}
                value={search}
              />
              <button
                type="button"
                testid="searchButton"
                className="jobPortalSearchButton"
                onClick={this.handleSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobPortalJobsListContainer">
              {jobsList.map(job => (
                <JobItem jobsList={job} key={job.id} />
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {profile, profileLoaded, search} = this.state
    const {salaryRangesList, employmentTypesList} = this.props
    return (
      <div className="JobPortalMainContainer">
        <Header />

        <div className="jobPortalBodyContainer">
          <div className="jobPortalSmSearchContainer">
            <input
              placeholder="Search"
              type="search"
              className="jobPortalSearchInput"
              onChange={this.searchJobs}
              value={search}
            />
            <button
              type="button"
              testid="searchButton"
              className="jobPortalSearchButton"
              onClick={this.handleSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="jobPortalFiltersContainer">
            {profileLoaded ? (
              <div className="jobPortalProfileContainer">
                <img src={profile.avatar} alt="profile" />
                <p className="jobPortalProfileName">{profile.name}</p>
                <p className="jobPortalProfilePara">{profile.bio}</p>
              </div>
            ) : (
              <div className="jobPortalProfileFailureContainer">
                <button
                  type="button"
                  className="jobPortalProfileRetryButton"
                  onClick={this.getProfile}
                >
                  Retry
                </button>
              </div>
            )}
            <hr className="jobPortalLine" />
            <ul>
              <h1 className="jobPortalFiltersHeading">Type of Employment</h1>
              {employmentTypesList.map(list => (
                <EmployeeTypeList
                  key={list.employmentTypeId}
                  label={list.label}
                  id={list.employmentTypeId}
                  filterType={this.filterType}
                />
              ))}
            </ul>
            <hr className="jobPortalLine" />
            <ul>
              <h1 className="jobPortalFiltersHeading">Salary Range</h1>
              {salaryRangesList.map(list => (
                <SalaryRange
                  key={list.salaryRangeId}
                  label={list.label}
                  id={list.salaryRangeId}
                  filterSalary={this.filterSalary}
                />
              ))}
            </ul>
          </div>
          <this.RenderJobs />
        </div>
      </div>
    )
  }
}

export default Jobs
