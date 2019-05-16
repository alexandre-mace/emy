import React, { useState } from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from "moment";

import "moment/locale/fr";
moment.locale("fr");

function CustomDatePicker(props) {
    const [selectedDate, handleDateChange] = useState(props.initialValue);

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                name="expirationDate"
                clearable
                label="Date de péremption"
                value={selectedDate}
                onChange={date => {
                    props.onChange(date.format('DD-MM-YYYY'))
                    handleDateChange(date)
                }}
                format="DD/MM/YYYY"
                required={props.required}
                id={props.id}
            />
        </MuiPickersUtilsProvider>
    );
}

export default CustomDatePicker;