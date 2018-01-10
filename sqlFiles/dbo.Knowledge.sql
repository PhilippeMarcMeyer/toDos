CREATE TABLE [dbo].[Knowledge] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [Creation]     DATETIME       NULL,
    [Modification] DATETIME       NULL,
    [Subject]      NVARCHAR (80)  NULL,
    [Body]         NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__Knowledge__3214EC077514793C] PRIMARY KEY CLUSTERED ([Id] ASC)
);

