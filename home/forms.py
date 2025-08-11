from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['tipo', 'titulo', 'categoria', 'conteudo', 'arquivo']
        widgets = {
            'tipo': forms.RadioSelect(choices=Post.POST_TYPES, attrs={'class': 'btn-check'}),
            'titulo': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Um título claro e objetivo'}),
            'categoria': forms.Select(attrs={'class': 'form-select'}),
            'conteudo': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 6,
                'placeholder': 'Descreva sua mensagem ou compartilhe algo...'
            }),
            'arquivo': forms.ClearableFileInput(attrs={'class': 'form-control', 'accept': 'image/*,video/*'}),
        }

    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)
        self.fields['arquivo'].required = False