import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import CostSheetPdf from './CostSheetPdf';

const App = () => (
  <PDFViewer width="100%" style={{height: "100vh"}}>
    <CostSheetPdf />
  </PDFViewer>
);

export default App;

ReactDOM.render(<App />, document.getElementById('root'));