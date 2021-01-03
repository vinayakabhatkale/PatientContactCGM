CREATE TYPE [dbo].[udt_VehicleTracker] AS TABLE (
    [VehicleId]       NVARCHAR (50) NULL,
    [DeviceId]        NVARCHAR (50) NULL,
    [Lattitude]       NVARCHAR (50) NULL,
    [Longitude]       NVARCHAR (50) NULL,
    [TrackerDateTime] DATETIME      NULL,
    [GPS]             NVARCHAR (50) NULL,
    [KiloMeter]       NVARCHAR (50) NULL,
    [Speed]           NVARCHAR (50) NULL,
    [ClientId]        NVARCHAR (50) NULL,
    [SerialNo]        NVARCHAR (50) NULL,
    [INGStatus]       NVARCHAR (50) NULL);

