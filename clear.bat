cd %curdir%
rmdir /s/q SuperPhone\bin\
rmdir /s/q SuperPhone\assets\www\
::ɾ���ļ���

md SuperPhone\bin\
md SuperPhone\assets\www\
::�����ļ���

del SuperPhone\project.properties
del SuperPhone\proguard-project.txt
del SuperPhone\local.properties
del SuperPhone\build.xml
::ɾ�����������������ļ�

cd %curdir%
del %1-debug-unaligned.apk
del %1-release-unsigned.apk

move %1-debug.apk %2
move %1-release.apk %2