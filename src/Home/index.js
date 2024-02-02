import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const {history} = this.props
    return (
      <>
        <Header history={history} />
        <div className="home-container">
          <h1>Find The Job That Fits Your Life</h1>

          <p>
            Millions of people are searching for jobs Run the below command in
            your IDE to submit the question for grading after solving it
            completely
          </p>
          <Link to="/jobs">
            <button>Find Jobs</button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
