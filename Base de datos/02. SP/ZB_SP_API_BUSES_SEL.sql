USE ZbussDb_Dev;
GO
DROP PROCEDURE IF EXISTS ZB_SP_API_BUSES_SEL;
GO
CREATE PROCEDURE ZB_SP_API_BUSES_SEL
AS
BEGIN
	SELECT 
		B.IN_ID_BUS,
		B.CH_PLACA,
		B.VC_CATEGORIA,
		B.DE_PESO_NETO,
		COUNT(A.IN_ID_ASIENTO) AS IN_NUMERO_ASIENTOS,
		B.CH_SITUACION_REGISTRO
	FROM ZB_TA_BUS B
	INNER JOIN ZB_TA_ASIENTO A ON A.IN_ID_BUS = B.IN_ID_BUS 
	WHERE B.CH_SITUACION_REGISTRO = 'A'
	GROUP BY B.IN_ID_BUS, B.CH_PLACA, B.VC_CATEGORIA, B.DE_PESO_NETO, B.CH_SITUACION_REGISTRO;
END;