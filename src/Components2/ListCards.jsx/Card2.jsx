import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import EditCard from "./EditCard";
function Card2(props) {
  const { card } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card?.id, data: { ...card } });
  const styleCard = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };
  return (
    <>
      <Card
        ref={setNodeRef}
        style={styleCard}
        {...attributes}
        {...listeners}
        key={card.id}
        sx={{
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: card?.FE_PlaceholerCard ? "#f1f2f4" : "#d6d1d1",
          overflow: "unset",
          boxShadow: card?.FE_PlaceholerCard & "unset",
          // display: card?.FE_PlaceholerCard ? "none" : "block",
        }}
      >
        <CardContent sx={{ p: 1, "&:last-child": { p: 1 } }}>
          <Typography>{card.title}</Typography>
        </CardContent>
      </Card>
      {/* <EditCard /> */}
    </>
  );
}

export default Card2;
