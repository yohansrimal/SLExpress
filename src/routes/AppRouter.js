import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminSup from "../DevPages/DeveloperPages/adminsupport";
import AboutUs from "../DevPages/aboutus";

import ContactUs from "../DevPages/contactus";
import changePassword from "../DevPages/DeveloperPages/changePassword";

import Dashboard from "../DevPages/DeveloperPages/dashboard";
import expired from "../DevPages/expired";

import Earnings from "../DevPages/DeveloperPages/earning";
import editSite from "../DevPages/DeveloperPages/editSite";
import EditBankingDetails from "../DevPages/DeveloperPages/editBankingDetails";
import editProfile from "../DevPages/DeveloperPages/editProfile";
import Error404 from "../DevPages/error404";

import Index from "../DevPages/home";

import Login from "../DevPages/DeveloperPages/login";
import Logout from "../DevPages/DeveloperPages/logout";

import MyProfile from "../DevPages/DeveloperPages/myProfile ";

import viewSite from "../DevPages/DeveloperPages/viewSite";
import ViewTicket from "../DevPages/DeveloperPages/viewTicket";
import ViewBankingDetails from "../DevPages/DeveloperPages/viewBankingDetails";

import Websites from "../DevPages/DeveloperPages/websites";
import WebUpload from "../DevPages/DeveloperPages/webupload";
import WebAnalysis from "../DevPages/DeveloperPages/webanalysis";

import DevHeader from "../components/DeveloperComponents/DeveloperNavigation/DevHeader";

export default function AppRouter() {
  return (
    <React.Fragment>
      <DevHeader />
      <Switch>
        <Route exact path="/" component={Index}></Route>
        <Route path="/adminsupport" component={AdminSup}></Route>
        <Route path="/aboutus" component={AboutUs}></Route>

        <Route path="/contactus" component={ContactUs}></Route>
        <Route path="/changepassword" component={changePassword}></Route>

        <Route path="/dashboard" component={Dashboard}></Route>

        <Route path="/earnings" component={Earnings}></Route>
        <Route path="/editbankdetails" component={EditBankingDetails}></Route>
        <Route path="/editprofile" component={editProfile}></Route>
        <Route path="/editsite/:id" component={editSite}></Route>
        <Route path="/expired" component={expired}></Route>

        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>

        <Route path="/myprofile" component={MyProfile}></Route>
        <Route path="/mywebsites" component={Websites}></Route>

        <Route path="/viewsite/:id" component={viewSite}></Route>
        <Route
          path="/viewbankingdetails"
          component={ViewBankingDetails}
        ></Route>
        <Route path="/viewticket/:id" component={ViewTicket}></Route>

        <Route path="/webanalysis" component={WebAnalysis}></Route>
        <Route path="/webupload" component={WebUpload}></Route>

        <Route component={Error404}></Route>
      </Switch>
    </React.Fragment>
  );
}
