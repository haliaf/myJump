Все делалось по этой инструкции
Для того чтобы развернуть приложение для android:
1)Выполнить ng build --prod
2)Скопировать все из папки dist в WWW
3)Добавить для все js файлов add type='text/javascript'
4)Выполнить cordova build android
5)Забрать фаил можно по этому пути /platforms/android/app/build/outputs/apk/debug/app-debug.apk