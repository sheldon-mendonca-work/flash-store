import { createContext, useState } from "react";

export const ErrorContext = createContext();

let initState = {
    errorType : "Default",
    errorMsg : "Some error Occured",
    fillColor : "#00529B",
    backColor : "#DFF2BF",
    svgType : `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" className="done">
    <path fill="#00529B" d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
    </svg>`,
};
export const ErrorProvider = ({children}) => {
    
    const [ notif, setNotif ] = useState(initState);
    const [isLoading, setIsLoading] = useState(false);

    const showNotif = (notifType, notifMsg) => {
        let errorType = "", errorMsg = "", fillColor = "", backColor = "", svgType = "";
        const notification = document.querySelector(".notification");
        const progress = document.querySelector(".progress");
        const close = document.querySelector(".close");
        
        notification.classList.remove("active");
        progress.classList.remove("active");
        
        errorType = notifType;
        errorMsg = notifMsg;
        switch(notifType){
            case "Success":
                fillColor = "#270";
                backColor = "#DFF2BF";
                svgType = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" className="done">
                <path fill=${fillColor} d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
                </svg>`
                break;
            
            case "Error" : 
                fillColor = "#D8000C";
                backColor = "#FFBABA";
                svgType = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" className="done">
                <path fill=${fillColor} d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
                <path fill=${fillColor}  d="M10.5 4l-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5z"></path>
                </svg>`
                break;

            case "UserLogin" : 
                fillColor = "#059";
                backColor = "#BEF";
                svgType = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="done" viewBox="0 0 16 16">
                <path fill=${fillColor} d="M6 11.5c0-2.363 1.498-4.383 3.594-5.159 0.254-0.571 0.406-1.206 0.406-1.841 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h6.208c-0.135-0.477-0.208-0.98-0.208-1.5z"></path>
                <path fill=${fillColor} d="M11.5 7c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5zM14 12h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z"></path>
                </svg>`
                break;

            case "UserLogout" : 
                fillColor = "#9F6000";
                backColor = "#FEEFB3";
                svgType = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="done" viewBox="0 0 16 16">
                <path fill=${fillColor} d="M6 11.5c0-2.363 1.498-4.383 3.594-5.159 0.254-0.571 0.406-1.206 0.406-1.841 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h6.208c-0.135-0.477-0.208-0.98-0.208-1.5z"></path>
                <path fill=${fillColor} d="M11.5 7c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5zM14 12h-5v-1h5v1z"></path>
                </svg>`
                break;

            
            default: 
                fillColor = "#00529B";
                backColor = "#BDE5F8";
                svgType = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" className="done" viewBox="0 0 16 16">
                <path fill=${fillColor} d="M8 1.5c-1.736 0-3.369 0.676-4.596 1.904s-1.904 2.86-1.904 4.596c0 1.736 0.676 3.369 1.904 4.596s2.86 1.904 4.596 1.904c1.736 0 3.369-0.676 4.596-1.904s1.904-2.86 1.904-4.596c0-1.736-0.676-3.369-1.904-4.596s-2.86-1.904-4.596-1.904zM8 0v0c4.418 0 8 3.582 8 8s-3.582 8-8 8c-4.418 0-8-3.582-8-8s3.582-8 8-8zM7 11h2v2h-2zM7 3h2v6h-2z"></path>
                </svg>`;
                break;
        }

        setNotif({
            "errorType" : errorType,
            "errorMsg" : errorMsg,
            "fillColor" : fillColor,
            "backColor" : backColor,
            "svgType" : svgType
        })

        notification.classList.add("active");
        progress.classList.add("active");

        setTimeout(()=>{
            notification.classList.remove("active");
            progress.classList.remove("active");
            setTimeout(()=>setNotif(initState), 210);
        }, 2000);

        close.addEventListener("click", ()=>{
            
            setTimeout(()=>{
                notification.classList.remove("active");
                progress.classList.remove("active");
                setNotif(initState)
            }, 0);
        })
    }

    return <ErrorContext.Provider value={{notif, showNotif, isLoading, setIsLoading}}>
        {children}
    </ErrorContext.Provider>
}
