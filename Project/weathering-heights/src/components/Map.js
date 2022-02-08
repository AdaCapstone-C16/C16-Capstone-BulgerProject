import React from 'react';
import Iframe from 'react-iframe'
// import '../components/HTML/map_combined.html' as html;
// src/components/HTML/map_combined.html
// let html = require('../components/HTML/map_combined.html');
// var template = { __html: html };
// export default function Map() {
// // React.module.exports = React.createClass({
// //     render: function() {
//         return(
//         <div dangerouslySetInnerHTML={template} />
//         );
// //     }
// //     });
// }
// class Map extends React.Component {
    
//     render() {
//         return (
//             <section>
//                 <h3>See Map Below:</h3>
//                 <iframe src={map_combined}></iframe>
//             </section>
//         );
//     }
// }
// export default Map;
// export default function Map() {
//     // render() {
//         return (    
//         <div>
//             <h3>Here is a map</h3>
//             <span> dangerouslySetInnerHTML={template}</span>
//         </div>
//         );
//     // }
// }

export default function Map() {
    // render() {
        return (    
        <div>
            <h3>Here is a map</h3>
            <iframe title="myMap" src='/Users/roslynmelookaran/Documents/Code/04_Adas/Capstone/C16-Capstone-BulgerProject/Project/weathering-heights/src/components/HTML/test.html'></iframe>
        </div>
        );
    // }
}

