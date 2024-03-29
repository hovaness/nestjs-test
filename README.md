Инструкция для Технического специалиста!!!
<br/>
<br/>
Для серверной части: <br/>
1)Установить пакеты - npm i<br/>
2)Создать папку .env в которой настроить следующие переменные: <br/>
HOST - хост<br/>
PORT - порт<br/>
POSTGRES_USER - имя пользователя<br/>
POSTGRES_PASSWORD - пароль<br/>
POSTGRES_DB - название базы данных<br/>
3)Далее есть два варианта запуска проекта:<br/>
3.1)Запустить проект через npm - npm start<br/>
3.2)Запустить проект через Docker:<br/>
Чтобы запустить проект через Docker, нужно для начала запустить команду docker-compose build, после чего в папке .env задать переменное HOST значение postgres<br/>
После чего запустить команду docker-compose up<br/>
<br/>
Для клиентской части:<br/>
Установить пакеты<br/>
<br/>
P.S Программа запоминает зарегистрироваших пользователей через localStorage, поэтому для проверки работы чата нужно зайти с двух разных браузеров, сбросить текущего пользователя можно написать localStorage.clear() в консоли браузера<br/>
P.P.S Авторизацию не стал делать, так как этого не было в тз.


