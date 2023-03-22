import './pageStyles/myListPage.css';
import React, { useState } from 'react';
import objectSample from '../objectSample';
import MyListPageItem from '../Components/MyListPageItem';
import PostModal from '../Components/PostModal';

import XLSX from 'xlsx/dist/xlsx.full.min.js';

function exportToExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileUrl = URL.createObjectURL(fileData);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'RealValueExport.xlsx';
    link.click();
  }


function MyListPage() {

    //------------------------------------------------------------
    // EXPORT BUTTON
    const [exportButton, setExportButton] = useState(false);
    const toggleExportButton = () => {setExportButton(!exportButton)}
    //------------------------------------------------------------

    // EXPORT COFNIRM BUTTON
    const [confirmExport, setconfirmExport] = useState(false);
    const toggleconfirmExportn = () => {setconfirmExport(!confirmExport)}
    //------------------------------------------------------------
    //MODAL
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    //------------------------------------------------------------
    const [activeProperty, setProperty] = useState({});
    function setNewProperty(Property) {
        console.log(Property)
        setProperty(Property)
    };
    //------------------------------------------------------------

    return (
        <div className='myListPageContainer'>
            <div className={confirmExport ? 'ExportModal' : 'hide'}>
                <div className='CloseModalExport' onClick={toggleconfirmExportn}>&#215;</div>
                <div className='ExportText'>Export to Excel</div>
                <div className='ExportModalButtonContainer'>
                    <div className='ExportModalButton ExportCancelModal' onClick={toggleconfirmExportn}>Cancel</div>
                    <div className='ExportModalButton ExporSaveModal' onClick={() => exportToExcel(objectSample)}>Export</div>
                </div>
            </div>
            {isOpen ? <PostModal  toggleModal={toggleModal} isOpen={isOpen} property={activeProperty}/> : null}
            <div className='myListPageTopSection'>
                <div className='myListPageTitle'>List 1 <input className='myListPageSearchBar' placeholder='Search for a saved property'></input></div>

                <div className='myListPageOptions'>
                <div className='myListPageExportButton myListButton' onClick={toggleExportButton}>Export <div className={exportButton ? 'ExcelExport' : 'hide'} onClick={toggleconfirmExportn}>Excel</div><div className={exportButton ? 'PDFExport' : 'hide'}>PDF</div></div>
                    <div className='myListPageAnalyticsButton myListButton'>Analytics</div>
                </div>
            </div>
            <div className='myListPageBottomSection'>
            {objectSample.map((item) => (
                <MyListPageItem property={item}></MyListPageItem>
                ))}
            </div>

        </div>
    );
}

export default MyListPage;