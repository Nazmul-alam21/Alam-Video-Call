import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';

export default function History() {

    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                throw err;
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }

    return (
        <div>

            <IconButton onClick={() => {
                routeTo("/home")
            }}>
                <HomeIcon />
            </IconButton>

            {
              ( meetings.length !== 0) ? meetings.map((e, i) => {
                    return (
                        <>

                            <Card key={i} varient="outlined">

                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        code: {e.meetingCode}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Date: {formatDate(e.date)}
                                    </Typography>

                                </CardContent>

                            </Card>

                        </>
                    )
                }) : <></>
            }

        </div>
    )
}