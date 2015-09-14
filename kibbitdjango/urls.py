from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from quiz.router import router


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', TemplateView.as_view(template_name='kibbit/index.html'), name="home"),
    url(r'^.+', TemplateView.as_view(template_name='kibbit/index.html'), name="home"),
]