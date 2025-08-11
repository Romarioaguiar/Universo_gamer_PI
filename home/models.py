from django.db import models
from django.contrib.auth.models import User

# Cards Jogos
class Jogo(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    imagem = models.ImageField(upload_to='jogos/')

    def __str__(self):
        return self.nome

# Cards Torneio
class Torneio(models.Model):
    nome = models.CharField(max_length=200)
    jogo = models.CharField(max_length=100)
    premio = models.CharField(max_length=100)
    data = models.DateField(blank=True, null=True)  # pode ser DateField se preferir datas reais
    formato = models.CharField(max_length=100)
    imagem = models.ImageField(upload_to='torneios/')
    link_inscricao = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nome


class Post(models.Model):
    POST_TYPES = [
        ('discussion', 'Discussão'),
        ('media', 'Imagem ou Vídeo'),
    ]

    CATEGORIAS = [
        ('valorant', 'Valorant'),
        ('csgo', 'CS:GO / CS2'),
        ('lol', 'League of Legends'),
        ('eldenring', 'Elden Ring'),
        ('hardware', 'Hardware'),
        ('geral', 'Dúvidas Gerais'),
        ('outro', 'Outro'),
    ]

    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    tipo = models.CharField(max_length=20, choices=POST_TYPES, default='discussion')
    titulo = models.CharField(max_length=200)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS)
    conteudo = models.TextField()
    arquivo = models.FileField(upload_to='uploads/posts/', blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} por {self.autor.username}"


class Like(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='likes')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'usuario')  # evita likes duplicados

    def __str__(self):
        return f"{self.usuario.username} curtiu {self.post.titulo}"


class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comentarios')
    conteudo = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)
    resposta_a = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='respostas')
    
    def __str__(self):
        return f"Comentário de {self.autor.username} no post {self.post.titulo}"


class Share(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='compartilhamentos')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='compartilhamentos')
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'usuario')  # evita compartilhamentos duplicados iguais

    def __str__(self):
        return f"{self.usuario.username} compartilhou {self.post.titulo}"
