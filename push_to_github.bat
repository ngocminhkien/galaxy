@echo off
title DAY CODE LEN GITHUB - GALAXY (COSMOS 2.0)
cd /d "%~dp0"
echo ========================================================
echo   DANG DAY DU AN COSMOS LEN GITHUB
echo   Repository: https://github.com/ngocminhkien/galaxy.git
echo   User: ngocminhkien (nkien1231@gmail.com)
echo ========================================================
echo.
git push -u origin main
echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo [THANH CONG] Da day ma nguon len GitHub thanh cong!
) else (
    echo [CHU Y] Neu chua dang nhap, trinh duyet se mo ra de ban xac nhan GitHub.
)
echo ========================================================
pause
