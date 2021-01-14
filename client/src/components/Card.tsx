import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 200,
    maxHeight: 500,
    marginTop: 20,
    paddingBottom: 30,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    textOverflow: "ellipsis",
    maxHeight: "100%",
  },
  cardContent: {
    maxHeight: "100%",
    overflow: "hidden",
  },
});

interface IProjectCardProps {
  title: string;
  text: string;
  isLoading?: boolean;
}

export default function ProjectCard(props: IProjectCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
        >
          {props.title}
        </Typography>
        {props.isLoading ? (
          <CircularProgress />
        ) : (
          <Typography variant="body2" component="p" className={classes.content}>
            {props.text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
