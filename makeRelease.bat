cd %curdir%
call ./ImgMoveOut.bat

call ./ImgCopyIn.bat


cd %curdir%/SuperPhone
::��λ��SuperPhone�ļ���

ant release
::����û��ǩ����release apk�ļ�
