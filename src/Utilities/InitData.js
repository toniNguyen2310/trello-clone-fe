export const initData = {
  id: "board-1",
  columnOrder: ["column-1", "column-2", "column-3"],
  columns: [
    {
      id: "column-1",
      boardId: "board-1",
      title: "To Do",
      cardOrder: ["card-1", "card-2", "card-3", "card-4", "card-51"],
      cards: [
        {
          id: "card-1",
          boardId: "board-1",
          columnId: "column-1",
          title: "Read Book",
        },
        {
          id: "card-2",
          boardId: "board-1",
          columnId: "column-1",
          title: "Learn English",
        },
        {
          id: "card-3",
          boardId: "board-1",
          columnId: "column-1",
          title: "Meet friends at 14PM ",
        },
        {
          id: "card-4",
          boardId: "board-1",
          columnId: "column-1",
          title: "Exercise",
        },
        {
          id: "card-51",
          boardId: "board-1",
          columnId: "column-1",
          title: "Listen Podcast",
        },
      ],
    },
    {
      id: "column-2",
      boardId: "board-1",
      title: "Doing",
      cardOrder: ["card-6"],
      cards: [
        {
          id: "card-6",
          boardId: "board-1",
          columnId: "column-2",
          title: "Deep Work",
        },
      ],
    },
    {
      id: "column-3",
      boardId: "board-1",
      title: "Done",
      cardOrder: ["card-9", "card-10"],
      cards: [
        {
          id: "card-9",
          boardId: "board-1",
          columnId: "column-3",
          title: "Laundry",
        },
        {
          id: "card-10",
          boardId: "board-1",
          columnId: "column-3",
          title: "Call Grandma",
        },
      ],
    },
  ],
};
