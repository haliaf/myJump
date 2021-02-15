IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Users] (
    [Id] int NOT NULL IDENTITY,
    [Created] datetime2 NOT NULL,
    [Modified] datetime2 NOT NULL,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [IdentityId] nvarchar(max) NULL,
    [UserName] nvarchar(max) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [RefreshTokens] (
    [Id] int NOT NULL IDENTITY,
    [Created] datetime2 NOT NULL,
    [Modified] datetime2 NOT NULL,
    [Token] nvarchar(max) NULL,
    [Expires] datetime2 NOT NULL,
    [UserId] int NOT NULL,
    [RemoteIpAddress] nvarchar(max) NULL,
    CONSTRAINT [PK_RefreshTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_RefreshTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_RefreshTokens_UserId] ON [RefreshTokens] ([UserId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20181025175259_initial', N'2.2.0-preview2-35157');

GO

ALTER TABLE [Users] ADD [UserProfileImages] nvarchar(max) NULL;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200507152556_MyFirstMigration', N'2.2.0-preview2-35157');

GO

CREATE TABLE [Coordinates] (
    [Id] int NOT NULL IDENTITY,
    [Created] datetime2 NOT NULL,
    [Modified] datetime2 NOT NULL,
    [Longitude] decimal(18, 2) NOT NULL,
    [Latitude] decimal(18, 2) NOT NULL,
    CONSTRAINT [PK_Coordinates] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [MapEvents] (
    [Id] int NOT NULL IDENTITY,
    [Created] datetime2 NOT NULL,
    [Modified] datetime2 NOT NULL,
    [UserId] int NULL,
    [StartMapEvent] datetime2 NULL,
    [EndMapEvent] datetime2 NULL,
    [StartCoordinateId] int NULL,
    [StopCoordinateId] int NULL,
    CONSTRAINT [PK_MapEvents] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MapEvents_Coordinates_StartCoordinateId] FOREIGN KEY ([StartCoordinateId]) REFERENCES [Coordinates] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_MapEvents_Coordinates_StopCoordinateId] FOREIGN KEY ([StopCoordinateId]) REFERENCES [Coordinates] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_MapEvents_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION
);

GO

CREATE INDEX [IX_MapEvents_StartCoordinateId] ON [MapEvents] ([StartCoordinateId]);

GO

CREATE INDEX [IX_MapEvents_StopCoordinateId] ON [MapEvents] ([StopCoordinateId]);

GO

CREATE INDEX [IX_MapEvents_UserId] ON [MapEvents] ([UserId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200514110203_addMapEvent', N'2.2.0-preview2-35157');

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200527092754_MyMigration1', N'2.2.0-preview2-35157');

GO

ALTER TABLE [Users] ADD [CreatedUserId] int NULL;

GO

ALTER TABLE [Users] ADD [ModifiedUserId] int NULL;

GO

ALTER TABLE [RefreshTokens] ADD [CreatedUserId] int NULL;

GO

ALTER TABLE [RefreshTokens] ADD [ModifiedUserId] int NULL;

GO

ALTER TABLE [MapEvents] ADD [CreatedUserId] int NULL;

GO

ALTER TABLE [MapEvents] ADD [ModifiedUserId] int NULL;

GO

ALTER TABLE [Coordinates] ADD [CreatedUserId] int NULL;

GO

ALTER TABLE [Coordinates] ADD [ModifiedUserId] int NULL;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200527094226_MyMigration2', N'2.2.0-preview2-35157');

GO

ALTER TABLE [MapEvents] DROP CONSTRAINT [FK_MapEvents_Users_UserId];

GO

DROP INDEX [IX_MapEvents_UserId] ON [MapEvents];

GO

EXEC sp_rename N'[MapEvents].[UserId]', N'CreateUserId', N'COLUMN';

GO

EXEC sp_rename N'[MapEvents].[StartMapEvent]', N'StartDateMapEvent', N'COLUMN';

GO

EXEC sp_rename N'[MapEvents].[EndMapEvent]', N'EndDateMapEvent', N'COLUMN';

GO

CREATE TABLE [UserMapEvents] (
    [Id] int NOT NULL IDENTITY,
    [Created] datetime2 NOT NULL,
    [Modified] datetime2 NOT NULL,
    [CreatedUserId] int NULL,
    [ModifiedUserId] int NULL,
    [UserId] int NOT NULL,
    [MapEventId] int NOT NULL,
    CONSTRAINT [PK_UserMapEvents] PRIMARY KEY ([UserId], [MapEventId]),
    CONSTRAINT [AK_UserMapEvents_Id] UNIQUE ([Id]),
    CONSTRAINT [FK_UserMapEvents_MapEvents_MapEventId] FOREIGN KEY ([MapEventId]) REFERENCES [MapEvents] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserMapEvents_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_UserMapEvents_MapEventId] ON [UserMapEvents] ([MapEventId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200528151048_MyMigration3', N'2.2.0-preview2-35157');

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Coordinates]') AND [c].[name] = N'Longitude');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Coordinates] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Coordinates] ALTER COLUMN [Longitude] nvarchar(max) NULL;

GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Coordinates]') AND [c].[name] = N'Latitude');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Coordinates] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Coordinates] ALTER COLUMN [Latitude] nvarchar(max) NULL;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200529125239_MyMigration4', N'2.2.0-preview2-35157');

GO

CREATE TABLE [SignalsData] (
    [Id] int NOT NULL IDENTITY,
    [Created] datetime2 NOT NULL,
    [Modified] datetime2 NOT NULL,
    [CreatedUserId] int NULL,
    [ModifiedUserId] int NULL,
    [SignalId] int NOT NULL,
    [Zone] nvarchar(max) NULL,
    [SignalDate] datetime2 NOT NULL,
    [MapEventId] int NULL,
    CONSTRAINT [PK_SignalsData] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SignalsData_MapEvents_MapEventId] FOREIGN KEY ([MapEventId]) REFERENCES [MapEvents] ([Id]) ON DELETE NO ACTION
);

GO

CREATE INDEX [IX_SignalsData_MapEventId] ON [SignalsData] ([MapEventId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200616145815_MyMigration8', N'2.2.0-preview2-35157');

GO

ALTER TABLE [Users] ADD [NickName] nvarchar(max) NULL;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200708105119_MyMigration9', N'2.2.0-preview2-35157');

GO

