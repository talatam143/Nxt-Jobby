import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header/inedx'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeMainContainer">
        <Header />
        <div className="homeContainer">
          <h1 className="homeContainerMainHead">
            Find The Job That Fits Your Life
          </h1>
          <p className="homeContainerPara">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="homeContainerJobsButton" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
