# app1/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from UserAuth.models import UserModel

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(help_text='A valid email address, please.', required=True)

    class Meta:
        model = get_user_model()
        fields = ['username','first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super(UserRegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

    username = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Email'}),
        label="Username or Email*")

    password = forms.CharField(widget=forms.PasswordInput(
        attrs={'class': 'form-control', 'placeholder': 'Password'}))


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserModel
        fields = ['username','first_name', 'last_name', 'username', 'email','profile_picture']


from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth import password_validation
class UserPasswordResetForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super(UserPasswordResetForm, self).__init__(*args, **kwargs)
    
    

    email = forms.EmailField(label='', widget=forms.EmailInput(attrs={
        'placeholder': 'Email',
        'type': 'email',
        'name': 'email'
        }))
    
class UserPasswordConfirmForm(SetPasswordForm):
    new_password1 = forms.CharField(
        label='',
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password','placeholder': 'New Password',}),
        strip=False,
        
    )
    new_password2 = forms.CharField(
        label= '',
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password','placeholder': 'Confirm New Password',}),
        help_text=password_validation.password_validators_help_text_html(),
    )

    def __init__(self, *args, **kwargs):
        super(UserPasswordConfirmForm, self).__init__(*args, **kwargs)