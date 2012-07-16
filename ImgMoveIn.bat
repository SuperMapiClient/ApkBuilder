@set curdir=%cd%
cd %curdir%
move /y APP_ICO_BAK\drawable-hdpi\ic_launcher.png SuperPhone\res\drawable-hdpi\ic_launcher.png
move /y APP_ICO_BAK\drawable-ldpi\ic_launcher.png SuperPhone\res\drawable-ldpi\ic_launcher.png
move /y APP_ICO_BAK\drawable-mdpi\ic_launcher.png SuperPhone\res\drawable-mdpi\ic_launcher.png
move /y APP_ICO_BAK\drawable-xhdpi\ic_launcher.png SuperPhone\res\drawable-xhdpi\ic_launcher.png
::将图片移动回源文件夹