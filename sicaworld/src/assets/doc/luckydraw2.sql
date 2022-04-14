DELETE FROM dbo.luckydrawresult
DELETE FROM [dbo].[LuckyDraw]

INSERT INTO [dbo].[LuckyDraw](
	[LuckyDrawId],
	[IgId],
	[IdolId])
SELECT DISTINCT 2, IGID, IDOLID FROM FORM WHERE LuckyDrawId=2;

--Round 1
INSERT INTO dbo.LuckyDrawResult(
	Timeid,
	LuckyDrawItemId,
	Result
)
SELECT 1, ItemId,  ABS(CHECKSUM(NewId())) % 10000 FROM dbo.LuckyDraw

SELECT TOP 10 Igid, result FROM (
	SELECT D.IgId, SUM(R.Result) Result FROM dbo.LuckyDrawResult R
	INNER JOIN dbo.LuckyDraw D ON R.LuckyDrawItemId=D.ItemId
	GROUP BY D.IGID
) rs1
ORDER BY Result DESC

--Round 2
INSERT INTO dbo.LuckyDrawResult(
	Timeid,
	LuckyDrawItemId,
	Result
)
SELECT 2, ItemId,  ABS(CHECKSUM(NewId())) % 10000 FROM dbo.LuckyDraw

SELECT TOP 10 Igid, result FROM (
	SELECT D.IgId, SUM(R.Result) Result FROM dbo.LuckyDrawResult R
	INNER JOIN dbo.LuckyDraw D ON R.LuckyDrawItemId=D.ItemId
	GROUP BY D.IGID
) rs1
ORDER BY Result DESC

--Round 3
INSERT INTO dbo.LuckyDrawResult(
	Timeid,
	LuckyDrawItemId,
	Result
)
SELECT 3, ItemId,  ABS(CHECKSUM(NewId())) % 10000 FROM dbo.LuckyDraw

SELECT TOP 10 Igid, result FROM (
	SELECT D.IgId, SUM(R.Result) Result FROM dbo.LuckyDrawResult R
	INNER JOIN dbo.LuckyDraw D ON R.LuckyDrawItemId=D.ItemId
	GROUP BY D.IGID
) rs1
ORDER BY Result DESC