import {Component} from 'react'
import {FaSuitcase, FaStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchJob extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchWord: '',
  }

  componentDidMount() {
    this.getjobs()
    this.props.callBack(this.getjobs)
  }

  getjobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {selectedEmploymentTypes, selectedSalaryRange} = this.props
    const employmentTypeParam = selectedEmploymentTypes.join(',')
    const minimumPackageParam = selectedSalaryRange

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParam}&minimum_package=${minimumPackageParam}&search=${this.state.searchWord}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      this.setState({
        jobsList: fetchedData.jobs,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401 || response.ok === false) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  setSearchWord = e => {
    this.setState({searchWord: e.target.value})
  }

  renderLoader = () => (
    <div className="jobs-loader-container search-job">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobs = jobsList => {
    const {searchWord} = this.state
    if (jobsList.length === 0) return this.renderNojob
    return (
      <div className="search-job">
        <div className="search-bar">
          <input
            type="search"
            value={searchWord}
            onChange={this.setSearchWord}
          />
          <button
            onClick={this.getjobs}
            className="icon"
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-list">
          {jobsList.map(job => (
            <Link to={`/jobs/${job.id}`} key={job.id}>
              <li key={job.id}>
                <div className="job-head">
                  <img src={job.company_logo_url} alt="company logo" />
                  <div>
                    <h1>{job.title}</h1>
                    <p>
                      {job.rating}
                      <FaStar className="star" />
                    </p>
                  </div>
                </div>
                <div className="job-detail">
                  <div>
                    <p>
                      <MdLocationOn />
                      {job.location}
                    </p>
                    <p>
                      <FaSuitcase />
                      {job.employment_type}
                    </p>
                  </div>
                  <p>{job.package_per_annum}</p>
                </div>
                <div className="job-description">
                  <h1>Description</h1>
                  <p>{job.job_description}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderNojob = () => (
    <div className="search-job">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs.Try other filters </p>
    </div>
  )

  renderFailurView = () => (
    <div className="search-job">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-button" onClick={this.getjobs}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus, jobsList} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobs(jobsList)
      case apiStatusConstants.failure:
        return this.renderFailurView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default SearchJob
