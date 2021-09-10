import React from 'react'


const DashBoardComponent=()=>{

    return (
        <>
     <div className="row dashbtrow">
						<div className="col-lg-6 mb-3">
							<section className="card">
								<div className="card-body dashbicon">
									<div className="row">
 											 
                                        <img  className="img-fluid dashstaticimg" src="../images/gr1.jpg"  alt="PROMBS Admin" />
 
									</div>
								</div>
							</section>
						</div>
						<div className="col-lg-6">
							<div className="row mb-3">
								<div className="col-xl-6">
									<section className="card card-featured-left card-featured-primary mb-3">
										<div className="card-body dashbiconbtn">
											<div className="widget-summary">
												<div className="widget-summary-col widget-summary-col-icon">
													<div className="summary-icon bg-primary">
														<i className="fa fa-clipboard"></i>
													</div>
												</div>
												<div className="widget-summary-col">
													<div className="summary">
														<h2 className="card-title colordgrey"> Total MTD Claims</h2>
														<div className="info">
															<div className="dashtitles1 colordblur">25,000</div>
															<span className="text-primary"> </span>
														</div>
													</div>
													<div className="summary-footer">
														<a className="text-muted text-uppercase" href="#">(view all)</a>
													</div>
												</div>
											</div>
										</div>
									</section>
								</div>
								<div className="col-xl-6">
									<section className="card card-featured-left card-featured-secondary">
										<div className="card-body dashbiconbtn">
											<div className="widget-summary">
												<div className="widget-summary-col widget-summary-col-icon">
													<div className="summary-icon bg-secondary">
														<i className="fa fa-credit-card"></i>
													</div>
												</div>
												<div className="widget-summary-col">
													<div className="summary">
														<h4 className="card-title colordgrey">Total MTD Payment</h4>
														<div className="info">
															<div className="dashtitles1 colordblur">$50,000</div>
														</div>
													</div>
													<div className="summary-footer">
														<a className="text-muted text-uppercase" href="#">(view all)</a>
													</div>
												</div>
											</div>
										</div>
									</section>
								</div>
							</div>
							<div className="row  dashbtnmt">
								<div className="col-xl-6">
									<section className="card card-featured-left card-featured-tertiary mb-3">
										<div className="card-body dashbiconbtn">
											<div className="widget-summary">
												<div className="widget-summary-col widget-summary-col-icon">
													<div className="summary-icon bg-tertiary">
														<i className="fa fa-calendar"></i>
													</div>
												</div>
												<div className="widget-summary-col">
													<div className="summary">
														<h4 className="card-title colordgrey">Today Claims</h4>
														<div className="info">
															<div className="dashtitles1 colordblur">500</div>
														</div>
													</div>
													<div className="summary-footer">
														<a className="text-muted text-uppercase" href="#">(view all)</a>
													</div>
												</div>
											</div>
										</div>
									</section>
								</div>
								<div className="col-xl-6">
									<section className="card card-featured-left card-featured-quaternary">
										<div className="card-body dashbiconbtn">
											<div className="widget-summary">
												<div className="widget-summary-col widget-summary-col-icon">
													<div className="summary-icon bg-quaternary">
														<i className="fa fa-thumbs-down"></i>
													</div>
												</div>
												<div className="widget-summary-col">
													<div className="summary">
														<h4 className="card-title colordgrey">Rejected Claims</h4>
														<div className="info">
															<div className="dashtitles1 colordblur">5</div>
														</div>
													</div>
													<div className="summary-footer">
														<a className="text-muted text-uppercase" href="#">(view all)</a>
													</div>
												</div>
											</div>
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
					
					<div className="row pt-4">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<section className="card">
								<header className="card-header">
									<div className="card-actions">
										<a href="#" className="card-action card-action-toggle" data-card-toggle></a>
										<a href="#" className="card-action card-action-dismiss" data-card-dismiss></a>
									</div>
					
									<h2 className="card-title">120+ Aging</h2>
									<p className="card-subtitle">Customize the graphs as much as you want, there are so many options and features to display information using our Admin panel.</p>
								</header>
								<div className="card-body">
                                <div className="card-body dashbicon">
									<div className="row">
 											 
                                        <img  className="img-fluid dashstaticimg" src="../images/gr2.jpg"  alt="PROMBS Admin" />
 
									</div>
								</div>
									 
								</div>
							</section>
						</div>
						<div className="col-lg-6">
							<section className="card">
								<header className="card-header">
									<div className="card-actions">
										<a href="#" className="card-action card-action-toggle" data-card-toggle></a>
										<a href="#" className="card-action card-action-dismiss" data-card-dismiss></a>
									</div>
									<h2 className="card-title">Server Usage</h2>
									<p className="card-subtitle">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
								</header>
                                <div className="card-body dashbicon">
									<div className="row">
 											 
                                        <img  className="img-fluid dashstaticimg" src="../images/gr3.jpg"  alt="PROMBS Admin" />
 
									</div>
								</div>
							</section>
						</div>
					</div>




		</>
    )
}

export default DashBoardComponent