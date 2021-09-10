import React from "react";

const NotFoundComponent = () => {
  return (
    <>
      <section className="body-error error-inside">
        <div className="center-error">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-error mb-3">
                <h6 className="error-code text-dark text-center font-weight-semibold m-0">
                  {" "}
                  <i className="fas fa-file"></i> Oops! 404 Not Found
                </h6>
                <p className="error-explanation text-center">
                  {" "}
                  Sorry, an error has occured, Requested page not found!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundComponent;
