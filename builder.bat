@set curdir=%cd%
@set customName=NewName
::���嵱ǰĿ¼Ϊ����

@cd %curdir%
@call ./update.bat >android.log
::����update�������ļ�

cd %curdir%

IF EXIST *.keystore (
dir *.keystore /b > keystore.tmp
call ./makeRelease.bat >>android.log
::����makeRelease�������ļ�
cd %curdir%
Xcopy SuperPhone\bin\*.apk %curdir% /y >>android.log

::�����ɵ�apk�ļ���������ǰ�ļ���
copy %customName%-release-unsigned.apk %customName%-release.apk  >>android.log

for /f %%i in (keystore.tmp) do (
jarsigner -verbose -keystore %%i %customName%-release.apk %%i >>android.log
del keystore.tmp
)

)
::�ж��Ƿ���ǩ���ļ����еĻ�����ǩ��

call ./makeDebug.bat >>android.log
::����makeDebug�������ļ�
cd %curdir%
Xcopy SuperPhone\bin\*.apk %curdir% /y  >>android.log
::�����ɵ�apk�ļ���������ǰ�ļ���

cd %curdir%
call ./clear.bat  >>android.log

cd %curdir%
call ./ImgMoveIn.bat  >>android.log

