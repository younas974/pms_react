import React, { useEffect } from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Modal from "./AddPracticelogins";

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ float: "right" }}>
      <GridToolbarExport style={{ float: "right" }} />
    </GridToolbarContainer>
  );
}

export default function BasicFilteringGrid(logins: any) {
  console.log(logins);

  const secondr: any = [];
  let index = 1;
  logins.logins.map((item: any) => {
    secondr.push({
      id: index,
      Appname: item.applicationName,
      Username: item.userName,
      Password: item.password,
      Link: item.link,
      Questions: "Pet Name ?",
      Answer: "Pet Name Here",
      Actions: "Edit - Delete",
    });
    index += 1;
  });

  const rows = [
    {
      id: 1,
      Appname: "First App",
      Username: "Aftab Khalid",
      Password: "123456789",
      Link: "http://localhost:3000/",
      Questions: "Pet Name ?",
      Answer: "Pet Name Here",
      Actions: "Edit - Delete",
    },

    {
      id: 2,
      Appname: "Second App",
      Username: "M.Younas",
      Password: "123456789",
      Link: "http://localhost:3000/",
      Questions: "Pet Name ?",
      Answer: "Pet Name Here",
      Actions: "Edit - Delete",
    },
  ];

  useEffect(() => {
    let User = JSON.parse(localStorage.getItem("user") || "{}");

    // if(logins.logins){
    //   logins.logins.map((item:any)=>{
    //     console.log(item.applicationName)
    //   })
    // }
  }, []);

  return (
    <>
      <div>
        <section className="card">
          <div className="card-body">
            <div
              id="datatable-editable_wrapper"
              className="dataTables_wrapper dt-bootstrap4 no-footer"
            >
              <div className="row">
                <div className="col-lg-12">
                  <div style={{ height: 500, width: "100%" }}>
                    <DataGrid
                      columns={[
                        {
                          field: "id",
                          flex: 0.0001,
                        },
                        {
                          field: "Appname",
                          flex: 0.25,
                        },
                        {
                          field: "Username",
                          flex: 0.3,
                        },

                        {
                          field: "Password",
                          flex: 0.25,
                        },

                        {
                          field: "Link",
                          flex: 0.2,
                        },

                        {
                          field: "Questions",
                          flex: 0.3,
                        },

                        {
                          field: "Answer",
                          flex: 0.3,
                        },

                        {
                          field: "Actions",
                          flex: 0.24,
                        },
                      ]}
                      rows={secondr}
                    //   components={{
                    //  Toolbar: GridToolbar,
                    //  }}

                      componentsProps={{
                        toolbar: { display: 'none'},
                      }}
 
                       
                      disableColumnMenu
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
