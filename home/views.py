from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Torneio, Post, Like, Comment, Share, Jogo
from .forms import PostForm

def inicio(request):
     jogos = Jogo.objects.all()
     torneios = Torneio.objects.all()
     
     return render(request, 'home/index.html', {'jogos': jogos, 'torneios': torneios})

# # em views.py
# def home(request):
#     torneios = Torneio.objects.all()
#     return render(request, 'home/index.html', {'jogos': jogos, 'torneios': torneios})

@login_required
def criar_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            novo_post = form.save(commit=False)
            novo_post.autor = request.user
            novo_post.save()
            return redirect('/comunidade')  # nomeie sua url de comunidade
    else:
        form = PostForm()

    posts = Post.objects.order_by('-criado_em')

    # Marcar se o usuário curtiu cada post para facilitar template
    for post in posts:
        post.curtido = post.likes.filter(usuario=request.user).exists()

    return render(request, 'home/comunidade.html', {'form': form, 'posts': posts})

@login_required
def toggle_like(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    like = post.likes.filter(usuario=request.user)
    if like.exists():
        like.delete()
    else:
        Like.objects.create(post=post, usuario=request.user)
    return redirect('/comunidade')

@login_required
def comentar(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        conteudo = request.POST.get('conteudo')
        resposta_a_id = request.POST.get('resposta_a')
        if conteudo:
            Comment.objects.create(
                post=post,
                autor=request.user,
                conteudo=conteudo,
                resposta_a_id=resposta_a_id if resposta_a_id else None
            )
    return redirect('/comunidade')

@login_required
def compartilhar(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if not post.compartilhamentos.filter(usuario=request.user).exists():
        Share.objects.create(post=post, usuario=request.user)
    return redirect('/comunidade')

