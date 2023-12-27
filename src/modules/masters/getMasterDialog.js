import React, {useState, useEffect} from "react";
import PageNotFound from '../../common/components/pageNotFound'
import CommonAddMasterForm from "./components/commonAddMasterForm";
import AddNewCountry from "./components/addNewCountry";
import AddNewState from "./components/addNewState";
import AddNewCity from "./components/addNewCity";

const GetMasterDialog = (props) => {
    const getDialogProps = (
      shortNameMaxLength,
      completeNameMaxLength,
      captalizeShortName
    ) => {
      return {
        shortNameMaxLength: shortNameMaxLength,
        completeNameMaxLength: completeNameMaxLength,
        captalizeShortName: captalizeShortName || false,
      };
    };
    const getComponent = () => {
        let returnComp = <PageNotFound boxHeight="300px" width={300} height={150} />;
         switch (props.uniqueName) {
           case "BLOOD_GROUP":
             returnComp = (
               <CommonAddMasterForm
                 {...props}
                 {...getDialogProps(3, 20, true)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "GENDER":
             returnComp = (
               <CommonAddMasterForm
                 {...props}
                 {...getDialogProps(3, 20, true)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "MARITAL_STATUS":
             returnComp = (
               <CommonAddMasterForm
                 {...props}
                 {...getDialogProps(5, 20, true)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "SALUTATION":
             returnComp = (
               <CommonAddMasterForm
                 {...props}
                 {...getDialogProps(5, 20, true)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "RELATION":
             returnComp = (
               <CommonAddMasterForm
                 {...props}
                 {...getDialogProps(20, 20, false)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "LANGUAGE":
             returnComp = (
               <CommonAddMasterForm
                 {...props}
                 {...getDialogProps(20, 20, false)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "STATE":
             returnComp = (
               <AddNewState
                 {...props}
                 {...getDialogProps(4, 50, true)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "COUNTRY":
             returnComp = (
               <AddNewCountry
                 {...props}
                 {...getDialogProps(4, 50, true)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           case "CITY":
             returnComp = (
               <AddNewCity
                 {...props}
                 {...getDialogProps(50, 50, false)}
                 closeModalAndRenderTable={props.closeModalAndRenderTable}
               />
             );
             break;
           default:
             returnComp = (
               <PageNotFound boxHeight="300px" width={300} height={150} />
             );
         }
        return returnComp;
    }

    return <>{getComponent()}</>;
}

export default GetMasterDialog