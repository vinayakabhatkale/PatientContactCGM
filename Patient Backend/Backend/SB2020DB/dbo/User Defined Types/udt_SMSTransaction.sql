CREATE TYPE [dbo].[udt_SMSTransaction] AS TABLE (
    [SMSFrom]         NVARCHAR (50) NULL,
    [SMSTo]           NVARCHAR (50) NULL,
    [Status]          NVARCHAR (50) NULL,
    [SMSDate]         DATETIME      NULL,
    [Content]         NVARCHAR (50) NULL,
    [CharacterNumber] NUMERIC (18)  NULL,
    [TotalPages]      NVARCHAR (50) NULL,
    [SMSType]         NVARCHAR (50) NULL,
    [GeneratedBy]     NVARCHAR (50) NULL,
    [LocationId]      NUMERIC (18)  NULL,
    [AreaId]          NUMERIC (18)  NULL);

