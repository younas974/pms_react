import React, { FC, ReactElement, useState, useEffect } from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Modal from "./AddPracticelogins";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function BasicFilteringGrid() {
  const rows = [
    {
      id: 1,
      FILENAME: "THIS IS FIRST DOCUMENT NAME HERE",
      SIZE: "10.44 MB",
      TYPE: "Microsoft Word .docx",
      LASTMODIFIED: "08-12-2021",
      ACTION: "Edit - Delete",
    },

    {
      id: 2,
      FILENAME: "THIS IS SECOUND DOCUMENT NAME HERE",
      SIZE: "7.88 MB",
      TYPE: "Adobe PDF .pdf",
      LASTMODIFIED: "07-12-2021",
      ACTION: "Edit - Delete",
    },
  ];

  const user = useSelector((state: RootState) => state.user);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIUser] = useState(false);
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);

  useEffect(() => {
    let userRoles: any[] = user.user.roles;
    if (userRoles) {
      userRoles.map((item) => {
        if (item == "ROLE_USER") {
          setIUser(true);
        }

        if (item == "ROLE_TEAMLEAD") {
          setIsTeamLead(true);
        }

        if (item == "ROLE_ADMIN") {
          setIsAdmin(true);
        }

        if (item == "ROLE_MANAGER") {
          setIsManager(true);
        }

        if (item == "ROLE_SUPERUSER") {
          setIsSuperUser(true);
        }
      });
    }

    let User = JSON.parse(localStorage.getItem("user") || "{}");
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
                          flex: 0.05,
                        },

                        {
                          field: "FILENAME",
                          flex: 0.5,
                        },

                        {
                          field: "SIZE",
                          flex: 0.2,
                        },

                        {
                          field: "TYPE",
                          flex: 0.25,
                        },

                        {
                          field: "LASTMODIFIED",
                          flex: 0.2,
                        },

                        {
                          field: "ACTION",
                          flex: 0.2,
                        },
                      ]}
                      rows={rows}
                  //    components={{
                  //      Toolbar: GridToolbar,
                  //    }}
                      filterModel={{
                        items: [
                          { columnField: "", operatorValue: "", value: "" },
                        ],
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
          <div className="text-lg-right">{isAdmin ? <Modal /> : ""}</div>
        </div>
      </div>
    </>
  );
}
