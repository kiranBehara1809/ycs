import React, {useState, useEffect} from "react";
import AddBloodGroup from "./components/addBloodGroup";
import PageNotFound from '../../common/components/pageNotFound'

const GetMasterDialog = (props) => {

    const getComponent = () => {
        let returnComp = <PageNotFound boxHeight="300px" width={300} height={150} />;
         switch (props.uniqueName) {
            case "BLOOD_GROUP" :
                returnComp = <AddBloodGroup {...props} />;
                break;
            default :
                returnComp = <PageNotFound boxHeight="300px" width={300} height={150} />;
        }
        return returnComp;
    }

    return <>{getComponent()}</>;
}

export default GetMasterDialog