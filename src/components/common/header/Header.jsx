import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    navLinkStyle: {
        margin: '2% 1%',
        color: 'white',
        textDecoration: 'none'
    }
}));

function Header () {
    //const navRoutes = () => {
    //    let navs = Routes.map(r => {
    //        console.log(r);
    //        return (<Link key={"route-" + r.key} className="" to={r.navpath}>{r.label}</Link>);
    //    });
    //    return navs;
    //};
    //const Routes = [
    //    { key: 'MENU_HOME', label: 'History', navpath: '/history' },
    //    { key: 'MENU_FORM', label: 'Add Expense', navpath: '/add-entry' }
    //];
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Link className={classes.navLinkStyle} to="/history">History</Link>
                <Link className={classes.navLinkStyle} to="/add-entry">Add Expense</Link>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
