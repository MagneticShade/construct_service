ButtonClose - убрал получение реф объекта, теперь приходит функция
убрал вообще ButtonClose - слишком мало кода, который еще и не переиспользуется нигде

App - добавил новый route на '/' чтобы пробал ворнинг

ModalBlanks - чуть подтянул вёрстку и сделал анимацию

Projects - мобильную версию сделал норм









// -----  atomic архитектура ----- ///

Информация об атомной арфитектуре:

----------------------------------------------

Атомный дизайн — это особый способ организации компонентов проекта; он напрямую вдохновлен атомными концепциями химии, отсюда и название. Атомный дизайн черпает вдохновение из концепции атома как наименьшей единицы, затем молекулы как комбинации атомов и, наконец, организмов, состоящих из молекул.

Например, атомы определяют мельчайшие компоненты, такие как кнопки и поля ввода. Молекулы обозначают комбинацию этих атомов (например, формы). Всю страницу, состоящую из этих молекул, можно считать организмом, состоящим из всех элементов.

По сути, Atomic Design используется для создания пользовательских интерфейсов по модульному принципу с упором на создание компонентов.

----------------------------------------------

shared - В этой папке находятся атомы (самые мелкие компоненты которые нельзя делить на болле мелкие под компоненты. Типо кнопок инпутов и так далее)

Components - это папка с малекулами (два или более атомой связаных между собойю. Пример: инпут с кнопкой) и огранизмами (связь между малекулами или атомати и малекулами. Пример: форма обратной связи)

pages - это папка с шаблонами (связь между всем вышеперечисленным: пример макет сайта)

App.tsx - это страница (готовая страница со всеми текстами фото и т.д. Пример: модальные окна)








// -----  add gh-page and corrected profile  ----- ///

Страндартный путь на главную страницу тперь такой: http://localhost:5173/constructorpractice/.
Дальше переходы совешаются путем прибаления (пример: http://localhost:5173/constructorpractice/list )

В профиле теперь нет лишней страницы редактирования. заместо нее используется более интерактивная штука. по фокусу на инпут вылазит чекбокс визибл и тд
