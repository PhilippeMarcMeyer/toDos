CREATE TABLE [dbo].[toDos] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (80) NULL,
    [Begin]       DATETIME      NULL,
    [End]         DATETIME      NULL,
    [Reference]   NVARCHAR (50) NULL,
    [Duration]    INT           NULL,
    [Done]        BIT           NULL,
    [Notes]       VARCHAR (MAX) NULL,
    [DontShow]    BIT           NULL,
    [Planned]     INT           NULL,
    [Branch]      NCHAR (30)    NULL,
    [Status]      TINYINT       NULL,
    [Status_Note] NVARCHAR (80) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

