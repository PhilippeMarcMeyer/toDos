CREATE TABLE [dbo].[Breaks] (
    [Id]     INT      IDENTITY (1, 1) NOT NULL,
    [Start]  DATETIME NULL,
    [End]    DATETIME NULL,
    [ToDoId] INT      NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([ToDoId]) REFERENCES [dbo].[toDos] ([Id])
);

