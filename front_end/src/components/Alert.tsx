import React, {FC} from 'react';


interface AlertProps {
    message: string;
    onClose:  ()=> void 
}

const Alert: FC<AlertProps> =(message, onClose) =>{

    return(
        <div className="model is-active has-text-centered">
            <div className="model-bacground" onClick={onClose}></div>
            <div className="model-card">
              <header className="modal-card-head has-background-danger">
                  <p className="model-card-title has-text-white">
                      {message}
                  </p>
              </header>
              <footer style={{justifyContent: "center"}} className="model-card-foot">
                    <button className="button" onClick={onClose}></button>
              </footer>
            </div>
        </div>
    );
}

export default Alert; 