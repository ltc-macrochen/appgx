# -*- coding: utf-8 -*-
"""
    fabfile
    ~~~~~~~~~~~~~~

    Fab.

    :copyright: (c) 2016 by fengweimin.
    :date: 16/7/21
"""

from fabric.api import *

# Use instance package to store secrets
try:
    from instance.fabenv import *
except ImportError:
    from fabenv import *

# {host:password}
ps = {}
for v in PASSWORDS.values():
    ps.update(v)
env.passwords = ps

# {role:[host]}
rs = {}
for k in PASSWORDS.keys():
    rs.update({k: PASSWORDS[k].keys()})
env.roledefs = rs

# Project folder
project_folder = '/appl/projects/app/www'


@roles('app')
def deploy_app():
    """
    部署app.
    """
    with cd(project_folder):
        run('git fetch')
        print('- 最新版本')
        run('git log origin/master -1')
        print('- 当前版本')
        run('git log -1')
        run('git status')

        p = prompt('- 你确定要发布么？[y/n]', validate=r'^[yn]$')
        if p == 'y':
            run('git pull')

