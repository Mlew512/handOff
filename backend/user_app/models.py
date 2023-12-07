from django.db import models
from django.contrib.auth.models import AbstractUser
PROFESSION_TYPE=(
    ('registered nurse','REGISTERED NURSE'),
    ('physician', 'physician'),
)
# Create your models here.
class Client(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    profession= models.CharField(max_length=16, choices=PROFESSION_TYPE, default='registered nurse')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 

    def __str__(self):
        return self.email , self.profession
    