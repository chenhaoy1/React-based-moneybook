import React from 'react'
import PropTypes from 'prop-types'
import { padLeft, range, number_month } from '../utility'
class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }
  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return;
    }
    this.setState({
      isOpen: false,
    })
  }
  toggleDropdown = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  selectYear = (event, yearNumber) => {
    event.preventDefault()
    this.setState({
      selectedYear: yearNumber
    })
  }
  selectMonth = (event, monthNumber) => {
    event.preventDefault()
    this.setState({
      isOpen: false
    })
    this.props.onChange(this.state.selectedYear, monthNumber)
  }
  render() {
    const { year, month } = this.props
    const { selectedYear } = this.state
    const { isOpen } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(number => number + year)
   
    return (
      <div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
        <p>Select a month</p>
        <button 
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {`${number_month[padLeft(month)]} ${year}`}
        </button>
        { isOpen && 
          <div className="dropdown-menu" style={{display: 'block'}}>
            <div className="row">
            <div className="col months-range border-right">
              { monthRange.map((monthNumber, index) => 
                  <a key={index}
                    role="button"
                    onClick={(event) => {this.selectMonth(event, monthNumber)}}
                    className={(monthNumber === month) ? "dropdown-item active text-white": "dropdown-item"}>
                    {number_month[padLeft(monthNumber)]} 
                  </a>
                )}
              </div>

              <div className="col  years-range">
                { yearRange.map((yearNumber, index) => 
                  <a key={index}
                    role="button"
                    onClick={(event) => {this.selectYear(event, yearNumber)}} 
                    className={(yearNumber === selectedYear) ? "dropdown-item active text-white" : "dropdown-item"}>
                    {yearNumber} 
                  </a>  
                )}
              </div>
              
            </div>
          </div>
        }
      </div>
    )
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default MonthPicker