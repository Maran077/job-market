import {Component} from 'react'
import Header from '../Header'
import SearchJob from '../SearchJob'
import FilterJob from '../FilterJob'
import './index.css'

class Job extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedEmploymentTypes: [],
      selectedSalaryRange: '',
      getJobs: null,
    }
  }

  handleEmploymentTypeChange = async employmentTypeId => {
    await this.setState(prevState => {
      const selectedEmploymentTypes = [...prevState.selectedEmploymentTypes]

      if (selectedEmploymentTypes.includes(employmentTypeId)) {
        selectedEmploymentTypes.splice(
          selectedEmploymentTypes.indexOf(employmentTypeId),
          1,
        )
      } else {
        selectedEmploymentTypes.push(employmentTypeId)
      }
      return {selectedEmploymentTypes}
    })
    this.state.getJobs()
  }

  callBack = func => {
    console.log(func, 'hi')
    this.setState({getJobs: func})
  }

  handleSalaryRangeChange = async salaryRangeId => {
    await this.setState({selectedSalaryRange: salaryRangeId})
    this.state.getJobs()
  }

  render() {
    const {selectedEmploymentTypes, selectedSalaryRange} = this.state
    return (
      <div>
        <Header />
        <div className="job-page">
          <FilterJob
            handleEmploymentTypeChange={this.handleEmploymentTypeChange}
            handleSalaryRangeChange={this.handleSalaryRangeChange}
            selectedEmploymentTypes={selectedEmploymentTypes}
            selectedSalaryRange={selectedSalaryRange}
          />
          <SearchJob
            selectedEmploymentTypes={selectedEmploymentTypes}
            selectedSalaryRange={selectedSalaryRange}
            callBack={this.callBack}
          />
        </div>
      </div>
    )
  }
}

export default Job
