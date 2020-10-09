import React from 'react';
import './App.css';
import Calendar from './calendar'
import BootstrapNavbar from './nav';


const Input = (props) => (
  <input type="file" id="upload" name="file-input" multiple {...props} />
)

const App = () => {
  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    console.log(e.target.files)
  }

  return (
    <div className="App">
      <BootstrapNavbar />
      <form className="form" onSubmit={onSubmit}>
        <div>
          <Input onChange={onChange} />
          <button type="submit">Submit</button>
        </div>
      </form>
      <Calendar/>
    </div>
  )
}


export default App
