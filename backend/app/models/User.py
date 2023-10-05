from . import ProjectID, TelegramID, NewUser


class User(NewUser):
    telegramID: TelegramID
    projects: list[ProjectID]
