import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {makeStyles} from '@material-ui/core/styles';


const styles = makeStyles(theme => ({
    root: {
        padding: 10
    }
}));





const Pagination = (props) => {
    const classes = styles();

    useEffect(() => {
        console.log('mounted');
    }, []);


    const handlePageChange = (e) => {
        props.onChangePage(e);
    };
    const creatPages = (end) => {
        const pages = [];
        for (let i=1; i<=end; i++) {
            pages.push(<Button onClick={()=>handlePageChange(i)} value={i} key={i} size="small" >{i}</Button>);
        }
        return pages;
    };

    const handleBack = () => {
        props.onChangePage(props.page-1);
    };
    const handleNext = () => {
        props.onChangePage(props.page+1);
    };
    return (
        <Paper className={classes.root}>
            <Button size="small" onClick={handleBack} disabled={props.page-1===0}>
                Back
                <KeyboardArrowLeft />
            </Button>
            {
                creatPages(props.end)
            }
            <Button size="small" onClick={handleNext} disabled={props.page===props.end}>
                Next
                <KeyboardArrowRight />
            </Button>
        </Paper>
    );
};

export default Pagination;