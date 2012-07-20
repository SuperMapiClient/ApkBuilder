if not %2=="" (
call ./makeRelease.bat >>android.log
cd %curdir%
Xcopy SuperPhone\bin\*.apk %curdir% /y >>android.log

copy %customName%-release-unsigned.apk %customName%-release.apk  >>android.log

echo %1|jarsigner -verbose -keystore %2 %customName%-release.apk %3 >>android.log

)
