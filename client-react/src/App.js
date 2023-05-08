import React from 'react';
import Navibar from './NaviBar.js';
import Gridmenu from './Gridmenu.js';

function App() {
  return(
  <>
 <Navibar />
 <div style={{ paddingTop: '5px', margin: '20px' }}> {/*padding 20px from Navbar */}
 <Gridmenu />
 </div>
 </> 
  );
}

export default App;
