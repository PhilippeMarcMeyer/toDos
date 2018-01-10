
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 12/29/2017 09:00:40
-- Generated from EDMX file: C:\Users\PhilippeMEYERMAPPING\Documents\PROJETS\ToDos\site\TodosModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [QuickToDos];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__Breaks__ToDoId__1273C1CD]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Breaks] DROP CONSTRAINT [FK__Breaks__ToDoId__1273C1CD];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Breaks]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Breaks];
GO
IF OBJECT_ID(N'[dbo].[Knowledge]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Knowledge];
GO
IF OBJECT_ID(N'[dbo].[toDos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[toDos];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Breaks'
CREATE TABLE [dbo].[Breaks] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Start] datetime  NULL,
    [End] datetime  NULL,
    [ToDoId] int  NOT NULL
);
GO

-- Creating table 'toDos'
CREATE TABLE [dbo].[toDos] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Description] nvarchar(80)  NULL,
    [Begin] datetime  NULL,
    [End] datetime  NULL,
    [Reference] nvarchar(50)  NULL,
    [Duration] int  NULL,
    [Done] bit  NULL,
    [Notes] nvarchar(1500)  NULL,
    [DontShow] bit  NULL,
    [Planned] int  NULL
);
GO

-- Creating table 'Knowledges'
CREATE TABLE [dbo].[Knowledges] (
    [Id] int  NOT NULL,
    [Creation] datetime  NULL,
    [Modification] datetime  NULL,
    [Subject] nvarchar(80)  NULL,
    [Body] nvarchar(max)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Breaks'
ALTER TABLE [dbo].[Breaks]
ADD CONSTRAINT [PK_Breaks]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'toDos'
ALTER TABLE [dbo].[toDos]
ADD CONSTRAINT [PK_toDos]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Knowledges'
ALTER TABLE [dbo].[Knowledges]
ADD CONSTRAINT [PK_Knowledges]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ToDoId] in table 'Breaks'
ALTER TABLE [dbo].[Breaks]
ADD CONSTRAINT [FK__Breaks__ToDoId__1273C1CD]
    FOREIGN KEY ([ToDoId])
    REFERENCES [dbo].[toDos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Breaks__ToDoId__1273C1CD'
CREATE INDEX [IX_FK__Breaks__ToDoId__1273C1CD]
ON [dbo].[Breaks]
    ([ToDoId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------