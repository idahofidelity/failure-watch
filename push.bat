@echo off
echo.
echo  IFF Incident Tracker — Auto Push
echo  Idaho Fidelity Foundation
echo  ================================
echo.

cd /d "%~dp0"

git add .

git status

echo.
set /p msg="Commit message (press Enter for 'update'): "
if "%msg%"=="" set msg=update

git commit -m "%msg%"
git push

echo.
if %errorlevel%==0 (
    echo  SUCCESS — pushed to GitHub
) else (
    echo  No changes to push or error occurred
)
echo.
pause
