// REACT FUNCTIONAL COMPONENTS
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'; // hook
import Button from "./Button"
const Header = ({title, onAdd, showAdd}) => {

  const location = useLocation();

  return (
    <header  className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
          <Button 
          color={showAdd ? 'red' : 'green'} 
          text={showAdd ? 'Close' : 'Add'} 
          onClick={onAdd} 
        />
      )}      
    </header>
  )
}

Header.defaultProps = {
  title: 'React Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header

/* ********************************** */
/* PROPS | DEFAULTPROPS AND PROPTYPES */
/* ********************************** */

// 01 HEADER1 - APP1 RECEIVING PROPS FROM APP
// pass props and receive with props.name
// or use destructuring: 
// const Header = ({title}) => {
// ... <h1>{title}</h1>
/* const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}
export default Header */

// 02 DEFAULTPROPS
/* const Header = ({title}) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker default prop'
}

export default Header */

// 03 PROPTYPES (ASSIGN DATA TYPE FOR PROP)
// FOR PROPSTYPES, NEED TO COME FRON PARENT 
// (THIS CASE, APP.JS) AND NEXT IMPORT IS NEEDED:
// string is set for title, if number is passed from APP, 
// console.log will show and data type error
/* import PropTypes from 'prop-types';

const Header = ({title}) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header */

