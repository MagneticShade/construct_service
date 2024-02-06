from mongomock.mongo_client import MongoClient
import unittest
from app.entities.UserEntity import UserEntity
from app.entities.ProjectEntity import ProjectEntity
from app.entities.FormEntity import FormEntity
from app.entities.ModelEntity import ModuleEntity
from app.models import User,UserUpdate,Project,ProjectUpdate
from app.models import Form as oForm
from app.models import FormUpdate as oFormUpdate
from app.models import Module as oModule
from app.models import ModuleUpdate as oModuleUpdate
from app.schemas import Form,Module

from fastapi.exceptions import HTTPException


class UserTest(unittest.TestCase):
    
    def setUp(self) -> None:
        self._users=UserEntity(MongoClient().get_database("backend").get_collection("users"))
        self._telegramID="777000"
        self._phone_number="+7800953555"
        self._birthday="01.01.1970"
        self._first_name="IVAN"
        self._last_name="DANKO"
        self._status="poor"
        self._bio="bio"
        self._projects=["833d3369-71a6-4498-a734-5e61353c06c8"]
        self._user=User(telegramID=self._telegramID,
                  phone_number=self._phone_number,
                  birthday=self._birthday,
                  first_name=self._first_name,
                  last_name=self._last_name,
                  status=self._status,
                  bio=self._bio,
                  projects=self._projects)

    def test_user_add(self):

        self._users.add(self._user)
        self.assertEqual(self._users.exist(self._telegramID),True)

    def test_user_get(self):

        self._users.add(self._user)
        self.assertEqual(self._users.get_by_id(self._telegramID).birthday,self._birthday)

    def test_user_edit(self):

        self._users.add(self._user)

        user_u=UserUpdate(bio="new bio")
        self._users.edit(self._telegramID,user_u)

        self.assertEqual(self._users.get_by_id(self._telegramID).bio,user_u.bio)

    def test_user_delete(self):
        self._users.add(self._user)
        self._users.delete(self._telegramID)
        self.assertEqual(self._users.exist(self._telegramID),False)


class ProjectTest(unittest.TestCase):
    
    def setUp(self) -> None:
        self._projects=ProjectEntity(MongoClient().get_database("backend").get_collection("projects"))
        self._title="Test"
        self._url="test.com"
        self._style_template="css link"
        self._description="description"
        self._icon_link="icon link"
        self._form_list=[Form(name="base form",o_form_id="4f20ed01-f5ea-4d54-a95d-3df2c16c0e51",module_list=[Module(o_module_id="f5479024-9a54-4e71-bdd4-bcca3e61aaab",props={"text":"hehmda"})],props={"backgroud":"blood cherry"})]

        self._project=Project(title=self._title,
                              url=self._url,
                              style_template=self._style_template,
                              description=self._description,
                              icon_link=self._icon_link,
                              form_list=self._form_list)

    def test_project_add(self):

        id=self._projects.add(self._project)
        self.assertEqual(self._projects.exist(id),True)

    def test_project_get(self):

        id=self._projects.add(self._project)
        project=self._projects.get_by_id(id)
        self.assertEqual(project.description,self._description)

    def test_project_edit(self):

        id=self._projects.add(self._project)

        project_u=ProjectUpdate(description="new description")
        self._projects.edit(id=id,project_u=project_u)

        self.assertEqual(self._projects.get_by_id(id=id).description,project_u.description)

    def test_project_delete(self):
        id=self._projects.add(self._project)
        self._projects.delete(id)
        self.assertEqual(self._projects.exist(id),False)


class oModuleTest(unittest.TestCase):
    
    def setUp(self) -> None:
        self._modules=ModuleEntity(MongoClient().get_database("backend").get_collection("modules"))
        self._name="base module"
        self._size="big"
        self._props=["text"]
        self._content_link="link to html file"

        self._module=oModule(name=self._name,
                              size=self._size,
                              props=self._props,
                              content_link=self._content_link)

    def test_module_add(self):

        id=self._modules.add(self._module)
        self.assertEqual(self._modules.exist(id),True)

    def test_module_get(self):

        id=self._modules.add(self._module)
        module=self._modules.get_by_id(id)
        self.assertEqual(module.name,self._name)

    def test_module_edit(self):

        id=self._modules.add(self._module)

        module_u=oModuleUpdate(props=["img"])
        self._modules.edit(id=id,module_u=module_u)

        self.assertEqual(self._modules.get_by_id(id=id).props,module_u.props)

    def test_module_delete(self):
        id=self._modules.add(self._module)
        self._modules.delete(id)
        self.assertEqual(self._modules.exist(id),False)

class oFormTest(unittest.TestCase):
    
    def setUp(self) -> None:
        self._forms=FormEntity(MongoClient().get_database("backend").get_collection("forms"))
        self._name="base form"
        self._module_id=["4f20ed01-f5ea-4d54-a95d-3df2c16c0e51"]
        self._layout_link="link to html file"
        self._props=["text"]
        
        self._form=oForm(name=self._name,
                              module_id=self._module_id,
                              layout_link=self._layout_link,
                              props=self._props)

    def test_form_add(self):

        id=self._forms.add(self._form)
        self.assertEqual(self._forms.exist(id),True)

    def test_form_get(self):

        id=self._forms.add(self._form)
        form=self._forms.get_by_id(id)
        self.assertEqual(form.name,self._name)

    def test_form_edit(self):

        id=self._forms.add(self._form)

        form_u=oFormUpdate(props=["img"])
        self._forms.edit(id=id,form_u=form_u)

        self.assertEqual(self._forms.get_by_id(id=id).props,form_u.props)

    def test_form_delete(self):
        id=self._forms.add(self._form)
        self._forms.delete(id)
        self.assertEqual(self._forms.exist(id),False)