cd %curdir%
call ./ImgMoveOut.bat

call ./ImgCopyIn.bat


cd %curdir%/SuperPhone
::��λ��SuperPhone�ļ���

ant debug
::���ɴ�debugǩ����apk�ļ�
