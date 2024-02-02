import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FaSuitcase, FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetail extends Component {
  state = {
    jobDetail: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getjobs()
  }

  getjobs = async () => {
    const {id} = this.props.match.params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateDate = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }
      this.setState({
        jobDetail: updateDate,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401 || response.ok === false) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderjobDetailList = () => {
    const {similarJobs, jobDetails} = this.state.jobDetail
    return (
      <>
        <Header />
        <div className="full-page">
          <div className="job-full-detail">
            <div className="job-head">
              <img
                src={jobDetails.company_logo_url}
                alt="job details company logo"
              />
              <div>
                <h1>{jobDetails.title}</h1>
                <a href={jobDetails.company_website_url}>Visit</a>
                <p>
                  {jobDetails.rating}
                  <FaStar className="star" />
                </p>
              </div>
            </div>
            <div className="job-detail">
              <div>
                <p>
                  <MdLocationOn />
                  {jobDetails.location}
                </p>
                <p>
                  <FaSuitcase />
                  {jobDetails.employment_type}
                </p>
              </div>
              <p>{jobDetails.package_per_annum}</p>
            </div>
            <div className="job-description">
              <h1>Description</h1>
              <p>{jobDetails.job_description}</p>
            </div>
            <div className="job-skills">
              <h1>Skills</h1>
              <ul>
                {jobDetails.skills.map(skill => (
                  <li className="skill" key={skill.name}>
                    <img src={skill.image_url} alt={skill.name} />
                    <p>{skill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-company">
              <h1>Life at Company</h1>
              <div>
                <p>{jobDetails.life_at_company.description}</p>
                <img src={jobDetails.life_at_company.image_url} />
              </div>
            </div>
          </div>

          <h1 style={{color: '#ffffff'}}>Similar Jobs</h1>
          <ul className="similar-job">
            {similarJobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} onClick={this.getjobs}>
                <li className="job-full-detail" key={job.id}>
                  <div className="job-head">
                    <img
                      src={job.company_logo_url}
                      alt="similar job company logo"
                    />
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
      </>
    )
  }

  renderjobDetailFailureView = () => (
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

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobDetailList()
      case apiStatusConstants.failure:
        return this.renderjobDetailFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobDetail
