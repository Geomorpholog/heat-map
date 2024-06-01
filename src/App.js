import GetData from './GetData.js';

function App() {
  return (
    <div id ="background">
      <h4 id ="title">Monthly Global Land-Surface Temperature</h4>
      <p>1753 - 2015: base temperature 8.66℃</p>
      <GetData
      url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
      width = {window.innerWidth - 50 }
      height = {window.innerHeight - 50 }
      padding = {50}
       />
    </div>
    
    
  )
}

export default App;
