import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import {makeStyles} from '@material-ui/core/styles';


const styles = makeStyles(theme => ({
    root: {
        padding: 10,
        textAlign: 'center'
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
    const creatPages = () => {
        const pages = [];

        const begin = props.page-2 > 0 ? props.page-2 : 1;
        const end = props.page +2 < props.end ? props.page+2 : props.end;

        for (let i=begin; i<=end; i++) {
            pages.push(<Button disabled={i===props.page} onClick={()=>handlePageChange(i)} value={i} key={i} size="small" >{i}</Button>);
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
        <>
            {props.end > 0 ? (
                <Paper className={classes.root}>
                    <Button size="small" onClick={()=>handlePageChange(1)}>
                        <FirstPage />
                    </Button>
                    <Button size="small" onClick={handleBack} disabled={props.page-1===0}>
                        Back
                        <KeyboardArrowLeft />
                    </Button>
                    {
                        creatPages()
                    }
                    <Button size="small" onClick={handleNext} disabled={props.page===props.end}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                    <Button size="small" onClick={()=>handlePageChange(props.end)}>
                        <LastPage />
                    </Button>
                </Paper>
            ): null}

        </>
    );
};

export default Pagination;
