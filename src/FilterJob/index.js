import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterJob extends Component {
  state = {
    profile: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/profile`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updateData = {
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
        name: fetchedData.profile_details.name,
      }

      this.setState({
        profile: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401 || response.ok === false) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderUserProfile = () => {
    const {profile} = this.state
    const {profileImageUrl, shortBio, name} = profile
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="jobs-loader-container search-job">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <button className="retry-button" onClick={this.getProfile}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfile()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {
      selectedEmploymentTypes,
      selectedSalaryRange,
      handleEmploymentTypeChange,
      handleSalaryRangeChange,
    } = this.props
    const {apiStatus} = this.state
    return (
      <div className="filter-page">
        {this.renderProfile()}
        <div className="filter-section">
          <h1>Filter Section</h1>
          <h3>Employment Types</h3>
          <ul>
            {employmentTypesList.map(type => (
              <li key={type.employmentTypeId}>
                <input
                  type="checkbox"
                  id={type.employmentTypeId}
                  checked={selectedEmploymentTypes.includes(
                    type.employmentTypeId,
                  )}
                  onChange={() =>
                    handleEmploymentTypeChange(type.employmentTypeId)
                  }
                />
                <label htmlFor={type.employmentTypeId}>{type.label}</label>
              </li>
            ))}
          </ul>

          <h3>Salary Range</h3>
          <ul>
            {salaryRangesList.map(range => (
              <li key={range.salaryRangeId}>
                <input
                  type="radio"
                  id={range.salaryRangeId}
                  name="salaryRange"
                  checked={selectedSalaryRange === range.salaryRangeId}
                  onChange={() => handleSalaryRangeChange(range.salaryRangeId)}
                />
                <label htmlFor={range.salaryRangeId}>{range.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterJob
