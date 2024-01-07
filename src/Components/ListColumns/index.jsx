import Box from "@mui/material/Box";
import {
  SortableContext,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import Column2 from "./Column2";
import AddColumn from "./AddColumn";


function ListColumns(props) {
  const { columns, listColumns, board, setColumns, setIsModal } = props;

  return (
    <>
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",

          "&::-webkit-scrollbar": {
            WebkitAppearance: "none",
            bgcolor: "#ffffff00",
            borderRadius: "5px"
          },

          "&::-webkit-scrollbar:horizontal": {
            height: "12px"
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#8f8f8fbb",
            borderRadius: "5px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#803e7b",
            borderRadius: "5px",
            m: 2
          }
        }}
      >
        <SortableContext
          strategy={horizontalListSortingStrategy}
          items={columns?.map((e) => e.id)}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column) => {
              return (
                <Column2
                  listColumns={listColumns}
                  key={column.id}
                  column={column}
                  columns={columns}
                  setColumns={setColumns}
                  setIsModal={setIsModal}
                />
              );
            })}
        </SortableContext>
        <AddColumn
          board={board}
          setColumns={setColumns}
          listColumns={listColumns}
          columns={columns}
        />
      </Box>
    </>
  );
}

export default ListColumns;
