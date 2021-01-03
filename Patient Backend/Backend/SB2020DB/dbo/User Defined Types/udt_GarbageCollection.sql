CREATE TYPE [dbo].[udt_GarbageCollection] AS TABLE (
    [AreaId]              NUMERIC (18)  NULL,
    [CollectionTimeStamp] DATETIME      NULL,
    [FromDeviceId]        NUMERIC (18)  NULL,
    [GarbageType]         NVARCHAR (50) NULL,
    [isDeleted]           BIT           NULL,
    [CreatedAt]           DATETIME      NULL,
    [CreatedBy]           NVARCHAR (50) NULL,
    [LocationId]          NUMERIC (18)  NULL,
    [QRCode]              NVARCHAR (50) NULL,
    [VehicalMapped]       NVARCHAR (50) NULL,
    [WorkerId]            NUMERIC (18)  NULL);

