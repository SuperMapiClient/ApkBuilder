cd %curdir%
call ./ImgMoveOut.bat

call ./ImgCopyIn.bat


cd %curdir%/SuperPhone
::定位到SuperPhone文件夹

ant release
::生成没有签名的release apk文件
