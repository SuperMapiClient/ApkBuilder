@set curdir=%cd%
@set customName=NewName
::定义当前目录为变量

@cd %curdir%
@call ./update.bat >android.log
::调用update批处理文件

cd %curdir%

IF EXIST *.keystore (
dir *.keystore /b > keystore.tmp
call ./makeRelease.bat >>android.log
::调用makeRelease批处理文件
cd %curdir%
Xcopy SuperPhone\bin\*.apk %curdir% /y >>android.log

::将生成的apk文件拷贝到当前文件夹
copy %customName%-release-unsigned.apk %customName%-release.apk  >>android.log

for /f %%i in (keystore.tmp) do (
jarsigner -verbose -keystore %%i %customName%-release.apk %%i >>android.log
del keystore.tmp
)

)
::判断是否有签名文件，有的话进行签名

call ./makeDebug.bat >>android.log
::调用makeDebug批处理文件
cd %curdir%
Xcopy SuperPhone\bin\*.apk %curdir% /y  >>android.log
::将生成的apk文件拷贝到当前文件夹

cd %curdir%
call ./clear.bat  >>android.log

cd %curdir%
call ./ImgMoveIn.bat  >>android.log

