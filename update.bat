@set curdir=%cd%
cd %curdir%
Xcopy %2 SuperPhone\assets\www /e /y
cd %curdir%/SuperPhone/
android update project --name %customName% -t %1 -p ./
::android update project --name <project_name> --target <target_ID> --path <path_to_your_project>