USE ZbussDb_Dev;
GO
DROP PROCEDURE IF EXISTS ZB_SP_API_UPD_BUS;
GO
CREATE PROCEDURE ZB_SP_API_UPD_BUS
	@PARAM_IN_ID_BUS INT,
	@PARAM_CH_PLACA CHAR(7),
	@PARAM_DE_PESO_NETO DECIMAL,
	@PARAM_VC_CATEGORIA VARCHAR(50)
AS
BEGIN
	UPDATE ZB_TA_BUS SET
		CH_PLACA = @PARAM_CH_PLACA,
		DE_PESO_NETO = @PARAM_DE_PESO_NETO,
		VC_CATEGORIA = @PARAM_VC_CATEGORIA
	WHERE IN_ID_BUS = @PARAM_IN_ID_BUS;
END;