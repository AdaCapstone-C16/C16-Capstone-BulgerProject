import logo from './logo.svg';
import './App.css';
import PeakList from "./components/PeakList"

const PEAKS= [
      {Rank: 1, Name: "Mount Rainier", IndigenousName: "Tahoma", Elevation: "14411", Link: "peak.aspx?pid=2296", Coordinates: ["46.852947", " -121.760424"], Range: "Mount Rainier Area"}, 
      {Rank: 2, Name: "Mount Adams", IndigenousName: "Pah-To", Elevation: "12276", Link: "peak.aspx?pid=2365", Coordinates: ["46.202494", " -121.490746"], Range: "Mount Adams Area"}, 
      {Rank: 3, Name: "Little Tahoma", Elevation: "11138", Link: "peak.aspx?pid=2297", Coordinates: ["46.849683", " -121.711774"], Range: "Mount Rainier Area"}, 
      {Rank: 4, Name: "Mount Baker", IndigenousName: "Koma-Kulshan", Elevation: "10781", Link: "peak.aspx?pid=1633", Coordinates: ["48.776797", " -121.814467"], Range: "Skagit Range"}, 
      {Rank: 5, Name: "Glacier Peak", IndigenousName: "Dakobed", Elevation: "10520", Link: "peak.aspx?pid=1972", Coordinates: ["48.111844", " -121.11412"], Range: "Glacier Peak-North Stevens Pass Area"}, 
      {Rank: 6, Name: "Bonanza Peak", Elevation: "9511", Link: "peak.aspx?pid=1909", Coordinates: ["48.238217", " -120.866415"], Range: "Central North Cascades"}, 
      {Rank: 7, Name: "Mount Stuart", Elevation: "9415", Link: "peak.aspx?pid=2182", Coordinates: ["47.475198", " -120.902476"], Range: "Wenatchee Mountains"}
]

function App() {
  return (
    <section>
      <h1>Weathering Heights</h1>
    <section>
      <h2>The Bulger List</h2>
      <PeakList peaks={PEAKS}/>
    </section>
    </section>

  );
}

export default App;
