from django.contrib import admin
from home.models import Jogo
from home.models import Post
from home.models import Torneio

# Register your models here.
admin.site.register(Jogo)
admin.site.register(Post)
admin.site.register(Torneio)