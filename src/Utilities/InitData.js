export const initData = {
  id: "board-1",
  columnOrder: ["column-3", "column-2", "column-1"],
  columns: [
    {
      id: "column-1",
      boardId: "board-1",
      title: "Todo 1",
      cardOrder: ["card-2", "card-1", "card-3", "card-4", "card-5"],
      cards: [
        {
          id: "card-1",
          boardId: "board-1",
          columnId: "column-1",
          title: "Title card 1",
        },
        {
          id: "card-2",
          boardId: "board-1",
          columnId: "column-1",
          title: "Title card 2",
        },
        {
          id: "card-3",
          boardId: "board-1",
          columnId: "column-1",
          title: "Title card 3",
        },
        {
          id: "card-4",
          boardId: "board-1",
          columnId: "column-1",
          title: "Title card 4",
        },
        {
          id: "card-5",
          boardId: "board-1",
          columnId: "column-1",
          title: "Title card 5",
        },
      ],
    },
    {
      id: "column-2",
      boardId: "board-1",
      title: "Todo 2",
      cardOrder: ["card-6", "card-7", "card-8"],
      cards: [
        {
          id: "card-6",
          boardId: "board-1",
          columnId: "column-2",
          title: "Title card 6",
        },
        {
          id: "card-7",
          boardId: "board-1",
          columnId: "column-2",
          title: "Title card 7",
        },
        {
          id: "card-8",
          boardId: "board-1",
          columnId: "column-2",
          title: "Title card 8",
        },
      ],
    },
    {
      id: "column-3",
      boardId: "board-1",
      title: "Todo 3",
      cardOrder: ["card-9", "card-10"],
      cards: [
        {
          id: "card-9",
          boardId: "board-1",
          columnId: "column-3",
          title: "Title card 9",
        },
        {
          id: "card-10",
          boardId: "board-1",
          columnId: "column-3",
          title: "Title card 10",
        },
      ],
    },
  ],
  title: "",
};
