CREATE TABLE [dbo].[Files] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [Filename] NVARCHAR (255) NOT NULL,
    [Concern]  NVARCHAR (30)  NOT NULL,
    [ExtId]    INT            NOT NULL,
	[Description]  NVARCHAR (80) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

