@echo off
echo.
echo  IFF Failure Watch — Deploy Script
echo  ===================================
echo.

REM Set repo path
set REPO=C:\Users\sevans\incident-tracker

REM Set downloads path — adjust if your downloads folder is different
set DL=%USERPROFILE%\Downloads\incident-tracker

echo Copying files from Downloads to repo...

REM Root files
copy /Y "%DL%\index.html"   "%REPO%\index.html"
copy /Y "%DL%\charts.html"  "%REPO%\charts.html"
copy /Y "%DL%\news.html"    "%REPO%\news.html"
copy /Y "%DL%\about.html"   "%REPO%\about.html"
copy /Y "%DL%\config.js"    "%REPO%\config.js"

REM JS folder
copy /Y "%DL%\js\app.js"    "%REPO%\js\app.js"

REM Data folder
copy /Y "%DL%\data\incidents.js"         "%REPO%\data\incidents.js"
copy /Y "%DL%\data\fallback_articles.js" "%REPO%\data\fallback_articles.js"
copy /Y "%DL%\data\scraped_incidents.js" "%REPO%\data\scraped_incidents.js"
copy /Y "%DL%\data\at_risk_facilities.js" "%REPO%\data\at_risk_facilities.js"

REM Scraper
if not exist "%REPO%\scraper" mkdir "%REPO%\scraper"
copy /Y "%DL%\scraper\scrape.py" "%REPO%\scraper\scrape.py"

REM GitHub Actions
if not exist "%REPO%\.github\workflows" mkdir "%REPO%\.github\workflows"
copy /Y "%DL%\.github\workflows\scrape.yml" "%REPO%\.github\workflows\scrape.yml"

echo.
echo Done copying. Pushing to GitHub...
echo.

cd /d "%REPO%"
git add .
git status
git commit -m "deploy update %DATE% %TIME%"
git push

echo.
echo Deploy complete.
pause
