@set curdir=%cd%
cd %curdir%

move SuperPhone\res\drawable-hdpi\ic_launcher.png APP_ICO_BAK\drawable-hdpi\ic_launcher.png
move SuperPhone\res\drawable-ldpi\ic_launcher.png APP_ICO_BAK\drawable-ldpi\ic_launcher.png
move SuperPhone\res\drawable-mdpi\ic_launcher.png APP_ICO_BAK\drawable-mdpi\ic_launcher.png
move SuperPhone\res\drawable-xhdpi\ic_launcher.png APP_ICO_BAK\drawable-xhdpi\ic_launcher.png
::移动源文件夹中的图片到备份文件夹