USE ZbussDb_Dev;
GO
DROP TABLE IF EXISTS ZB_TA_ASIENTO;
CREATE TABLE ZB_TA_ASIENTO
(
    IN_ID_ASIENTO INT IDENTITY(1,1) PRIMARY KEY,
	IN_ID_BUS INT,
    CH_NUMERO_ASIENTO CHAR(2),
    VC_INCLINACION VARCHAR(4),
	VC_TIPO_BLOQUE VARCHAR(2),
	IN_PISO INT,
	CH_SITUACION_REGISTRO CHAR(1)
);