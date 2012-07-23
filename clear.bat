cd %curdir%
rmdir /s/q SuperPhone\bin\
rmdir /s/q SuperPhone\assets\www\
::删除文件夹

md SuperPhone\bin\
md SuperPhone\assets\www\
::生成文件夹

del SuperPhone\project.properties
del SuperPhone\proguard-project.txt
del SuperPhone\local.properties
del SuperPhone\build.xml
::删除创建过程中生成文件

cd %curdir%
del %1-debug-unaligned.apk
del %1-release-unsigned.apk

move %1-debug.apk %2
move %1-release.apk %2