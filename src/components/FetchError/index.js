function FetchError(params) {
  const {getJobs} = params

  const handleClick = () => {
    getJobs()
  }
  return (
    <div className="jobPortalFetchingErrorContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobPortalFetchErrorImage"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="jobPortalProfileRetryButton"
        onClick={handleClick}
      >
        Retry
      </button>
    </div>
  )
}

export default FetchError
