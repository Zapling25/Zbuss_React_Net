USE ZbussDb_Dev;
GO
DROP TABLE IF EXISTS ZB_TA_BUS;
CREATE TABLE ZB_TA_BUS
(
    IN_ID_BUS INT IDENTITY(1,1) PRIMARY KEY,
    CH_PLACA CHAR(7),
    DE_PESO_NETO DECIMAL,
	VC_CATEGORIA VARCHAR(50),
	IN_NUMERO_PISOS INT,
	CH_SITUACION_REGISTRO CHAR(1)
);