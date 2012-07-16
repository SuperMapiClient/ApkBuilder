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
::删除创建过程中生成的文件