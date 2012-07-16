cd %curdir%
call ./ImgMoveOut.bat

call ./ImgCopyIn.bat


cd %curdir%/SuperPhone
::定位到SuperPhone文件夹

ant debug
::生成带debug签名的apk文件
