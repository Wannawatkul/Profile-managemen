"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  FormGroup,
  SelectChangeEvent,
  MenuItem,
  Button,
  InputLabel,
} from "@mui/material";
import * as yup from "yup";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";

export default function HomePage() {
  const schema = yup.object({
    name: yup.string().required("กรอกชื่อด้วย"),
    last: yup.string().required("กรอกนามสกุล"),
    email: yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรอกอีเมล"),
    pdpa: yup.boolean().oneOf([true], "ต้องยอมรับ PDPA"),
    gender: yup.string().required("กรุณาเลือกเพศ"),
  });

  const [name, setName] = React.useState("");
  const [last, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pdpa, setPdpa] = React.useState(false);
  const [hobbies, setHobbies] = React.useState<string[]>([]);
  const [note, setNote] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [submitList, setSubmitList] = React.useState<SubmitForm[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gender, setGender] = React.useState("");

  const handleHobbyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setHobbies((prev) =>
      checked ? [...prev, name] : prev.filter((h) => h !== name),
    );
  };

  const handleSubmit = async () => {
    const data: SubmitForm = {
      name,
      last,
      email,
      note,
      status,
      pdpa,
      hobbies,
      gender,
    };

    try {
      await schema.validate(data, { abortEarly: false });

      setErrors({});
      setSubmitList((prev) => [...prev, data]);
      handleReset();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};

        err.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });

        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdpa(e.target.checked);
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };
  const handleReset = () => {
    setName("");
    setLast("");
    setEmail("");
    setNote("");
    setStatus("");
    setPdpa(false);
    setHobbies([]);
    setGender("");
  };

  type SubmitForm = {
    name: string;
    last: string;
    email: string;
    note: string;
    status: string;
    pdpa: boolean;
    hobbies: string[];
    gender: string;
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={2} sx={{ mt: 2, mb: 2, px: { xs: 1, sm: 2 } }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mt: 4, textAlign: "center" }}
          >
            Profile management
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                ></TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  error={!!errors.last}
                  helperText={errors.last}
                ></TextField>
              </Grid>
            </Grid>
            <Grid size={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              ></TextField>
            </Grid>
            <FormControl error={!!errors.pdpa}>
              <FormControlLabel
                label="Confirm PDPA"
                control={<Checkbox checked={pdpa} onChange={handleChange} />}
              />
              <Typography color="error" variant="caption">
                {errors.pdpa}
              </Typography>
            </FormControl>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl error={!!errors.gender}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                  <Typography color="error" variant="caption">
                    {errors.gender}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Hobby
                  </FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="game"
                          checked={hobbies.includes("game")}
                          onChange={handleHobbyChange}
                        />
                      }
                      label="Game"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="music"
                          checked={hobbies.includes("music")}
                          onChange={handleHobbyChange}
                        />
                      }
                      label="Music"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="craft"
                          checked={hobbies.includes("craft")}
                          onChange={handleHobbyChange}
                        />
                      }
                      label="Craft"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="reading"
                          checked={hobbies.includes("reading")}
                          onChange={handleHobbyChange}
                        />
                      }
                      label="Reading"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select<string>
                    labelId="status-select-label"
                    value={status}
                    label="Status"
                    onChange={handleSelect}
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorce">Divorce</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12}>
              <TextField
                label="Note"
                variant="outlined"
                fullWidth
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></TextField>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                gap: 2,
              }}
            >
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {submitList.map((item, index) => (
            <Paper key={index} sx={{ padding: 2 }}>
              <Typography fontWeight="bold" variant="h6">
                User: {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography>
                    Name: {item.name} {item.last}
                  </Typography>
                  <Typography>Status: {item.status}</Typography>
                  <Typography>Gender: {item.gender}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography>Email: {item.email}</Typography>
                  <Typography>Hobby: {item.hobbies.join(", ")}</Typography>
                  <Typography>Note: {item.note}</Typography>
                </Grid>
                <FormControlLabel
                  control={<Checkbox checked={item.pdpa} disabled />}
                  label="Confirm PDPA"
                />
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
