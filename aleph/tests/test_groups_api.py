from aleph.core import db
from aleph.model import Role
from aleph.views.util import validate
from aleph.tests.util import TestCase


class GroupsApiTestCase(TestCase):

    def setUp(self):
        super(GroupsApiTestCase, self).setUp()
        self.role = self.create_user(foreign_id='user_1')
        group = Role.load_or_create('group_1', Role.GROUP, 'group 1')
        self.role.add_role(group)
        group = Role.load_or_create('group_2', Role.GROUP, 'group 2')
        self.role.add_role(group)
        self.other = self.create_user(foreign_id='other')
        db.session.commit()

    def test_index(self):
        res = self.client.get('/api/2/groups')
        assert res.status_code == 403, res
        _, headers = self.login(foreign_id='user_1')
        res = self.client.get('/api/2/groups', headers=headers)
        assert res.status_code == 200, res
        assert res.json['total'] == 2, res.json
        validate(res.json['results'][0], 'Role')
        _, headers = self.login(foreign_id='other')
        res = self.client.get('/api/2/groups', headers=headers)
        assert res.status_code == 200, res
        assert res.json['total'] == 0, res.json
