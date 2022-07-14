import Header from '../Header/inedx'
import './index.css'

function NotFound() {
  return (
    <div className="pageNotFoundContainer">
      <Header />
      <div className="notFoundImageContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notFoundImage"
        />
        <h1>Page Not Found</h1>
        <p>We&rsquo;re sorry, the page you requested could not be found</p>
      </div>
    </div>
  )
}

export default NotFound
