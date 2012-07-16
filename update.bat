cd %curdir%
Xcopy www SuperPhone\assets\www /e /y
cd %curdir%/SuperPhone/
android update project --name %customName% -t 1 -p ./