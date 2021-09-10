import React, { useEffect } from "react";
 
import Modal from "./AddPracticelogins";

import MaterialTable from "material-table";

 

 
    export default function DenseTable(logins: any) {
      console.log(logins);

      const [data, setData] = React.useState([]);

  useEffect(() => {
    let User = JSON.parse(localStorage.getItem("user") || "{}");

    setData(logins.logins)
   
  }, []);
 

  
  return (
    <>
    
    <MaterialTable style={{marginTop:'0px'}}
      			
      title=" "
      columns={[
        { title: 'Application Name', field: 'applicationName', cellStyle: {
         width:'200px',
         
         
        }, headerStyle: {
          textAlign:'left',
        //  backgroundColor:'#f2f2f2'
        }},
        { title: 'Username', field: 'userName' , cellStyle: {
          width:'200px',
          textAlign:'left',
        }, headerStyle: {
           
        //  backgroundColor:'#f2f2f2'
        }},
        { title: 'Password', field: 'password' , cellStyle: {
          width:'200px',
          textAlign:'left',
        },
        headerStyle: {
          textAlign:'left',
         // backgroundColor:'#f2f2f2'
        } },
        { title: 'Link', field: 'link',cellStyle: {
          width:'450px',
          textAlign:'left',
        },headerStyle: {
          
         // backgroundColor:'#f2f2f2'
        }},
      ]}
      data={data}
     
      editable={{
        isEditable: (rowData) => false,
        isDeletable: (rowData) => false,

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
           // handleRowUpdate(newData, oldData, resolve);
          }),
        // onRowAdd: (newData) =>
        //   new Promise((resolve) => {
        //     handleRowAdd(newData, resolve)
        //   }),

        onRowDelete: (oldData) =>
          new Promise((resolve) => {
          //  handleRowDelete(oldData, resolve);
          }),
      }}
     
      options={{
        actionsColumnIndex: -1
      }}
      
      detailPanel={(rowData: any) => {
        return (
          
          <div className="card-body">
          <table className="table table-responsive-md mb-0" style={{borderBottom:'15px #f2f2f2 solid'}} >
            <thead style={{backgroundColor:'#f2f2f2'}}>
           
              <tr>
                <th style={{width:'50px'}}>No</th>
                <th style={{width:'350px'}}>Question</th>
                <th style={{width:'350px'}}>Answer</th>  
                <th style={{width:'150px', textAlign:'center'}}>Last Modified</th>             
                <th style={{textAlign:'center'}} >Actions</th>
              </tr>
           
           
            </thead>
            <tbody>
            { rowData.practice_loginsec_qs.map((item : any, i: any)=>{

              return(
                <tr style={{backgroundColor:'#F5F8FD'}}>
              <td>{i+1}</td>
                <td>{item.question}</td>
                <td>{item.answer}</td>
                <td style={{textAlign:'center'}}>9-9-2021</td>
               
                
                <td className="actions">
                  <a href=""><i className="fas fa-pencil-alt"></i></a>
                  <a href="" className="delete-row"><i className="far fa-trash-alt"></i></a>
                </td>
              </tr>
              )
            })}
              
            </tbody>
          </table>
        </div>
 
        )
      }}
    />

 
 
      <div className="card-body text-lg-right btn-ask-marj">
        <div>
          <div className="text-lg-right">
            <Modal />
          </div>
        </div>
      </div>
    </>
  );
} 