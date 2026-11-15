@echo off
title Porsche International Fullstack Server
echo ========================================================
echo   STARTING PORSCHE INTERNATIONAL OFFICIAL WEBSITE
echo ========================================================
echo.

start "Porsche Backend [Port 5000]" cmd /k "cd /d %~dp0backend && node src/server.js"
timeout /t 2 /nobreak > nul

start "Porsche Frontend [Port 3000]" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 2 /nobreak > nul

echo.
echo Both servers are launching!
echo Backend:  http://localhost:5000/api/health
echo Frontend: http://localhost:3000
echo.
start http://localhost:3000
