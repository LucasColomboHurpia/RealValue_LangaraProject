import React, {useState, useEffect} from 'react';
import './ComponentStyles/alert.css';

const Alert = (props) => {

    // const [alert, setAlert] = useState(true);
    const [clearAlert, setClearAlert] = useState('');
    const [fadeOut, setFadeOut] = useState('');
    const [timeOut, setTimeOut] = useState('');

    const fadeOutAlert = () => {
        props.setAlert(false);
    }

    let timeout = '';

    useEffect(() => {
        if(timeOut) {
            // console.log("timeout");
        }
        // console.log(timeOut);
        clearTimeout(timeOut);
        setFadeOut('');
        setClearAlert('');
    }, [props.alert.status]);

    const displayMsgs = () => {
        return props.alert.message.map((element, index) => {
            return <p key={index} className="alert__item">{element}</p>
        });
    }

    if(props.alert.status){
        return(
       
            <div className= {`alert ${clearAlert} ${fadeOut} `}  onAnimationEnd={() => {
                
                setFadeOut('fadeOut');
                setTimeOut(setTimeout(() => {
                    setClearAlert('alert__clear'); 
                    fadeOutAlert();  
                }, 5800));
            }}>
                <div className={`
                   
                    ${props.alert.type === 'success' ? "alert__success" : "alert__fail"}
                `}>
                    {/* <span>close</span> */}
                    {displayMsgs()}
                </div>
            </div>
                        
        )
    }

    else{
        return <React.Fragment></React.Fragment>
    }
}

export default Alert;