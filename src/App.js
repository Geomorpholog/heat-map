import GetData from './GetData.js';

function App() {
  return (
    <div id ="background">
      <h1 id ="title">Monthly Global Land-Surface Temperature</h1>
      <h4 id ="description">1753 - 2015: base temperature 8.66℃</h4>
      <GetData
      url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
      width = {window.innerWidth - 50 }
      height = {window.innerHeight - 100 }
      padding = {50}
       />
    </div>
    
    
  )
}

export default App;
