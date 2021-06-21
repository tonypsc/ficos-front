import React from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import CostSheetPdf from './CostSheetPdf';


const ViewSheet = ({costSheet}) => {
   return (
    <>
    {costSheet &&
      <BlobProvider document={<CostSheetPdf costSheet={costSheet}/>}>
      {({ url }) => (
        <a className="btn btn-primary px-3 me-2" href={url} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-print"></i> Imprimir
        </a>
      )}
      </BlobProvider>
    }
    </>
   )
  }

export default ViewSheet;