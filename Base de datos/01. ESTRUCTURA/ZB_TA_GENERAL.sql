USE ZbussDb_Dev;
GO
DROP TABLE IF EXISTS ZB_TA_GENERAL;
CREATE TABLE ZB_TA_GENERAL
(
    IN_ID_GENERAL INT IDENTITY(1,1) PRIMARY KEY,
	VC_NOMBRE_TABLA VARCHAR(100),
    VC_COLUMNA VARCHAR(50),
	VC_VALOR_COLUMNA VARCHAR(50),
	VC_VALOR_COLUMNA_2 VARCHAR(50),
	CH_SITUACION_REGISTRO CHAR(1)
);