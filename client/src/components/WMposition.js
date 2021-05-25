import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";

const WMposition = (props) => {
  const [value, setValue] = React.useState("Down");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.WMhandleChange(event);
  };

  return (
    <div className="div-buttons">
      <Paper className="div-buttons" style={{ width: 500 }}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="WMposition"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="Top" control={<Radio />} label="Top" />
            <FormControlLabel value="Down" control={<Radio />} label="Down" />
            <FormControlLabel value="Left" control={<Radio />} label="Left" />
            <FormControlLabel value="Right" control={<Radio />} label="Right" />
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
};

export default WMposition;
