import React from 'react'


const NoPracticeFound =()=>{

    return (
        <>
        <section className="body-error error-inside">
							<div className="center-error">

								<div className="row">
									<div className="col-lg-12">
										<div className="main-error mb-3">
											<h6 className="error-code text-dark text-center font-weight-semibold m-0"> <i className="fas fa-file"></i> No Practice Assigned </h6>
											<p className="error-explanation text-center"> We're sorry, Currently no practice profile available. Please contact Admin</p>
										</div>
									</div>
									 
								</div>
							</div>
						</section>
        </>
    )
}

export default NoPracticeFound


