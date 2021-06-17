import React, {useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import CostSheetPdf from './CostSheetPdf';
import config from '../Shared/config/general';
import { fetchData } from '../Shared/helpers/fetchHelper';
import Alert from '../Shared/Alert';


const Print = () => {

  const [costSheet, setCostSheet] = useState({});
  const [error, setError] = useState(null);

  //useEffect(() => {
  //   /**
  //  * Gets costsheet data
  //  */
  //   const getCostSheetData = async ()=> {
  //     let fullUrl = new URL(window.location.href);
  //     let searchParams = new URLSearchParams(fullUrl.search);
  //     let _id = searchParams.get('_id');


  //     const url = `${config.apiUrl}costsheets/${_id}`;
  //     const result = await fetchData(url);

  //     if(result?.status !== 'success') {
  //         setError(result.errors);
  //     } else {
  //         setError(null);
  //         setCostSheet(result.data);
  //     }
  //   }
    
  //   getCostSheetData();

  //   return () => {
  //     setError(); // This worked for me
  //     setCostSheet();
  //   };    
  //}, [])

  return (
    <>
      {error 
        ? <Alert content={error} type="danger" />
        : !costSheet 
          ? <div>Loading...</div>
          :
          <PDFViewer width="100%" style={{height: "100vh"}}>
            <CostSheetPdf costSheet={JSON.parse(localStorage.getItem('sheet'))} />
          </PDFViewer>
      }
    </>
  )
};

export default Print;

ReactDOM.render(<Print />, document.getElementById('root'));