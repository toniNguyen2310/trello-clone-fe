//Create  Place holder card when column empty
export const useCreatePlaceHolderCard = (column) => {
  return {
    id: `${column.id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column.id,
    FE_PlaceholderCard: true
  };
};