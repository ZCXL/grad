"""grad URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from reID import views as reID_views

urlpatterns = [
    url(r'^$', reID_views.home, name='home'),
    url(r'^person_in_frame/$', reID_views.person_in_frame, name='person-in-frame'),
    url(r'^insert_person/$', reID_views.insert_person, name='insert-person'),
    url(r'^del_person/$', reID_views.del_person, name='del-person'),
    url(r'^union_person/$', reID_views.union_person, name='union-person'),
    url(r'^breakdown_person/$', reID_views.breakdown_person, name='breakdown-person'),
    url(r'^update_position/$', reID_views.update_position, name='update-position'),
    url(r'^admin/', admin.site.urls),
]
