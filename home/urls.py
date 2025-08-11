
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = 'accounts'

urlpatterns = [
    path('',views.inicio,name='inicio'),
    #path('comunidade/',views.comunidade,name='comunidade')
    path('comunidade/',views.criar_post, name='comunidade'),  # feed + criação
    path('comunidade/post/<int:post_id>/like/', views.toggle_like, name='toggle_like'),
    path('comunidade/post/<int:post_id>/comentar/', views.comentar, name='comentar'),
    path('comunidade/post/<int:post_id>/compartilhar/', views.compartilhar, name='compartilhar'),
 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
